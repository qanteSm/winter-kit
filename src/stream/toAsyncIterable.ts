// use with for await..of loops
export function toAsyncIterable<T>(
    stream: ReadableStream<T>
): AsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            const reader = stream.getReader()

            return {
                async next(): Promise<IteratorResult<T>> {
                    const { done, value } = await reader.read()
                    if (done) {
                        reader.releaseLock()
                        return { done: true, value: undefined }
                    }
                    return { done: false, value }
                },

                async return(): Promise<IteratorResult<T>> {
                    reader.releaseLock()
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
