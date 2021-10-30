
export declare const $: unique symbol;
export type $ = typeof $;

type Replace<T, R> =
    T extends $ ? R :
    T extends string ? T :
    T extends any[] ? ReplaceArray<T, R> :
    T extends Promise<infer X> ? Promise<Replace<X, R>> :
    T extends PromiseLike<infer X> ? PromiseLike<Replace<X, R>> :
    T extends Generator<infer X> ? Generator<Replace<X, R>> :
    T extends AsyncGenerator<infer X> ? AsyncGenerator<Replace<X, R>> :
    T extends MessageEvent<infer X> ? MessageEvent<Replace<X, R>> :
    T extends Map<infer X, infer Y> ? Map<Replace<X, R>, Replace<Y, R>> :
    T extends Set<infer X> ? Set<Replace<X, R>> :
    T extends Iterable<infer X> ? Iterable<Replace<X, R>> :
    T extends AsyncIterable<infer X> ? AsyncIterable<Replace<X, R>> :
    T extends _Ctor<infer X, infer Y> ? _Ctor<ReplaceArray<X, R>, Replace<Y, R>> :
    T extends _ACtor<infer X, infer Y> ? _ACtor<ReplaceArray<X, R>, Replace<Y, R>> :
    T extends _Func<infer X, infer Y> ? _Func<ReplaceArray<X, R>, Replace<Y, R>> :
    T extends Record<any, any> ? {
        [K in keyof T as Replace<K, R>] : Replace<T[K], R>
    } 
    : T;
    

type ReplaceArray<Arr extends any[], R, done extends any[] = []> =
    // Arr extends [infer item, ...infer rest] ? [Replace<item, R>, ...ReplaceArray<rest, R>] : Arr
    Arr extends [infer item, ...infer rest] ? ReplaceArray<rest, R, [...done, Replace<item, R>]> :
    Arr extends [] ? done :
    Arr extends $[] ? R[] :
    Arr extends any[] ? Arr :
    {ERROR:{'@rhombus/func':{Arr:Arr, R:R, done:done}}};


type _ = { readonly _: unique symbol; };

type _Func<Args extends any[], Return>
    = (...args: Args) => Return

type _FuncG<Args extends any[], Return, Constraint>
    = _ extends Constraint // see if Constraint is 'any'
    ? <T>(...args: Replace<Args, T>) => Replace<Return, T>
    : <T extends Constraint>(...args: Replace<Args, T>) => Replace<Return, T>;

export type Func<Args extends any[] = any[], Return = any, Constraint = any>
    = Replace<[Args, Return], 'asdf'> extends Replace<[Args, Return], 'qwer'> // see if there are any placeholders for generic usage
    ? _Func<Args, Return>
    : _FuncG<Args, Return, Constraint>;

export type AsyncFunc<Args extends any[] = any[], Return = any, Constraint = any> = Func<Args, Promise<Awaited<Return>>, Constraint>;

export type Action<Args extends any[] = any[], Constraint = any> = Func<Args, void, Constraint>;
export type AsyncAction<Args extends any[] = any[], Constraint = any> = AsyncFunc<Args, void, Constraint>;

export type Sub<Args extends any[] = any[], Constraint = any> = Action<Args, Constraint>;
export type AsyncSub<Args extends any[] = any[], Constraint = any> = AsyncAction<Args, Constraint>;



interface _Ctor<Args extends any[], Instance> {
    new(...args: Args): Instance;
    readonly prototype: Instance;
}
type _CtorG<Args extends any[], Instance, Constraint> =
    _ extends Constraint ? {
        new <T>(...args: Replace<Args, T>): Replace<Instance, T>;
        readonly prototype: Replace<Instance, any>;
    } : {
        new <T extends Constraint>(...args: Replace<Args, T>): Replace<Instance, T>;
        readonly prototype: Replace<Instance, any>;
    };

export type Ctor<Args extends any[] = any[], Instance = any, Constraint = any>
    = Replace<[Args, Instance], 'asdf'> extends Replace<[Args, Instance], 'qwer'>
    ? _Ctor<Args, Instance>
    : _CtorG<Args, Instance, Constraint>;



type _ACtorFn<Args extends any[], Instance>
    = abstract new (...args: Args) => Instance;
interface _ACtor<Args extends any[], Instance> extends _ACtorFn<Args, Instance> {
    readonly prototype: Instance;
}

type _ACtorGAnyFn<Args extends any[], Instance>
    = abstract new <T>(...args: Replace<Args, T>) => Replace<Instance, T>;
interface _ACtorGAny<Args extends any[], Instance> extends _ACtorGAnyFn<Args, Instance> {
    readonly prototype: Replace<Instance, any>;
}
type _ACtorGConstrainedFn<Args extends any[], Instance, Constraint>
    = abstract new <T extends Constraint>(...args: Replace<Args, T>) => Replace<Instance, T>;
interface _ACtorGConstrained<Args extends any[], Instance, Constraint> extends _ACtorGConstrainedFn<Args, Instance, Constraint> {
    readonly prototype: Replace<Instance, any>;
}

type _ACtorG<Args extends any[], Instance, Constraint>
    = _ extends Constraint
    ? _ACtorGAny<Args, Instance>
    : _ACtorGConstrained<Args, Instance, Constraint>

export type AbstractCtor<Args extends any[] = any[], Instance = any, Constraint = any>
    = Replace<[Args, Instance], 'asdf'> extends Replace<[Args, Instance], 'qwer'>
    ? _ACtor<Args, Instance>
    : _ACtorG<Args, Instance, Constraint>;

