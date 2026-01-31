// reads stream fully and parses as json
export async function streamToJson<T>(
    stream: ReadableStream<Uint8Array>
): Promise<T> {
    const decoder = new TextDecoder()
    const reader = stream.getReader()
    let result = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
    }

    result += decoder.decode()

    return JSON.parse(result) as T
}
