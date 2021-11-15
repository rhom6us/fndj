import { createCommandHandler } from './create-command-handler';
import { createReducer } from './createReducer';
import { getEventCreator } from './event-creator';
import { getCommands } from './get-commands';
export { createCommandHandler };
export function parseReducers(reducers) {
    const reducer = createReducer(reducers);
    const events = getEventCreator(reducers);
    ;
    return [reducer, events];
}
export function parseCommands(implementation, store, reducers) {
    const handler = createCommandHandler(store, implementation);
    const commands = getCommands(handler);
    return commands;
}
// export function getCommandParsers<Commands extends DeepDictionary<CommandFnAny>>(implementation:Commands){
//     const getHandler = (store: InferStore<Commands>) => createCommandHandler(store, implementation);
//     const gc = (handler:ReturnType<typeof getHandler>) => getCommands(handler);
//     return [getHandler, gc] as const;
// }
//# sourceMappingURL=index.js.map