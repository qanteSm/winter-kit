// concat multiple streams into one
export function streamConcat<T>(
    ...streams: ReadableStream<T>[]
): ReadableStream<T> {
    let currentIndex = 0
    let currentReader: ReadableStreamDefaultReader<T> | null = null

    return new ReadableStream<T>({
        async pull(controller) {
            while (currentIndex < streams.length) {
                if (!currentReader) {
                    currentReader = streams[currentIndex]!.getReader()
                }

                const { done, value } = await currentReader.read()

                if (done) {
                    currentReader.releaseLock()
                    currentReader = null
                    currentIndex++
                    continue
                }

                controller.enqueue(value)
                return
            }

            controller.close()
        },

        cancel(reason) {
            if (currentReader) {
                currentReader.cancel(reason)
            }
        }
    })
}
