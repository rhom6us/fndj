
import { applyMiddleware, createStore } from 'redux';
import { createCommandHandler, createReducer, getCommandCreator, getEventCreator } from 'redux-command-pattern';
import * as preprocess from './preprocess';
import { defaultState } from './state';
// import createSagaMiddleware from 'redux-saga';

const reducerFns = {
  preprocess: preprocess.reducers
};
const commandFns = {
  preprocess: preprocess.commands
};



const store = createStore(createReducer(reducerFns), defaultState);

export const events = getEventCreator<typeof reducerFns>()
export const commands = getCommandCreator<typeof commandFns>(createCommandHandler(store, commandFns));

// if (module.hot) {
//       // eslint-disable-next-line @typescript-eslint/no-var-requires
//       store.replaceReducer(require('../reducers').default)
//   );
// }
