import { Observable } from './observable';
import { Thunk } from './thunk';

interface Observable_Copy<T> extends Observable<T>  { }
interface Thunk_Copy<T> extends Thunk<T> { }
export type AnyTypeOf<T, TGenReturnUnion = void, TGenNext = [T], TAGenNext = Promise<T>> =
  | void
  | T
  | Thunk_Copy<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>> // why can't I use Thunk as imported Why does this stupid copy work? ?!?!?!
  | Observable_Copy<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>> // why can't I use Observable as imported? Why does this stupid copy work? ?!?!?!
  | PromiseLike<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>>
  | Generator<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>, AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext> | TGenReturnUnion, TGenNext>
  | AsyncGenerator<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>, AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext> | TGenReturnUnion, TAGenNext>
  | Iterable<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>>
  | AsyncIterable<AnyTypeOf<T, TGenReturnUnion, TGenNext, TAGenNext>>
  ;
