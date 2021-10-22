import { getCommands } from './command-creator';
import { CommandFn, createCommandHandler, Store } from './command-fn';
import { EventTypes, getEventCreator } from './event-creator';
import { createReducer, InferState, ReducerFn, ReducerFnAny } from './reducer-fn';
import { DeepDictionary, DeepDictionaryItem } from './utils';

export { StandardEvent, StandardEventAny } from './standard-event';
export { CommandFn, createCommandHandler };
export { ReducerFn };

export function parseReducers<TReducers extends DeepDictionaryItem<ReducerFnAny>>(reducers: TReducers) {
    const reducer = createReducer(reducers);
    const events = getEventCreator<TReducers>();
    return [reducer, events] as const;
}
export function parseCommands<TReducers extends DeepDictionaryItem<ReducerFnAny>, TCommands extends DeepDictionary<CommandFn<InferState<TReducers>, any, EventTypes<TReducers>>>>(implementation: TCommands, store: Store<InferState<TReducers>, EventTypes<TReducers>>, reducers?: TReducers) {
    const handler = createCommandHandler(store, implementation);
    const commands = getCommands<TCommands>(handler);
    return commands;
}


// export function getCommandParsers<Commands extends DeepDictionary<CommandFnAny>>(implementation:Commands){
//     const getHandler = (store: InferStore<Commands>) => createCommandHandler(store, implementation);
//     const gc = (handler:ReturnType<typeof getHandler>) => getCommands(handler);
//     return [getHandler, gc] as const;
// }
