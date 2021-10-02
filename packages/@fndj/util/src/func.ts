import { Restify } from './restify';

export type Func<TArgs = any[], TResult = any> = (...args: Restify<TArgs>) => TResult;
export type AsyncFunc<TArgs = any[], TResult = any> = Func<TArgs, Promise<TResult>>;

export type Ctor<TArgs = any[], TResult = any> = new (...args: Restify<TArgs>) => TResult;
