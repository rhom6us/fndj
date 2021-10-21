import { Ctor, Func } from '@rhombus/func';
type InstanceFactory<T extends Ctor> = Func<[], InstanceType<T>>;

const map = new WeakMap<Ctor, any>();
export class Singleton<T extends Ctor> {
    #type: T;
    #factory: InstanceFactory<T>;

    instance(): InstanceType<T> {
        if (!map.has(this.#type)) {
            map.set(this.#type, this.#factory());
        }
        return map.get(this.#type);
    }

    constructor(type: T, instance: InstanceType<T>);
    constructor(type: T, factory: InstanceFactory<T>);
    constructor(type: T, arg: any) {
        this.#type = type;
        this.#factory = typeof arg === 'function' ? arg : () => arg;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static for<TInstance extends { constructor: Function; }>(instance: TInstance) {
        return new Singleton(instance.constructor as Ctor<any[], TInstance>, instance);
    }
}
