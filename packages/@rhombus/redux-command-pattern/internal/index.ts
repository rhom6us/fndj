import { getCommands } from './command-creator';
import { CommandFn, CommandFnAny, createCommandHandler, InferStore, Store } from './command-fn';
import { EventTypes, getEventCreator } from './event-creator';
import { Reducer } from './external/redux';
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

export function getCommandParsers<Commands extends DeepDictionary<CommandFnAny>>(implementation:Commands){
    const getHandler = (store: InferStore<Commands>) => createCommandHandler(store, implementation);
    const gc = (handler:ReturnType<typeof getHandler>) => getCommands(handler);
    return [getHandler, gc] as const;
}

export function getEverything<TReducers extends DeepDictionaryItem<ReducerFnAny>, Commands extends DeepDictionary<CommandFn<InferState<TReducers>, any, EventTypes<TReducers>>>>(reducers: TReducers, commandImplementation: Commands, createStore: (reducer:Reducer<InferState<TReducers>, EventTypes<TReducers>>)=>Store<InferState<TReducers>, EventTypes<TReducers>>) {
    const reducer = createReducer(reducers);
    const events = getEventCreator<TReducers>();
    const store = createStore(reducer);
    const handler = createCommandHandler(store, commandImplementation);
    const commands = getCommands(handler);
    return [store, events, commands];

}
