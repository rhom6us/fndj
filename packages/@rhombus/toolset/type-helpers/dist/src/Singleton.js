export class Singleton {
    type;
    static map = new WeakMap();
    get value() {
        throw '';
    }
    getInstance() {
        return Singleton.map.get(this.type);
    }
    constructor(type, arg) {
        this.type = type;
        if (!Singleton.map.has(type)) {
            const instance = typeof arg === 'function' ? arg() : arg;
            Singleton.map.set(type, instance);
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    static for(instance) {
        return new Singleton(instance.constructor, instance);
    }
}
//# sourceMappingURL=Singleton.js.map