// fisher-yates shuffle, uses crypto for randomness
export function shuffle<T>(arr: readonly T[]): T[] {
    const result = [...arr]
    const len = result.length

    const randomBytes = new Uint32Array(len)
    crypto.getRandomValues(randomBytes)

    for (let i = len - 1; i > 0; i--) {
        const j = randomBytes[i]! % (i + 1)
        const temp = result[i]!
        result[i] = result[j]!
        result[j] = temp
    }

    return result
}
