import { Func } from '@rhombus/func';
declare type NodeStyleCallback<TResult = any, TError = any> = Func<[TError, TResult], void>;
declare type NodeStyleFn<TArgs extends any[] = any[], TResult = any> = Func<[...TArgs, NodeStyleCallback<TResult>], void>;
declare type NodeStyleFnParts<F extends NodeStyleFn> = F extends NodeStyleFn<infer args, infer result> ? [args, result] : never;
declare type NodeStyleParameters<F extends NodeStyleFn> = NodeStyleFnParts<F>[0];
declare type NodeStyleResult<F extends NodeStyleFn> = NodeStyleFnParts<F>[1];
export declare function nodeCallbackToAsync<TFn extends NodeStyleFn>(fn: TFn): (...args: NodeStyleParameters<TFn>) => Promise<NodeStyleResult<TFn>>;
export {};
