import { Func } from '@rhombus/func';
import { Restify } from '@rhombus/type-helpers';
import { EventTypes } from './event-creator';
import { Reducer as ReduxReducer } from './external/redux';
import { DeepDictionaryItem, DeepRecord, DeepRecordItem } from './utils/deep-record';
export declare type ReducerFn<TState = any, TPayload = undefined> = (state: TState, ...payload: Restify<TPayload>) => TState;
export declare type ReducerFnAny = ReducerFn<any, any>;
export declare type InferState<TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<any, any>>> = TReducerFnOrMap extends DeepDictionaryItem<ReducerFn<infer TState, any>> ? TState : never;
export declare type InferPayload<TMap extends DeepRecordItem<string, ReducerFnAny>> = TMap extends Func<[any, ...infer TPayload], any> ? TPayload : TMap extends DeepRecord<string, ReducerFnAny> ? {
    [K in keyof TMap]: InferPayload<TMap[K]>;
}[keyof TMap] : never;
export declare function createReducer<T extends DeepDictionaryItem<ReducerFnAny>>(reducers: T): ReduxReducer<InferState<T>, EventTypes<T>>;
