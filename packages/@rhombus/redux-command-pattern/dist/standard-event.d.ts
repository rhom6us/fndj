import type { Action as ReduxAction } from './external/redux';
export declare type EventType = string;
export interface StandardEvent<TPayload, TEventType extends string> extends ReduxAction<TEventType> {
    payload: TPayload;
}
export declare type StandardEventAny = StandardEvent<any, any>;
export declare function isStandardEvent(value: any): value is StandardEventAny;
