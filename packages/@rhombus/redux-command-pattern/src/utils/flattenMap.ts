import { Func } from '@rhombus/func';
import { isFunction } from '@rhombus/type-guards';
import { Cast, Inc, obj } from '@rhombus/type-helpers';
import { DeepDictionary, DeepDictionaryItem } from './deep-record';
type _flattenMap<T extends DeepDictionaryItem<Func>, prefix extends string = '', CurrentDepth extends number = 0> =
  CurrentDepth extends 10 ? never :
  T extends DeepDictionary<Func> ? {
    [K in keyof T]: _flattenMap<T[K], prefix extends '' ? K : `${prefix}.${Cast<K, string>}`, Inc<CurrentDepth>>
  }[keyof T] : [prefix, T]

export type flattenMap<T extends DeepDictionary<Func>> = obj.fromEntries<_flattenMap<T>>;
export function flattenMap<T extends DeepDictionary<Func>>(map: T): flattenMap<T> {
  const result: any = {};
  const stack = Object.entries(map);
  while (stack.length) {
    const [prefix, mapOrFun] = stack.pop()!;
    if (isFunction(mapOrFun)) {
      result[prefix] = mapOrFun;
    } else {
      for (const [key, p] of Object.entries(mapOrFun)) {
        stack.push([join(prefix, key), p]);
      }
    }
  }
  return result;
}

function join(...args: string[]): string {
  return args.filter(Boolean).join(".");
}
