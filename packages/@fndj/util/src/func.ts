import { Restify } from './restify';

export type Func<TArgs = [], TResult = void> = (...args: Restify<TArgs>) => TResult;
