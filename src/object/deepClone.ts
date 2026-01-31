// clones with structuredClone, falls back to json if not available
export function deepClone<T>(obj: T): T {
    if (typeof structuredClone === 'function') {
        return structuredClone(obj)
    }
    // json wont work with fns, dates etc but good enough
    return JSON.parse(JSON.stringify(obj))
}
