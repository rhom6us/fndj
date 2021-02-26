import { isFunction } from 'lodash';

export type Thunk<TEvent> = (dispatch: (event: TEvent) => void) => void;

export function isThunk(value: any): value is Thunk<any>{
  return isFunction(value) && value.length === 1;
}
