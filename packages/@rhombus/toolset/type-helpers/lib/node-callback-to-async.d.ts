import { Action } from '@rhombus/func';
declare type InferArgs<F extends NodeStyleFn> = F extends NodeStyleFn<infer args, any> ? args : never;
declare type InferResult<F extends NodeStyleFn> = F extends NodeStyleFn<any, infer result> ? result : never;
declare type Callback<TResult = any, TError = any> = Action<[error: TError, result: TResult]>;
declare type NodeStyleFn<Args extends any[] = any[], TResult = any> = Action<[...args: Args, callback: Callback<TResult>]>;
export declare function nodeCallbackToAsync<T extends NodeStyleFn>(fn: T): (...args: InferArgs<T>) => Promise<InferResult<T>>;
export {};
//# sourceMappingURL=node-callback-to-async.d.ts.map