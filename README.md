<div align="center">

# ❄️ WinterKit

**Modern utility library for Edge & Serverless**

<!-- badges will work after npm publish -->
![npm version](https://img.shields.io/badge/npm-v0.1.0-blue)
![bundle size](https://img.shields.io/badge/gzip-~3kb-green)
![license](https://img.shields.io/badge/license-MIT-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

[Features](#features) • [Install](#install) • [Modules](#modules) • [Why WinterKit?](#why-winterkit)

</div>

---

## Why WinterKit?

> **Lodash is great, but it wasn't built for Edge.**
> WinterKit is zero-dependency, tree-shakable, and runs anywhere — Cloudflare Workers, Vercel Edge, Deno, Bun.

```typescript
// Import only what you need. Nothing else touches your bundle.
import { chunk } from 'winterkit/array'
import { retryFetch } from 'winterkit/fetch'
```

---

## Features

| | |
|---|---|
| 🌐 **WinterCG Compliant** | No Buffer, fs, path — pure Web APIs |
| 📦 **Zero Dependencies** | Nothing but your code |
| 🌳 **Tree-shakable** | Import one function, ship one function |
| 🔷 **TypeScript First** | Full inference, strict types |
| ⚡ **Stream Utilities** | Web Streams API helpers |
| 🔄 **Retry Fetch** | Exponential backoff built-in |

---

## Install

```bash
# npm
npm install winterkit

# pnpm
pnpm add winterkit

# bun
bun add winterkit

# deno (jsr)
deno add @winterkit/core

# jsr universal
npx jsr add @winterkit/core
```

---

## Modules

### 📚 Array

```typescript
import { chunk, groupBy, unique, partition, shuffle } from 'winterkit/array'

chunk([1, 2, 3, 4, 5], 2)        // [[1,2], [3,4], [5]]
groupBy(users, u => u.role)      // { admin: [...], user: [...] }
unique([1, 2, 2, 3])             // [1, 2, 3]
partition(nums, n => n > 0)      // [[positives], [negatives]]
```

### 🔧 Object

```typescript
import { deepMerge, get, set, pick, omit } from 'winterkit/object'

deepMerge({ a: { b: 1 } }, { a: { c: 2 } })  // { a: { b: 1, c: 2 } }
get(obj, 'user.profile.name', 'default')
set(obj, 'settings.theme', 'dark')           // immutable, returns new obj
```

### ✂️ String

```typescript
import { slugify, truncate, template, escapeHtml } from 'winterkit/string'

slugify('Merhaba Dünya')                      // 'merhaba-dunya'
truncate('long text', { length: 8 })          // 'long...'
template('Hello {{name}}', { name: 'World' }) // 'Hello World'
```

### 🌊 Stream

```typescript
import { streamMap, toAsyncIterable, jsonToStream } from 'winterkit/stream'

// Transform stream chunks
const doubled = streamMap(stream, n => n * 2)

// Use with for-await
for await (const chunk of toAsyncIterable(stream)) {
  process(chunk)
}

// Stream JSON response
return new Response(jsonToStream({ data }))
```

### 🔁 Fetch

```typescript
import { retryFetch, fetchTimeout, QueryBuilder } from 'winterkit/fetch'

// Retry with exponential backoff
await retryFetch('/api/data', { maxRetries: 3 })

// Timeout after 5s
await fetchTimeout('/api', { timeout: 5000 })

// Build query strings
new QueryBuilder().set('page', 1).set('limit', 20).toURL('/api')
```

### 📡 Events

```typescript
import { winterEvents } from 'winterkit/events'

// Global typed event bus
winterEvents.on('fetch:retry', ({ url, attempt }) => {
  console.log(`Retry #${attempt}: ${url}`)
})
```

---

## Runtime Support

| Runtime | Status |
|---------|--------|
| Node.js 18+ | ✅ |
| Deno | ✅ |
| Bun | ✅ |
| Cloudflare Workers | ✅ |
| Vercel Edge | ✅ |
| Browsers (ES2022) | ✅ |

---

## Bundle Size

Each function is in its own file — import one, ship one.

```
winterkit/array   ~800B gzipped
winterkit/stream  ~1.2KB gzipped
winterkit/fetch   ~1.5KB gzipped
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## License

MIT © [Muhammet Ali Büyük](https://github.com/user)
