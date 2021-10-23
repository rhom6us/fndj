import { CommandFn, createCommandHandler } from './create-command-handler';
import { createReducer } from './createReducer';
import { EventTypes, getEventCreator } from './event-creator';
import { getCommands } from './get-commands';
import { InferState, ReducerFn, ReducerFnAny } from './reducer-fn';
import { Store } from './store';
import { DeepDictionary, DeepDictionaryItem } from './utils';

export type { StandardEvent, StandardEventAny } from './standard-event';
export type { ReducerFn, CommandFn };
export { createCommandHandler };
export function parseReducers<TReducers extends DeepDictionary<ReducerFnAny>>(reducers: TReducers) {
    const reducer = createReducer(reducers);
    const events = getEventCreator<TReducers>();
    return [reducer, events] as const;
}
export function parseCommands<TReducers extends DeepDictionaryItem<ReducerFnAny>, TCommands extends DeepDictionary<CommandFn<InferState<TReducers>, any, EventTypes<TReducers>>>>(implementation: TCommands, store: Store, reducers?: TReducers) {
    const handler = createCommandHandler(store, implementation);
    const commands = getCommands<TCommands>(handler);
    return commands;
}


// export function getCommandParsers<Commands extends DeepDictionary<CommandFnAny>>(implementation:Commands){
//     const getHandler = (store: InferStore<Commands>) => createCommandHandler(store, implementation);
//     const gc = (handler:ReturnType<typeof getHandler>) => getCommands(handler);
//     return [getHandler, gc] as const;
// }
