import { AsyncAction } from "@rhombus-toolkit/func";
import { isFunction } from 'lodash';
import { CommandResult } from '../create-command-handler';
import { StandardEventAny } from '../standard-event';

export type ThunkDispatch<T = CommandResult<any, StandardEventAny>> = AsyncAction<[T]>;
export type Thunk<T = CommandResult<any, StandardEventAny>> = (handle: ThunkDispatch<T>) => void;

export function isThunk(value: any): value is Thunk<any> {
  return isFunction(value) && value.length === 1;
}
