import { describe, it, expect } from 'vitest'
import { chunk, groupBy, unique, uniqueBy, partition, shuffle } from '../src/array'

describe('array/chunk', () => {
    it('splits array into chunks', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('handles empty array', () => {
        expect(chunk([], 3)).toEqual([])
    })

    it('throws on invalid size', () => {
        expect(() => chunk([1, 2], 0)).toThrow()
    })
})

describe('array/groupBy', () => {
    it('groups by key fn', () => {
        const arr = [{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }]
        const result = groupBy(arr, x => x.type)
        expect(result.a).toHaveLength(2)
        expect(result.b).toHaveLength(1)
    })
})

describe('array/unique', () => {
    it('removes duplicates', () => {
        expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
    })
})

describe('array/uniqueBy', () => {
    it('removes dupes by key', () => {
        const arr = [{ id: 1, n: 'a' }, { id: 2, n: 'b' }, { id: 1, n: 'c' }]
        expect(uniqueBy(arr, x => x.id)).toHaveLength(2)
    })
})

describe('array/partition', () => {
    it('splits by predicate', () => {
        const [evens, odds] = partition([1, 2, 3, 4], x => x % 2 === 0)
        expect(evens).toEqual([2, 4])
        expect(odds).toEqual([1, 3])
    })
})

describe('array/shuffle', () => {
    it('returns same length', () => {
        const arr = [1, 2, 3, 4, 5]
        expect(shuffle(arr)).toHaveLength(5)
    })

    it('doesnt mutate original', () => {
        const arr = [1, 2, 3]
        shuffle(arr)
        expect(arr).toEqual([1, 2, 3])
    })
})
