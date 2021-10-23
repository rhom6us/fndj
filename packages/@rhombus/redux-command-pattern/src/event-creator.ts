import { Cast, Inc, restify } from '@rhombus/type-helpers';
import { InferPayload, ReducerFnAny } from './reducer-fn';
import { StandardEvent } from './standard-event';
import { DeepDictionary, DeepDictionaryItem } from './utils';

 type EventCreator<TReducerFn extends ReducerFnAny, Name extends string> = (...payload: restify<InferPayload<TReducerFn>>) => StandardEvent<InferPayload<TReducerFn>, Name>;

export type EventCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, NameAcc extends string = ''> =
  TReducerFnOrMap extends ReducerFnAny ? EventCreator<TReducerFnOrMap, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventCreatorOrMap<TReducerFnOrMap[K], NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`>;
   } :
  never;
function defaultFn() {}
export function getEventCreator<TReducers extends DeepDictionaryItem<ReducerFnAny>>(type?: string): EventCreatorOrMap<TReducers> {
  return new Proxy(defaultFn, {
    get(target, prop) {
      const ns = [type, prop].filter(Boolean).join('.');
      return getEventCreator<TReducers>(ns);
    },
    apply(target, thisArg, payload) {
      return {
        type,
        payload,
      };
    },
  }) as EventCreatorOrMap<TReducers>;
}


export type EventTypes<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, MaxDepth extends number = 5, NameAcc extends string = '', CurrentDepth extends number = 0> =
  CurrentDepth extends MaxDepth ? never :
  TReducerFnOrMap extends ReducerFnAny ? StandardEvent<InferPayload<TReducerFnOrMap>, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventTypes<TReducerFnOrMap[K], MaxDepth, NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`, Inc<CurrentDepth>>;
   }[keyof TReducerFnOrMap] :
  never;
