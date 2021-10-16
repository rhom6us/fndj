import { InferPayload, ReducerFnAny } from './reducer-fn';
import { StandardEvent } from './standard-event';
import { Cast, DeepDictionary, DeepDictionaryItem, Inc, Restify } from './utils';

 type EventCreator<TReducerFn extends ReducerFnAny, Name extends string|unknown> = (...payload: Restify<InferPayload<TReducerFn>>) => StandardEvent<InferPayload<TReducerFn>, Name>;

export type EventCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, NameAcc extends string|unknown = unknown> =
  TReducerFnOrMap extends ReducerFnAny ? EventCreator<TReducerFnOrMap, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventCreatorOrMap<TReducerFnOrMap[K], NameAcc extends string ? `${NameAcc}.${Cast<K, string>}` : K>;
   } :
  never;

// eslint-disable-next-line @typescript-eslint/no-empty-function
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


export type EventTypes<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, NameAcc extends string | unknown = unknown, MaxDepth extends number = 10, CurrentDepth extends number = 0> =
  CurrentDepth extends MaxDepth ? never :
  TReducerFnOrMap extends ReducerFnAny ? StandardEvent<InferPayload<TReducerFnOrMap>, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventTypes<TReducerFnOrMap[K], NameAcc extends string ? `${NameAcc}.${Cast<K, string>}` : K, MaxDepth, Inc<CurrentDepth>>;
   }[keyof TReducerFnOrMap] :
  never;
