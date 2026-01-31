import { describe, it, expect } from 'vitest'
import { QueryBuilder, buildQuery } from '../src/fetch'

describe('fetch/queryBuilder', () => {
    it('builds query string', () => {
        const qb = new QueryBuilder()
            .set('a', 1)
            .set('b', 'test')

        expect(qb.toString()).toBe('a=1&b=test')
    })

    it('creates url', () => {
        const qb = new QueryBuilder().set('q', 'search')
        const url = qb.toURL('https://api.example.com')
        expect(url.href).toBe('https://api.example.com/?q=search')
    })
})

describe('fetch/buildQuery', () => {
    it('shorthand works', () => {
        expect(buildQuery({ a: 1, b: 2 })).toBe('a=1&b=2')
    })
})
