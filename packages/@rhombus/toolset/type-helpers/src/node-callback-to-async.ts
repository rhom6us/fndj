import { Action } from "@rhombus-toolkit/func";


type InferArgs<F extends NodeStyleFn> = F extends NodeStyleFn<infer args, any> ? args : never;
type InferResult<F extends NodeStyleFn> = F extends NodeStyleFn<any, infer result> ? result : never;

type Callback<TResult = any, TError = any> = Action<[error: TError, result: TResult]>;
type NodeStyleFn<Args extends any[] = any[], TResult = any> = Action<[...args: Args, callback: Callback<TResult>]>;

export function nodeCallbackToAsync<T extends NodeStyleFn>(fn: T) {
    return (...args: InferArgs<T>) => new Promise<InferResult<T>>((resolve, reject) => {
        fn(...args, (err: any, result: any) => {
            if (err !== undefined) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
