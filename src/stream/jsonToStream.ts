// obj to json stream
export function jsonToStream<T>(data: T): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder()
    const json = JSON.stringify(data)

    return new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(json))
            controller.close()
        }
    })
}

// same but chunked, for big data
export function jsonToChunkedStream<T>(
    data: T,
    chunkSize = 1024
): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder()
    const json = JSON.stringify(data)

    return new ReadableStream({
        start(controller) {
            for (let i = 0; i < json.length; i += chunkSize) {
                const chunk = json.slice(i, i + chunkSize)
                controller.enqueue(encoder.encode(chunk))
            }
            controller.close()
        }
    })
}
