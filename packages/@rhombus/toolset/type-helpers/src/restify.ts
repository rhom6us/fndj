
/**
 * Prepares payload packages to be applied to a handler function (as an array).
 */
export type restify<T> =
  T extends void | null | undefined ? [] :
  T extends any[] ? T :
  [T];
export function restify<T>(arg: T): restify<T>;
export function restify<T>(arg: T) {
  if (arg === undefined) {
    return [];
  }
  if (Array.isArray(arg)) {
    return arg;
  }
  return [arg];
}


/**
 * Useful when payloads are captured as an array in fn.apply.
 * The resulting type will be that array, unless, it is empty (then
 * void) or a single item (makes devtools and whatnot look a lot
 * cleaner).
 */
export type unrestify<T extends any[]> =
  T extends [infer R1] | [infer R2] ? R1 | R2 :
  T extends [infer R] ? R :
  T extends [] ? void :
  T extends any[] ? T :
  never;
export function unrestify<T extends any[]>(arg: T): unrestify<T>;
export function unrestify<T extends any[]>(arg: T) {
  if (!Array.isArray(arg)) {
    throw new TypeError("Value must be an array");
  }
  switch (arg.length) {
    case 0:
      return;
    case 1:
      return arg[0];
    default:
      return arg;
  }
}
