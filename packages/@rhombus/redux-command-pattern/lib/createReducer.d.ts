import { EventTypes } from './event-creator';
import { Reducer as ReduxReducer } from './external/redux';
import { ReducerFnAny } from './reducer-fn';
import { DeepDictionary } from './utils';
export declare function createReducer<T extends DeepDictionary<ReducerFnAny>>(reducers: T): ReduxReducer</*InferState<T>*/ any, EventTypes<T>>;
//# sourceMappingURL=createReducer.d.ts.map