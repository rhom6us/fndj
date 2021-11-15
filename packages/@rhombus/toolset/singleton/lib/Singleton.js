/// <reference lib="es2015.iterable" />
/// <reference lib="es2021.weakref" />
export function Singleton(ctor) {
    return class Singleton extends ctor {
        static #instance;
        constructor(...args) {
            const value = Singleton.#instance?.deref();
            if (value) {
                return value;
            }
            super(...args);
            Singleton.#instance = new WeakRef(this);
        }
    };
}
//# sourceMappingURL=Singleton.js.map