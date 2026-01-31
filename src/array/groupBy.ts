// es2024 has Object.groupBy but ts doesnt know yet
declare global {
    interface ObjectConstructor {
        groupBy?<T, K extends PropertyKey>(
            items: Iterable<T>,
            keySelector: (item: T, index: number) => K
        ): Record<K, T[]>
    }
}

// groups array items by key, uses native if available
export function groupBy<T, K extends PropertyKey>(
    arr: readonly T[],
    keyFn: (item: T, index: number) => K
): Record<K, T[]> {
    if (typeof Object.groupBy === 'function') {
        return Object.groupBy(arr, keyFn) as Record<K, T[]>
    }

    const result = {} as Record<K, T[]>
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]!
        const key = keyFn(item, i)
        if (!result[key]) {
            result[key] = []
        }
        result[key].push(item)
    }
    return result
}
