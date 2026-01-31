import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        'index': 'src/index.ts',
        'array/index': 'src/array/index.ts',
        'object/index': 'src/object/index.ts',
        'string/index': 'src/string/index.ts',
        'stream/index': 'src/stream/index.ts',
        'fetch/index': 'src/fetch/index.ts',
        'events/index': 'src/events/index.ts',
    },
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false, // dev icin kapali, prod build'de ac
})
