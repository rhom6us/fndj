import { InferPayload, ReducerFnAny } from './reducer-fn';
import { StandardEvent } from './standard-event';
import { DeepDictionary, DeepDictionaryItem, Restify } from './utils';

 type EventCreator<TReducerFn extends ReducerFnAny> = (...payload: Restify<InferPayload<TReducerFn>>) => StandardEvent<InferPayload<TReducerFn>>;
 type EventCreatorMap<TReducerFnMap extends DeepDictionary<ReducerFnAny>> = {
  [K in keyof TReducerFnMap]: EventCreatorOrMap<TReducerFnMap[K]>;
};
type EventCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>> =
  TReducerFnOrMap extends ReducerFnAny ? EventCreator<TReducerFnOrMap> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? EventCreatorMap<TReducerFnOrMap> :
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
