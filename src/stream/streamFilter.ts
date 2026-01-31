// filter stream chunks
export function streamFilter<T>(
    stream: ReadableStream<T>,
    predicate: (chunk: T) => boolean | Promise<boolean>
): ReadableStream<T> {
    const transformer = new TransformStream<T, T>({
        async transform(chunk, controller) {
            const keep = await predicate(chunk)
            if (keep) {
                controller.enqueue(chunk)
            }
        }
    })

    return stream.pipeThrough(transformer)
}
