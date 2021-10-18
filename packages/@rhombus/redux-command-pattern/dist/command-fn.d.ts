import { Func } from '@rhombus/func';
import { Restify } from '@rhombus/type-helpers';
import { StandardCommand } from './standard-command';
import { StandardEventAny } from './standard-event';
import { Dispatch, GetState } from './store';
import { AnyTypeOf, DeepDictionary, DeepDictionaryItem } from './utils';
declare type CommandResult<TState, TEvent extends StandardEventAny> = AnyTypeOf<TEvent, TState>;
export declare type CommandFn<TState, TPayload, TEvents extends StandardEventAny> = (state: TState, ...payload: Restify<TPayload>) => CommandResult<TState, TEvents>;
export declare type CommandFnAny = CommandFn<any, any, any>;
declare type CommandFnMap = DeepDictionaryItem<CommandFnAny>;
declare type InferState<T extends CommandFnMap> = T extends DeepDictionaryItem<CommandFn<infer TState, any, any>> ? TState : never;
declare type InferEvents<T extends CommandFnMap> = T extends DeepDictionaryItem<CommandFn<any, any, infer TEvents>> ? TEvents : never;
export declare type InferPayload<T extends CommandFnMap> = T extends Func<[any, ...infer TPayload], any> ? TPayload : T extends DeepDictionary<CommandFnAny> ? {
    [K in keyof T]: InferPayload<T[K]>;
}[keyof T] : never;
export declare type CommandHandler<TPayload> = Func<[StandardCommand<TPayload>, AbortSignal?], Promise<void>>;
export interface Store<TState = any, TEvents extends StandardEventAny = StandardEventAny> {
    dispatch: Dispatch<TEvents>;
    getState: GetState<TState>;
}
export declare type InferStore<T extends DeepDictionary<CommandFnAny>> = Store<InferState<T>, InferEvents<T>>;
/**
 * Accepts a standard-command, looks up its implementation, invokes it, and dispatches the resulting events to the store.
 * @param store
 * @param implementation {[command-name]: (state, payload)=>events}
 * @returns ({command-name, payload}) => canceller
 */
export declare function createCommandHandler<T extends DeepDictionary<CommandFnAny>>(store: InferStore<T>, implementation: T): CommandHandler<InferPayload<T>>;
export {};
