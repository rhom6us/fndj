export declare const $: unique symbol;
export declare type $ = typeof $;
declare type Replace<T, R> = T extends $ ? R : T extends string ? T : T extends any[] ? ReplaceArray<T, R> : T extends Promise<infer X> ? Promise<Replace<X, R>> : T extends PromiseLike<infer X> ? PromiseLike<Replace<X, R>> : T extends Generator<infer X> ? Generator<Replace<X, R>> : T extends AsyncGenerator<infer X> ? AsyncGenerator<Replace<X, R>> : T extends MessageEvent<infer X> ? MessageEvent<Replace<X, R>> : T extends Map<infer X, infer Y> ? Map<Replace<X, R>, Replace<Y, R>> : T extends Set<infer X> ? Set<Replace<X, R>> : T extends Iterable<infer X> ? Iterable<Replace<X, R>> : T extends AsyncIterable<infer X> ? AsyncIterable<Replace<X, R>> : T extends _Ctor<infer X, infer Y> ? _Ctor<ReplaceArray<X, R>, Replace<Y, R>> : T extends _ACtor<infer X, infer Y> ? _ACtor<ReplaceArray<X, R>, Replace<Y, R>> : T extends _Func<infer X, infer Y> ? _Func<ReplaceArray<X, R>, Replace<Y, R>> : T extends Record<any, any> ? {
    [K in keyof T as Replace<K, R>]: Replace<T[K], R>;
} : T;
declare type ReplaceArray<Arr extends any[], R, done extends any[] = []> = Arr extends [infer item, ...infer rest] ? ReplaceArray<rest, R, [...done, Replace<item, R>]> : Arr extends [] ? done : Arr extends $[] ? R[] : Arr extends any[] ? Arr : {
    ERROR: {
        '@rhombus/func': {
            Arr: Arr;
            R: R;
            done: done;
        };
    };
};
declare type _ = {
    readonly _: unique symbol;
};
declare type _Func<Args extends any[], Return> = (...args: Args) => Return;
declare type _FuncG<Args extends any[], Return, Constraint> = _ extends Constraint ? <T>(...args: Replace<Args, T>) => Replace<Return, T> : <T extends Constraint>(...args: Replace<Args, T>) => Replace<Return, T>;
export declare type Func<Args extends any[] = any[], Return = any, Constraint = any> = Replace<[Args, Return], 'asdf'> extends Replace<[Args, Return], 'qwer'> ? _Func<Args, Return> : _FuncG<Args, Return, Constraint>;
export declare type AsyncFunc<Args extends any[] = any[], Return = any, Constraint = any> = Func<Args, Promise<Awaited<Return>>, Constraint>;
export declare type Action<Args extends any[] = any[], Constraint = any> = Func<Args, void, Constraint>;
export declare type AsyncAction<Args extends any[] = any[], Constraint = any> = AsyncFunc<Args, void, Constraint>;
export declare type Sub<Args extends any[] = any[], Constraint = any> = Action<Args, Constraint>;
export declare type AsyncSub<Args extends any[] = any[], Constraint = any> = AsyncAction<Args, Constraint>;
interface _Ctor<Args extends any[], Instance> {
    new (...args: Args): Instance;
    readonly prototype: Instance;
}
declare type _CtorG<Args extends any[], Instance, Constraint> = _ extends Constraint ? {
    new <T>(...args: Replace<Args, T>): Replace<Instance, T>;
    readonly prototype: Replace<Instance, any>;
} : {
    new <T extends Constraint>(...args: Replace<Args, T>): Replace<Instance, T>;
    readonly prototype: Replace<Instance, any>;
};
export declare type Ctor<Args extends any[] = any[], Instance = any, Constraint = any> = Replace<[Args, Instance], 'asdf'> extends Replace<[Args, Instance], 'qwer'> ? _Ctor<Args, Instance> : _CtorG<Args, Instance, Constraint>;
declare type _ACtorFn<Args extends any[], Instance> = abstract new (...args: Args) => Instance;
interface _ACtor<Args extends any[], Instance> extends _ACtorFn<Args, Instance> {
    readonly prototype: Instance;
}
declare type _ACtorGAnyFn<Args extends any[], Instance> = abstract new <T>(...args: Replace<Args, T>) => Replace<Instance, T>;
interface _ACtorGAny<Args extends any[], Instance> extends _ACtorGAnyFn<Args, Instance> {
    readonly prototype: Replace<Instance, any>;
}
declare type _ACtorGConstrainedFn<Args extends any[], Instance, Constraint> = abstract new <T extends Constraint>(...args: Replace<Args, T>) => Replace<Instance, T>;
interface _ACtorGConstrained<Args extends any[], Instance, Constraint> extends _ACtorGConstrainedFn<Args, Instance, Constraint> {
    readonly prototype: Replace<Instance, any>;
}
declare type _ACtorG<Args extends any[], Instance, Constraint> = _ extends Constraint ? _ACtorGAny<Args, Instance> : _ACtorGConstrained<Args, Instance, Constraint>;
export declare type AbstractCtor<Args extends any[] = any[], Instance = any, Constraint = any> = Replace<[Args, Instance], 'asdf'> extends Replace<[Args, Instance], 'qwer'> ? _ACtor<Args, Instance> : _ACtorG<Args, Instance, Constraint>;
export {};
//# sourceMappingURL=index.alt.d.ts.map