import { Ctor, Func } from '@rhombus/func';

export class Singleton<T extends Ctor> {
    private static map = new WeakMap<Ctor, any>();
    get value(): InstanceType<T> {
        throw '';
    }
    getInstance(): InstanceType<T> {
        return Singleton.map.get(this.type);
    }
    constructor(type: T, instance: InstanceType<T>);
    constructor(type: T, factory: Func<[], InstanceType<T>>);
    constructor(private readonly type: T, arg: any) {
        if (!Singleton.map.has(type)) {
            const instance = typeof arg === 'function' ? arg() : arg;
            Singleton.map.set(type, instance);
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static for<TInstance extends { constructor: Function; }>(instance: TInstance) {
        return new Singleton(instance.constructor as Ctor<any[], TInstance>, instance);
    }
}
