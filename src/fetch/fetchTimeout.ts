// fetch with timeout via AbortController
export async function fetchTimeout(
    url: string | URL,
    options?: RequestInit & { timeout?: number }
): Promise<Response> {
    const { timeout = 30000, ...fetchOptions } = options ?? {}

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
        })
        return response
    } finally {
        clearTimeout(timeoutId)
    }
}
