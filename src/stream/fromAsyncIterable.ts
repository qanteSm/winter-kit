// async iterable to stream
export function fromAsyncIterable<T>(
    iterable: AsyncIterable<T>
): ReadableStream<T> {
    const iterator = iterable[Symbol.asyncIterator]()

    return new ReadableStream<T>({
        async pull(controller) {
            const { done, value } = await iterator.next()
            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },

        async cancel(reason) {
            if (typeof iterator.return === 'function') {
                await iterator.return(reason)
            }
        }
    })
}
