import { AssertNever } from './Error';
const Ξ: unique symbol = Symbol("⚡");
type mark<T extends object> = T & { readonly [Ξ]: true; }
function mark<T extends object>(target: T): mark<T>{
  Reflect.defineProperty(target, Ξ, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });  
  return target as any;
}


/**
 * Changes scalers back into the array type from
 * whence they came.
 * 
 * Payload signatures are collected by 'un-spreading'
 * the reducer function's argument list into an 
 * array, unless it's a single value -- in that 
 * case the value stands on its own (makes for 
 * cleaner / easier to read devtools and the like).
 * 
 * Types that get modified are marked with a 'Ξ' so
 * that later we can tell the difference between them
 * and single arrays that passed through untouched.
 */
export type restify<Œ> =
  Œ extends void | null | undefined ? mark<[]> :
  Œ extends any[] ? Œ :
  mark<[Œ]>;

export function restify<Ø>(arg: Ø): restify<Ø>;
export function restify(arg: any) {
  if (arg === undefined) {
    return mark([]);
  }
  if (Array.isArray(arg)) {
    return arg;
  }
  return mark([arg]);
}
 
/**
 * Changes tuples/arrays (extracted from fn signatures) into a scaler (if
 * possible).
 * 
 * Useful when payloads are captured as an array in fn.apply. The resulting
 * type will be that array, unless, it is empty (then void) or a single item
 * (that single value will be extracted). This is all in effor to make devtools
 *  and whatnot look a lot cleaner.
 * 
 * The Ξ markers are there to clarify whether payloads composed of a single
 * array-typed value are intended to be spread on the reducer or are actually
 * a single array parameter.
 */
export type unrestify<Ω extends any[]> =
  Ω extends mark<infer Δ> ? (
    Δ extends [infer φ] | [infer Θ] ? φ | Θ :
    Δ extends [infer φ] ? φ :
    Δ extends [] ? void :
    Δ extends any[] ? Δ ://InvalidTypeArg<`unrestify<T>`, [T: Ω, U: Δ], `Encountered a plain ol' array where a tuple should be specified. Somewhere along the way this type has beed widened and the type information lost.` > :
    AssertNever< `unrestify<T>`, [T: Ω], `The 'Ξ' marker should only be dropped on arrays, and I'm pretty sure that I've already exhaustively checked for that. How the hell did you land here?` >
  )
  : Ω;

export function unrestify<Ħ extends any[]>(arg: Ħ): unrestify<Ħ>;
export function unrestify(arg: any) {
  if (!arg[Ξ]) {
    return arg;
  }
  if (!Array.isArray(arg)) {
    throw new TypeError("Value must be an array");
  }
  switch (arg.length) {
    case 0:
      return;
    case 1:
      return arg[0];
    default:
      return [...arg]; //clear the marker symbol
  }
}
