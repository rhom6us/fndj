
import { Dictionary, isFunction, toPairs } from 'lodash';
import { Reducer as ReduxReducer } from './external/redux';
import { StandardEvent } from './standard-event';
import { Func, restify, Restify, tuple } from './utils';
import { DeepDictionaryItem, DeepRecord, DeepRecordItem } from './utils/deep-record';

export type ReducerFn<TState = any, TPayload = undefined> = (
  state: TState,
  ...payload: Restify<TPayload>
) => TState;red
export type ReducerFnAny = ReducerFn<any, any>;

export type InferState<TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<any,any>>> = TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<infer TState, any>>
  ? TState
  : never;


export type InferPayload<TMap extends DeepRecordItem<string, ReducerFnAny>> =
  TMap extends Func<[any, ...infer TPayload], any> ? TPayload :
  TMap extends DeepRecord<string, ReducerFnAny> ? {
    [K in keyof TMap]: InferPayload<TMap[K]>
  }[keyof TMap] :
  never;

function join(...args: string[]): string {
  return args.filter(Boolean).join(".");
}

function isReducer(value: any): value is ReducerFnAny {
  return isFunction(value);
}
const pairs: <T extends Dictionary<any>>(value: T) => T extends Dictionary<infer TValue> ? [string, TValue][] : never = toPairs;

export function createReducer<T extends DeepDictionaryItem<ReducerFnAny>>(reducers: T): ReduxReducer<InferState<T>, StandardEvent<InferPayload<T>>> {
  type TState = InferState<T>;
  type TPayload = InferPayload<T>;
  type TReducer = ReducerFn<TState, TPayload>;

  const finalMap: Dictionary<TReducer> = {};
  const stack: [string, DeepDictionaryItem<TReducer>][] = toPairs(reducers);
  while (stack.length) {
    const [prefix, mapOrFun] = stack.pop()!;
    if (isReducer(mapOrFun)) {
      finalMap[prefix] = mapOrFun;
    } else {
      pairs(mapOrFun).map(([key, p]) => tuple(join(prefix, key), p)).forEach(p => stack.push(p))
    }
  }

  return function rootReducerfn(state: TState | undefined, { type, payload }: StandardEvent<TPayload>): TState {
    if (state === undefined) {
      throw new TypeError('redux-command-pattern does not support undefined state. Please preload with an initial state');
    }
    if (!(type in finalMap)) {
      // eslint-disable-next-line no-console
      console.warn(`reducer not found for action: ${type}`);
      return state;
    }
    return finalMap[type](state, ...restify(payload));
  };
}
