import { Func } from './';

//export function exec<TArgs extends any[] = [], TResult = void>(fn: (...a:TArgs)=>TResult, ...args:TArgs) {
export function exec<TArgs, TResult = void>(fn: Func<TArgs, TResult>, ...args:TArgs extends any[] ? TArgs : [TArgs]) {
  return fn(...args);
}
