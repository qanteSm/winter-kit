// get nested prop like get(obj, 'a.b.c') or get(obj, ['a','b','c'])
export function get<T = unknown, D = undefined>(
    obj: unknown,
    path: string | readonly string[],
    defaultValue?: D
): T | D {
    const keys = typeof path === 'string' ? path.split('.') : path

    let result: unknown = obj
    for (const key of keys) {
        if (result === null || result === undefined) {
            return defaultValue as D
        }
        result = (result as Record<string, unknown>)[key]
    }

    return (result === undefined ? defaultValue : result) as T | D
}
