import { Func } from '@rhombus/func';
import { DeepDictionaryItem, DeepRecord, DeepRecordItem, restify } from '@rhombus/type-helpers';
export declare type ReducerFn<TState = any, TPayload = undefined> = (state: TState, ...payload: restify<TPayload>) => TState;
export declare type ReducerFnAny = ReducerFn<any, any>;
export declare type InferState<T extends DeepDictionaryItem<ReducerFn<any, any>>> = T extends DeepDictionaryItem<ReducerFn<infer TState, any>> ? TState : {
    ERROR: {
        T: T;
    };
};
export declare type InferPayload<TMap extends DeepRecordItem<string, ReducerFnAny>> = TMap extends Func<[any, ...infer TPayload], any> ? TPayload : TMap extends DeepRecord<string, ReducerFnAny> ? {
    [K in keyof TMap]: InferPayload<TMap[K]>;
}[keyof TMap] : never;
//# sourceMappingURL=reducer-fn.d.ts.map