

type UnwrapPromise<T> = T extends PromiseLike<infer R> ? UnwrapPromise<R> : T;


export type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return;
export type AsyncFunc<Args extends any[] = any[], Return = any> = Func<Args, Promise<Return>>;


export type Action<Args extends any[] = any[]> = Func<Args, void>;
export type AsyncAction<Args extends any[] = any[]> = AsyncFunc<Args, void>;


export type Ctor<Args extends any[] = any[], Instance = any> = new (...args: Args) => Instance;
export type AbstractCtor<Args extends any[] = any[], Instance = any> = abstract new (...args: Args) => Instance;
