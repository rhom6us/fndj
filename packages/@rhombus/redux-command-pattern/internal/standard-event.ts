
import { isFunction, isString } from 'lodash';
import type { Action as ReduxAction } from './external/redux';

export type EventType = string;
export interface StandardEvent<TPayload = undefined, TEventType extends string|unknown = unknown> extends ReduxAction<TEventType extends string ? TEventType : string> {
  payload: TPayload;
}
export type CommandCancelled = StandardEvent<string | undefined, 'command_cancelled'>
export type StandardEventAny = StandardEvent<any>;

export function isStandardEvent(value: any): value is StandardEventAny {
  return !isFunction(value) && value.type && isString(value.type);
}
