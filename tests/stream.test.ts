import { describe, it, expect } from 'vitest'
import {
    streamMap,
    streamFilter,
    jsonToStream,
    streamToJson,
    toAsyncIterable,
    fromAsyncIterable,
    streamPipe,
} from '../src/stream'

describe('stream/streamMap', () => {
    it('maps chunks', async () => {
        const input = new ReadableStream({
            start(c) {
                c.enqueue(1)
                c.enqueue(2)
                c.close()
            }
        })

        const mapped = streamMap(input, x => x * 2)
        const result: number[] = []

        for await (const chunk of toAsyncIterable(mapped)) {
            result.push(chunk)
        }

        expect(result).toEqual([2, 4])
    })
})

describe('stream/streamFilter', () => {
    it('filters chunks', async () => {
        const input = new ReadableStream({
            start(c) {
                c.enqueue(1)
                c.enqueue(2)
                c.enqueue(3)
                c.close()
            }
        })

        const filtered = streamFilter(input, x => x > 1)
        const result: number[] = []

        for await (const chunk of toAsyncIterable(filtered)) {
            result.push(chunk)
        }

        expect(result).toEqual([2, 3])
    })
})

describe('stream/json', () => {
    it('converts to stream and back', async () => {
        const data = { foo: 'bar', num: 42 }
        const stream = jsonToStream(data)
        const parsed = await streamToJson(stream)
        expect(parsed).toEqual(data)
    })
})

describe('stream/asyncIterable', () => {
    it('converts both ways', async () => {
        async function* gen() {
            yield 1
            yield 2
        }

        const stream = fromAsyncIterable(gen())
        const result: number[] = []

        for await (const x of toAsyncIterable(stream)) {
            result.push(x)
        }

        expect(result).toEqual([1, 2])
    })
})
