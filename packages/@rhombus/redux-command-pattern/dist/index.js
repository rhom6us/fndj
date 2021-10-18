import { getCommands } from './command-creator';
import { createCommandHandler } from './command-fn';
import { getEventCreator } from './event-creator';
import { createReducer } from './reducer-fn';
export { createCommandHandler };
export function parseReducers(reducers) {
    const reducer = createReducer(reducers);
    const events = getEventCreator();
    return [reducer, events];
}
export function getCommandParsers(implementation) {
    const getHandler = (store) => createCommandHandler(store, implementation);
    const gc = (handler) => getCommands(handler);
    return [getHandler, gc];
}
export function getEverything(reducers, commandImplementation, createStore) {
    const reducer = createReducer(reducers);
    const events = getEventCreator();
    const store = createStore(reducer);
    const handler = createCommandHandler(store, commandImplementation);
    const commands = getCommands(handler);
    return [store, events, commands];
}
//# sourceMappingURL=index.js.map