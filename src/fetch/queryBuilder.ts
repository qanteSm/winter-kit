// url params builder with chaining
export class QueryBuilder {
    private params: URLSearchParams

    constructor(init?: string | URLSearchParams | Record<string, string>) {
        if (typeof init === 'string') {
            this.params = new URLSearchParams(init)
        } else if (init instanceof URLSearchParams) {
            this.params = new URLSearchParams(init)
        } else if (init) {
            this.params = new URLSearchParams()
            for (const [key, val] of Object.entries(init)) {
                this.params.set(key, val)
            }
        } else {
            this.params = new URLSearchParams()
        }
    }

    set(key: string, value: string | number | boolean): this {
        this.params.set(key, String(value))
        return this
    }

    append(key: string, value: string | number | boolean): this {
        this.params.append(key, String(value))
        return this
    }

    delete(key: string): this {
        this.params.delete(key)
        return this
    }

    has(key: string): boolean {
        return this.params.has(key)
    }

    get(key: string): string | null {
        return this.params.get(key)
    }

    toString(): string {
        return this.params.toString()
    }

    toURL(base: string | URL): URL {
        const url = new URL(base)
        url.search = this.params.toString()
        return url
    }
}

// shorthand
export function buildQuery(params: Record<string, string | number | boolean>): string {
    return new QueryBuilder(params as Record<string, string>).toString()
}
