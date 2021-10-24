import { parseCommands } from '@rhombus/redux-command-pattern';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { commandImplementation } from './commands';
import { events, reducers, searchReducer, SearchState } from './reducers';


declare const __REDUX_DEVTOOLS_EXTENSION__: any;
// const alla = combineReducers({
//     search: searchReducer
// });
// const rootReducer = (history: History) => combineReducers({
//     router: connectRouter(history),
//     fnReducer: searchReducer,
// });
const initialState: SearchState = {
    searchTerm: '',
    results: [],
};

function ac() {
    return {
        type: 'asdf' as const
    };
}
const actionCreators = {
    increment() {
      return {type: 'INCREMENT_COUNTER'};
    },
    decrement() {
      return {type: 'DECREMENT_COUNTER'};
    },
    nested: {
      worksToo() {
        return {type: 'NESTED_WORKS_TOO', cool: true};
      },
    },
};
(window as any).events = events;
  console.log({events})
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
