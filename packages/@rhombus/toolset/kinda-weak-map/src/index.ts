export default KindaWeakMap;
export class KindaWeakMap<K, V extends object> implements Map<K, V> {
    readonly #map = new Map<K, WeakRef<V>>();
    readonly #registry = new FinalizationRegistry((key: K) => {
        this.#map.delete(key);
    });
    set(key: K, value: V): this {
        this.#registry.register(value, key, value);
        this.#map.set(key, new WeakRef(value));
        return this;
    }

    delete(key: K): boolean {
        const val = this.get(key);
        if (val !== undefined) {
            this.#registry.unregister(val);
        }
        return this.#map.delete(key);
    }
    get(key: K): V | undefined {
        return this.#map.get(key)?.deref();
    }
    has(key: K): boolean {
        return this.#map.has(key);
    }
    clear(): void {
        for (const value of this.values()) {
            this.#registry.unregister(value);
        }
        this.#map.clear();
    }
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        for (const [key, value] of this) {
            callbackfn.call(thisArg, value, key, this);
        }
    }
    get size() {
        return this.#map.size;
    }
    entries(): IterableIterator<[K, V]> {
        type me = this;
        return (function* (this: me) {
            for (const [key, ref] of this.#map.entries()) {
                yield [key, ref.deref()] as [K, V];
            }
        }).call(this);
    }
    keys(): IterableIterator<K> {
        return this.#map.keys();
    }
    values(): IterableIterator<V> {
        type me = this;
        return (function* (this: me) {
            for (const [, value] of this.entries()) {
                yield value;
            }
        }).call(this);
    }
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    readonly [Symbol.toStringTag] = 'KindaWeakMap' as const;

}
