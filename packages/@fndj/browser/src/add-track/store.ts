import { parseCommands } from '@rhombus/redux-command-pattern';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { commandImplementation } from './commands';
import { events, initialState, reducers, searchReducer } from './reducers';


// const alla = combineReducers({
//     search: searchReducer
// });
// const rootReducer = (history: History) => combineReducers({
//     router: connectRouter(history),
//     fnReducer: searchReducer,
// });

export const store = createStore(
    searchReducer,
    // rootReducer(history),
    initialState,
    // /*initialState*/ Immutable.Map(),
    devToolsEnhancer({ trace: false, actionCreators:  events as any}),
    // DevTools.instrument({trace: true})
);
// export const store = createStore(fnReducer, initialState, __REDUX_DEVTOOLS_EXTENSION__?.());
export const commands = parseCommands(commandImplementation, store, reducers);
