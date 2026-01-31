import { deepClone } from './deepClone'

function isPlainObject(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null && !Array.isArray(val)
}

function mergeDeep(
    target: Record<string, unknown>,
    source: Record<string, unknown>
): Record<string, unknown> {
    for (const key of Object.keys(source)) {
        const sourceVal = source[key]
        const targetVal = target[key]

        if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
            target[key] = mergeDeep({ ...targetVal }, sourceVal)
        } else {
            target[key] = sourceVal
        }
    }
    return target
}

// merges objects deeply, clones first so original stays intact
export function deepMerge<T extends Record<string, unknown>>(
    target: T,
    ...sources: Partial<T>[]
): T {
    let result = deepClone(target) as Record<string, unknown>

    for (const source of sources) {
        if (isPlainObject(source)) {
            result = mergeDeep(result, source as Record<string, unknown>)
        }
    }

    return result as T
}
