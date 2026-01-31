// removes duplicates using Set
export function unique<T>(arr: readonly T[]): T[] {
    return [...new Set(arr)]
}

// same but with custom key fn, keeps first match
export function uniqueBy<T, K>(arr: readonly T[], keyFn: (item: T) => K): T[] {
    const seen = new Set<K>()
    const result: T[] = []

    for (const item of arr) {
        const key = keyFn(item)
        if (!seen.has(key)) {
            seen.add(key)
            result.push(item)
        }
    }

    return result
}
