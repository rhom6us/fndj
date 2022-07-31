import { Func } from "@rhombus-toolkit/func";
import { Cast } from './cast';
import { Inc } from './counter';
import { DeepDictionary, DeepDictionaryItem } from './deep-record';
import { fromEntries } from './obj';
type _flattenMap<T extends DeepDictionaryItem<Func>, prefix extends string = '', CurrentDepth extends number = 0> =
  CurrentDepth extends 10 ? never :
  T extends DeepDictionary<Func> ? {
    [K in keyof T]: _flattenMap<T[K], prefix extends '' ? K : `${prefix}.${Cast<K, string>}`, Inc<CurrentDepth>>
  }[keyof T] : [prefix, T]

export type flattenMap<T extends DeepDictionary<Func>> = fromEntries<_flattenMap<T>>;
export function flattenMap<T extends DeepDictionary<Func>>(map: T): flattenMap<T> {
  const result: any = {};
  const stack = Object.entries(map);
  while (stack.length) {
    const [prefix, mapOrFun] = stack.pop()!;
    if (typeof mapOrFun === 'function') {
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
