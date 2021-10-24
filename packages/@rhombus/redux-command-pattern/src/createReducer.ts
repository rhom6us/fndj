import { restify } from '@rhombus/type-helpers';
import { EventTypes } from './event-creator';
import { Reducer as ReduxReducer } from './external/redux';
import { InferState, ReducerFnAny } from './reducer-fn';
import { DeepDictionary, flattenMap } from './utils';


export function createReducer<T extends DeepDictionary<ReducerFnAny>>(reducers: T): ReduxReducer<InferState<T>, EventTypes<T>> {

  const flatMap: any = flattenMap(reducers);
  return function rootReducerfn(state, { type, payload }) {
    if (state === undefined) {
      throw new TypeError('redux-command-pattern does not support undefined state. Please preload with an initial state');
    }
    if (!(type in flatMap)) {
      // eslint-disable-next-line no-console
      console.warn(`reducer not found for action: ${type}`);
      return state;
    }
    return flatMap[type](state, ...restify(payload as any));
  };
}