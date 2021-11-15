export default KindaWeakMap;
export class KindaWeakMap {
    #map = new Map();
    #registry = new FinalizationRegistry((key) => {
        this.#map.delete(key);
    });
    set(key, value) {
        this.#registry.register(value, key, value);
        this.#map.set(key, new WeakRef(value));
        return this;
    }
    delete(key) {
        const val = this.get(key);
        if (val !== undefined) {
            this.#registry.unregister(val);
        }
        return this.#map.delete(key);
    }
    get(key) {
        return this.#map.get(key)?.deref();
    }
    has(key) {
        return this.#map.has(key);
    }
    clear() {
        for (const value of this.values()) {
            this.#registry.unregister(value);
        }
        this.#map.clear();
    }
    forEach(callbackfn, thisArg) {
        for (const [key, value] of this) {
            callbackfn.call(thisArg, value, key, this);
        }
    }
    get size() {
        return this.#map.size;
    }
    entries() {
        return (function* () {
            for (const [key, ref] of this.#map.entries()) {
                yield [key, ref.deref()];
            }
        }).call(this);
    }
    keys() {
        return this.#map.keys();
    }
    values() {
        return (function* () {
            for (const [, value] of this.entries()) {
                yield value;
            }
        }).call(this);
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    [Symbol.toStringTag];
}
//# sourceMappingURL=index.js.map