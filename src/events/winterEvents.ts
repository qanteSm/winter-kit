// event types
export interface WinterEventMap {
    'fetch:retry': { url: string; attempt: number; status?: number }
    'fetch:success': { url: string; attempt: number }
    'fetch:error': { url: string; attempt: number; error: string }
    'fetch:fail': { url: string; error: string }
}

type EventCallback<T> = (detail: T) => void

// typed event emitter using EventTarget
class WinterEventBus {
    private target: EventTarget
    private listeners: Map<string, Set<EventCallback<unknown>>>

    constructor() {
        this.target = new EventTarget()
        this.listeners = new Map()
    }

    on<K extends keyof WinterEventMap>(
        type: K,
        callback: EventCallback<WinterEventMap[K]>
    ): void {
        const wrapper = (e: Event) => {
            const detail = (e as CustomEvent).detail as WinterEventMap[K]
            callback(detail)
        }

        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set())
        }
        this.listeners.get(type)!.add(callback as EventCallback<unknown>)

        this.target.addEventListener(type, wrapper)
    }

    off<K extends keyof WinterEventMap>(
        type: K,
        callback: EventCallback<WinterEventMap[K]>
    ): void {
        this.listeners.get(type)?.delete(callback as EventCallback<unknown>)
    }

    emit<K extends keyof WinterEventMap>(type: K, detail: WinterEventMap[K]): void {
        let event: Event

        // some minimal runtimes dont have CustomEvent
        if (typeof CustomEvent === 'function') {
            event = new CustomEvent(type, { detail })
        } else {
            event = new Event(type)
                ; (event as unknown as Record<string, unknown>).detail = detail
        }

        this.target.dispatchEvent(event)
    }

    once<K extends keyof WinterEventMap>(
        type: K,
        callback: EventCallback<WinterEventMap[K]>
    ): void {
        const wrapper: EventCallback<WinterEventMap[K]> = (detail) => {
            this.off(type, wrapper)
            callback(detail)
        }
        this.on(type, wrapper)
    }
}

export const winterEvents = new WinterEventBus()
