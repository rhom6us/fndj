import { DeepDictionary } from '@rhombus/type-helpers';
import { EventTypes } from './event-creator';
import { Reducer as ReduxReducer } from './external/redux';
import { ReducerFnAny } from './reducer-fn';
export declare function createReducer<T extends DeepDictionary<ReducerFnAny>>(reducers: T): ReduxReducer</*InferState<T>*/ any, EventTypes<T>>;
//# sourceMappingURL=createReducer.d.ts.map