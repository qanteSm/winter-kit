// splits arr into chunks of given size
export function chunk<T>(arr: readonly T[], size: number): T[][] {
    if (size < 1) {
        throw new Error('size must be positive')
    }

    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}
