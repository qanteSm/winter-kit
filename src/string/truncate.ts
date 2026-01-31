export interface TruncateOptions {
    length: number
    suffix?: string
    wordBoundary?: boolean
}

// cuts string at length, adds ... or custom suffix
export function truncate(str: string, options: TruncateOptions): string {
    const { length, suffix = '...', wordBoundary = false } = options

    if (str.length <= length) {
        return str
    }

    let truncated = str.slice(0, length - suffix.length)

    if (wordBoundary) {
        const lastSpace = truncated.lastIndexOf(' ')
        if (lastSpace > 0) {
            truncated = truncated.slice(0, lastSpace)
        }
    }

    return truncated + suffix
}
