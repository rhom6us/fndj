import { Func } from './func';

type NodeStyleCallback<TResult = any, TError = any> = Func<[TError, TResult], void>;
type NodeStyleFn<TArgs extends any[] = any[], TResult = any> = Func<[...TArgs, NodeStyleCallback<TResult>], void>;
type NodeStyleFnParts<F extends NodeStyleFn> =
    F extends NodeStyleFn<infer args, infer result> ? [args, result] : never;
// F extends (...args: [...infer Args, Callback<infer V>]) => void ? [Args, V] : never;
type NodeStyleParameters<F extends NodeStyleFn> = NodeStyleFnParts<F>[0];
type NodeStyleResult<F extends NodeStyleFn> = NodeStyleFnParts<F>[1];

export function NodeCallbackToAsync<TFn extends NodeStyleFn>(fn: TFn) {
    return (...args: NodeStyleParameters<TFn>) => new Promise<NodeStyleResult<TFn>>((resolve, reject) => {
        fn(...args, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
