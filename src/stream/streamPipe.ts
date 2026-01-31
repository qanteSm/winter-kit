// chains transforms: pipe(stream, t1, t2) instead of stream.pipeThrough(t1).pipeThrough(t2)
export function streamPipe<T>(
    stream: ReadableStream<T>,
    ...transforms: TransformStream<unknown, unknown>[]
): ReadableStream<unknown> {
    let result: ReadableStream<unknown> = stream

    for (const transform of transforms) {
        result = result.pipeThrough(transform)
    }

    return result
}
