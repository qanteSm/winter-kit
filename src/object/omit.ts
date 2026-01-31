// returns obj without specified keys
export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
): Omit<T, K> {
    const keySet = new Set<PropertyKey>(keys)
    const result = {} as Record<PropertyKey, unknown>

    for (const key of Object.keys(obj)) {
        if (!keySet.has(key)) {
            result[key] = (obj as Record<string, unknown>)[key]
        }
    }

    return result as Omit<T, K>
}
