import { CommandFn, createCommandHandler } from './create-command-handler';
import { EventTypes } from './event-creator';
import { ReducerFn, ReducerFnAny } from './reducer-fn';
import { Store } from './store';
import { DeepDictionary, DeepDictionaryItem } from './utils';
export type { AsyncCommandGenerator, CommandGenerator, CommandResult } from './create-command-handler';
export type { StandardEvent, StandardEventAny } from './standard-event';
export type { ReducerFn, CommandFn };
export { createCommandHandler };
export declare function parseReducers<TReducers extends DeepDictionary<ReducerFnAny>>(reducers: TReducers): readonly [import("./external/redux").Reducer<any, TReducers extends ReducerFnAny ? import("./standard-event").StandardEvent<import("./reducer-fn").InferPayload<TReducers>, ""> : TReducers extends DeepDictionary<ReducerFnAny> ? { [K in keyof TReducers]: TReducers[K] extends ReducerFnAny ? import("./standard-event").StandardEvent<import("./reducer-fn").InferPayload<TReducers[K]>, K> : TReducers[K] extends DeepDictionary<ReducerFnAny> ? { [K_1 in keyof TReducers[K]]: TReducers[K][K_1] extends ReducerFnAny ? import("./standard-event").StandardEvent<import("./reducer-fn").InferPayload<TReducers[K][K_1]>, K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`> : TReducers[K][K_1] extends DeepDictionary<ReducerFnAny> ? { [K_2 in keyof TReducers[K][K_1]]: TReducers[K][K_1][K_2] extends ReducerFnAny ? import("./standard-event").StandardEvent<import("./reducer-fn").InferPayload<TReducers[K][K_1][K_2]>, (K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`) extends "" ? K_2 : `${K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`}.${import("@rhombus/type-helpers").Cast<K_2, string>}`> : TReducers[K][K_1][K_2] extends DeepDictionary<ReducerFnAny> ? { [K_3 in keyof TReducers[K][K_1][K_2]]: TReducers[K][K_1][K_2][K_3] extends ReducerFnAny ? import("./standard-event").StandardEvent<import("./reducer-fn").InferPayload<TReducers[K][K_1][K_2][K_3]>, ((K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`) extends "" ? K_2 : `${K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`}.${import("@rhombus/type-helpers").Cast<K_2, string>}`) extends "" ? K_3 : `${(K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`) extends "" ? K_2 : `${K extends "" ? K_1 : `${K}.${import("@rhombus/type-helpers").Cast<K_1, string>}`}.${import("@rhombus/type-helpers").Cast<K_2, string>}`}.${import("@rhombus/type-helpers").Cast<K_3, string>}`> : TReducers[K][K_1][K_2][K_3] extends DeepDictionary<ReducerFnAny> ? { [K_4 in keyof TReducers[K][K_1][K_2][K_3]]: never; }[keyof TReducers[K][K_1][K_2][K_3]] : never; }[keyof TReducers[K][K_1][K_2]] : never; }[keyof TReducers[K][K_1]] : never; }[keyof TReducers[K]] : never; }[keyof TReducers] : never>, import("./event-creator").EventCreatorOrMap<TReducers, "">];
export declare function parseCommands<TReducers extends DeepDictionaryItem<ReducerFnAny>, TCommands extends DeepDictionary<CommandFn</*InferState<TReducers>*/ any, any, EventTypes<TReducers>>>>(implementation: TCommands, store: Store, reducers?: TReducers): TCommands extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands>>], void> : TCommands extends Record<string, any> ? { [K in keyof TCommands]: TCommands[K] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K]>>], void> : TCommands[K] extends Record<string, any> ? { [K_1 in keyof TCommands[K]]: TCommands[K][K_1] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1]>>], void> : TCommands[K][K_1] extends Record<string, any> ? { [K_2 in keyof TCommands[K][K_1]]: TCommands[K][K_1][K_2] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2]>>], void> : TCommands[K][K_1][K_2] extends Record<string, any> ? { [K_3 in keyof TCommands[K][K_1][K_2]]: TCommands[K][K_1][K_2][K_3] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3]>>], void> : TCommands[K][K_1][K_2][K_3] extends Record<string, any> ? { [K_4 in keyof TCommands[K][K_1][K_2][K_3]]: TCommands[K][K_1][K_2][K_3][K_4] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4]>>], void> : TCommands[K][K_1][K_2][K_3][K_4] extends Record<string, any> ? { [K_5 in keyof TCommands[K][K_1][K_2][K_3][K_4]]: TCommands[K][K_1][K_2][K_3][K_4][K_5] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4][K_5]>>], void> : TCommands[K][K_1][K_2][K_3][K_4][K_5] extends Record<string, any> ? { [K_6 in keyof TCommands[K][K_1][K_2][K_3][K_4][K_5]]: TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6]>>], void> : TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6] extends Record<string, any> ? { [K_7 in keyof TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6]]: TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]>>], void> : TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends Record<string, any> ? { [K_8 in keyof TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7]]: TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]>>], void> : TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends Record<string, any> ? { [K_9 in keyof TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]]: TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends import("./create-command-handler").CommandFnAny ? import("@rhombus/func").Func<[...payload: import("@rhombus/type-helpers").restify<import("./create-command-handler").InferPayload<TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]>>], void> : TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends Record<string, any> ? { [K_10 in keyof TCommands[K][K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]]: any; } : never; } : never; } : never; } : never; } : never; } : never; } : never; } : never; } : never; } : never; } : never;
//# sourceMappingURL=index.d.ts.map