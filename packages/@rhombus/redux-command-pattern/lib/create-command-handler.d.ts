/**
 *
 * Accepts a standard-command, looks up its implementation, invokes it, and handlees the resulting events to the store.
 * @param store
 * @param implementation {[command-name]: (state, payload)=>events}
 * @returns This is like a reducer for command objects
 */
import { AsyncAction, Func } from '@rhombus/func';
import { DeepDictionary, DeepDictionaryItem, restify } from '@rhombus/type-helpers';
import { StandardCommand } from './standard-command';
import { StandardEventAny } from './standard-event';
import { Store } from './store';
import { AnyTypeOf } from './utils';
export declare type CommandFn<TState, TPayload, TEvents extends StandardEventAny> = (state: TState, ...payload: restify<TPayload>) => CommandResult<TState, TEvents>;
export declare type CommandFnAny = CommandFn<any, any, any>;
export declare type CommandGenerator<TState, TEvent extends StandardEventAny = StandardEventAny> = Generator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, TState>;
export declare type AsyncCommandGenerator<TState, TEvent extends StandardEventAny = StandardEventAny> = AsyncGenerator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, TState>;
export declare type CommandResult<TState = any, TEvent extends StandardEventAny = StandardEventAny> = AnyTypeOf<TEvent, TState>;
export declare type CommandMap<S = any, P = any, E extends StandardEventAny = StandardEventAny> = DeepDictionary<CommandFn<S, P, E>>;
export declare type CommandFnOrMap = DeepDictionaryItem<CommandFnAny>;
declare type InferState<T extends CommandFnOrMap> = T extends DeepDictionaryItem<CommandFn<infer TState, any, any>> ? TState : never;
declare type InferEvents<T extends CommandFnOrMap> = T extends DeepDictionaryItem<CommandFn<any, any, infer TEvents>> ? TEvents : never;
export declare type InferPayload<T extends CommandFnOrMap> = T extends Func<[any, ...infer TPayload], any> ? TPayload : T extends DeepDictionary<CommandFnAny> ? {
    [K in keyof T]: InferPayload<T[K]>;
}[keyof T] : never;
export declare type InferStore<T extends DeepDictionaryItem<CommandFnAny>> = Store<InferState<T>, InferEvents<T>>;
export declare type CommandHandler<T extends DeepDictionaryItem<CommandFnAny>> = AsyncAction<[commandObject: StandardCommand<InferPayload<T>>, signal?: AbortSignal]>;
export declare function createCommandHandler<T extends DeepDictionary<CommandFnAny>>(store: Store, implementation: T): CommandHandler<T>;
export {};
//# sourceMappingURL=create-command-handler.d.ts.map