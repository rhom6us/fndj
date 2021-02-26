
import { isFunction, isString } from 'lodash';
import { Action as ReduxAction } from 'redux';

export type EventType = string;
export interface StandardEvent<TPayload = undefined, TEventType = EventType> extends ReduxAction<TEventType> {
  payload: TPayload;
}
export type CommandCancelled = StandardEvent<string | undefined, 'command_cancelled'>
export type StandardEventAny = StandardEvent<any>;

export function isStandardEvent(value: any): value is StandardEventAny {
  return !isFunction(value) && value.type && isString(value.type);
}
