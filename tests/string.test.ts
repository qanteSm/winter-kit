import { describe, it, expect } from 'vitest'
import { slugify, truncate, template, escapeHtml, unescapeHtml } from '../src/string'

describe('string/slugify', () => {
    it('converts to slug', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })

    it('handles turkish chars', () => {
        expect(slugify('Türkçe İçerik')).toBe('turkce-icerik')
    })

    it('uses custom separator', () => {
        expect(slugify('foo bar', '_')).toBe('foo_bar')
    })
})

describe('string/truncate', () => {
    it('truncates long string', () => {
        expect(truncate('hello world', { length: 8 })).toBe('hello...')
    })

    it('doesnt truncate short string', () => {
        expect(truncate('hi', { length: 10 })).toBe('hi')
    })
})

describe('string/template', () => {
    it('replaces vars', () => {
        expect(template('hi {{name}}', { name: 'ali' })).toBe('hi ali')
    })
})

describe('string/escapeHtml', () => {
    it('escapes html', () => {
        expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
    })
})

describe('string/unescapeHtml', () => {
    it('unescapes html', () => {
        expect(unescapeHtml('&lt;div&gt;')).toBe('<div>')
    })
})
