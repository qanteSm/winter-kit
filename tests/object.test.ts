import { describe, it, expect } from 'vitest'
import { deepClone, deepMerge, get, set, pick, omit } from '../src/object'

describe('object/deepClone', () => {
    it('clones nested obj', () => {
        const obj = { a: { b: 1 } }
        const clone = deepClone(obj)
        clone.a.b = 99
        expect(obj.a.b).toBe(1)
    })
})

describe('object/deepMerge', () => {
    it('merges deeply', () => {
        const a = { x: { y: 1 } }
        const b = { x: { z: 2 } }
        const result = deepMerge(a, b)
        expect(result.x.y).toBe(1)
        expect(result.x.z).toBe(2)
    })

    it('doesnt mutate original', () => {
        const a = { x: 1 }
        deepMerge(a, { x: 2 })
        expect(a.x).toBe(1)
    })
})

describe('object/get', () => {
    it('gets nested value', () => {
        const obj = { a: { b: { c: 42 } } }
        expect(get(obj, 'a.b.c')).toBe(42)
    })

    it('returns default if not found', () => {
        expect(get({}, 'a.b', 'nope')).toBe('nope')
    })
})

describe('object/set', () => {
    it('sets nested value', () => {
        const obj = { a: { b: 1 } }
        const result = set(obj, 'a.b', 99)
        expect(result.a.b).toBe(99)
        expect(obj.a.b).toBe(1) // original unchanged
    })
})

describe('object/pick', () => {
    it('picks keys', () => {
        const obj = { a: 1, b: 2, c: 3 }
        expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })
})

describe('object/omit', () => {
    it('omits keys', () => {
        const obj = { a: 1, b: 2, c: 3 }
        expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
    })
})
