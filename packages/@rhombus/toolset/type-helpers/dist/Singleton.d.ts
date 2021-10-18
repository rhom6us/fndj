import { Ctor, Func } from '@rhombus/func';
export declare class Singleton<T extends Ctor> {
    private readonly type;
    private static map;
    get value(): InstanceType<T>;
    getInstance(): InstanceType<T>;
    constructor(type: T, instance: InstanceType<T>);
    constructor(type: T, factory: Func<[], InstanceType<T>>);
    static for<TInstance extends {
        constructor: Function;
    }>(instance: TInstance): Singleton<Ctor<any[], TInstance>>;
}
