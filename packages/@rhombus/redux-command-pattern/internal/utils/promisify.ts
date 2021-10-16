import { Action, Func } from '@rhombus/func'

type Callback<T = void> =
  T extends void ? (error?: any) => void :
  (error: any, value: T) => void;




type InferPromisify<TFn extends Action> =

  TFn extends Action<[Callback<infer TValue>]> ? [[], TValue] :
  TFn extends Action<[infer TArg1, Callback<infer TValue>]> ? [[TArg1], TValue] :
  TFn extends Action<[infer TArg1, infer TArg2, Callback<infer TValue>]> ? [[TArg1, TArg2], TValue] :
  TFn extends Action<[infer TArg1, infer TArg2, infer TArg3, Callback<infer TValue>]> ? [[TArg1, TArg2, TArg3], TValue] :
  TFn extends Action<[infer TArg1, infer TArg2, infer TArg3, infer TArg4, Callback<infer TValue>]> ? [[TArg1, TArg2, TArg3, TArg4], TValue] :
  TFn extends Action<[infer TArg1, infer TArg2, infer TArg3, infer TArg4, infer TArg5, Callback<infer TValue>]> ? [[TArg1, TArg2, TArg3, TArg4, TArg5], TValue] :
  never;

type InferNonCbArgs<TFn extends Action> = InferPromisify<TFn>[0];
type InferValue<TFn extends Action> = InferPromisify<TFn>[1];

export function promisify<TFn extends Action>(fn: TFn) {
  return (...args: InferNonCbArgs<TFn>) => {
    return new Promise<InferValue<TFn>>((resolve, reject) => {
      fn(...args, (err: any, result: any) => err ? reject(err) : resolve(result))
    });
  };
};

// export interface Promisify {
// (fn: (callback: Callback) => void): () => Promise<void>;
// <T1>(fn: (arg1: T1, callback: Callback) => void): (arg1: T1) => Promise<void>;
// <T1, T2>(fn: (arg1: T1, arg2: T2, callback: Callback) => void): (arg1: T1, arg2: T2) => Promise<void>;
// <T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: Callback) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
// <T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: Callback) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
// <T1, T2, T3, T4, T5>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: Callback) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;

// <TResult>(fn: (callback: (err: any, result: TResult) => void) => void): () => Promise<TResult>;
// <T1, TResult>(fn: (arg1: T1, callback: (err: any, result: TResult) => void) => void): (arg1: T1) => Promise<TResult>;
// <T1, T2, TResult>(fn: (arg1: T1, arg2: T2, callback: (err: any, result: TResult) => void) => void): (arg1: T1, arg2: T2) => Promise<TResult>;
// <T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: any, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
// <T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: any, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
// <T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: any, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
// }
