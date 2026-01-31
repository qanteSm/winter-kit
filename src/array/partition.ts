// splits into [matching, not matching]
export function partition<T>(
    arr: readonly T[],
    predicate: (item: T, index: number) => boolean
): [T[], T[]] {
    const matches: T[] = []
    const nonMatches: T[] = []

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]!
        if (predicate(item, i)) {
            matches.push(item)
        } else {
            nonMatches.push(item)
        }
    }

    return [matches, nonMatches]
}
