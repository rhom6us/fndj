import { Cast, Inc, Restify } from '@rhombus/type-helpers';
import { InferPayload, ReducerFnAny } from './reducer-fn';
import { StandardEvent } from './standard-event';
import { DeepDictionary, DeepDictionaryItem } from './utils';
declare type EventCreator<TReducerFn extends ReducerFnAny, Name extends string> = (...payload: Restify<InferPayload<TReducerFn>>) => StandardEvent<InferPayload<TReducerFn>, Name>;
export declare type EventCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, NameAcc extends string = ''> = TReducerFnOrMap extends ReducerFnAny ? EventCreator<TReducerFnOrMap, NameAcc> : TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventCreatorOrMap<TReducerFnOrMap[K], NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`>;
} : never;
export declare function getEventCreator<TReducers extends DeepDictionaryItem<ReducerFnAny>>(type?: string): EventCreatorOrMap<TReducers>;
export declare type EventTypes<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, MaxDepth extends number = 5, NameAcc extends string = '', CurrentDepth extends number = 0> = CurrentDepth extends MaxDepth ? never : TReducerFnOrMap extends ReducerFnAny ? StandardEvent<InferPayload<TReducerFnOrMap>, NameAcc> : TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventTypes<TReducerFnOrMap[K], MaxDepth, NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`, Inc<CurrentDepth>>;
}[keyof TReducerFnOrMap] : never;
export {};