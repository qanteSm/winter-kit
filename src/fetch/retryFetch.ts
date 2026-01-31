import { winterEvents } from '../events/winterEvents'

export interface RetryOptions {
    maxRetries?: number
    baseDelay?: number
    maxDelay?: number
    retryOn?: (response: Response, attempt: number) => boolean
}

const DEFAULTS = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 30000,
}

// exp backoff with some jitter
function getDelay(attempt: number, baseDelay: number, maxDelay: number): number {
    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
    const jitter = delay * 0.1 * Math.random()
    return delay + jitter
}

// retry on 5xx by default
function defaultRetryOn(response: Response): boolean {
    return response.status >= 500
}

// fetch with retry + exponential backoff
export async function retryFetch(
    url: string | URL,
    options?: RequestInit & RetryOptions
): Promise<Response> {
    const {
        maxRetries = DEFAULTS.maxRetries,
        baseDelay = DEFAULTS.baseDelay,
        maxDelay = DEFAULTS.maxDelay,
        retryOn = defaultRetryOn,
        ...fetchOptions
    } = options ?? {}

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, fetchOptions)

            if (!retryOn(response, attempt) || attempt === maxRetries) {
                if (response.ok) {
                    winterEvents.emit('fetch:success', {
                        url: url.toString(),
                        attempt,
                    })
                }
                return response
            }

            winterEvents.emit('fetch:retry', {
                url: url.toString(),
                attempt,
                status: response.status,
            })

        } catch (err) {
            lastError = err as Error
            winterEvents.emit('fetch:error', {
                url: url.toString(),
                attempt,
                error: lastError.message,
            })

            if (attempt === maxRetries) {
                break
            }
        }

        const delay = getDelay(attempt, baseDelay, maxDelay)
        await new Promise(r => setTimeout(r, delay))
    }

    winterEvents.emit('fetch:fail', {
        url: url.toString(),
        error: lastError?.message ?? 'max retries',
    })

    throw lastError ?? new Error('fetch failed')
}
