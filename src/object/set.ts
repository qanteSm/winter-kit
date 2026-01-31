import { deepClone } from './deepClone'

// sets nested prop, returns new obj (doesnt mutate)
export function set<T extends object>(
    obj: T,
    path: string | readonly string[],
    value: unknown
): T {
    const keys = typeof path === 'string' ? path.split('.') : [...path]
    const result = deepClone(obj) as Record<string, unknown>

    let current = result
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]!
        if (current[key] === undefined || current[key] === null) {
            current[key] = {}
        }
        current = current[key] as Record<string, unknown>
    }

    const lastKey = keys[keys.length - 1]!
    current[lastKey] = value

    return result as T
}
