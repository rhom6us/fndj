import { Ctor, Func } from '@rhombus/func';
declare type InstanceFactory<T extends Ctor> = Func<[], InstanceType<T>>;
export declare class Singleton<T extends Ctor> {
    #private;
    instance(): InstanceType<T>;
    constructor(type: T, instance: InstanceType<T>);
    constructor(type: T, factory: InstanceFactory<T>);
    static for<TInstance extends {
        constructor: Function;
    }>(instance: TInstance): Singleton<Ctor<any[], TInstance>>;
}
export {};
//# sourceMappingURL=Singleton.alt.d.ts.map