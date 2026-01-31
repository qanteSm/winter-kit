// map over stream chunks, uses TransformStream so backpressure works
export function streamMap<T, U>(
    stream: ReadableStream<T>,
    transform: (chunk: T) => U | Promise<U>
): ReadableStream<U> {
    const transformer = new TransformStream<T, U>({
        async transform(chunk, controller) {
            const result = await transform(chunk)
            controller.enqueue(result)
        }
    })

    return stream.pipeThrough(transformer)
}
