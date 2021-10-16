export { };
declare global {
  type Join<T extends unknown[], D extends string> = T extends []
    ? ''
    : T extends [string | number | boolean | bigint]
    ? `${T[0]}`
    : T extends [string | number | boolean | bigint, ...infer U]
    ? `${T[0]}${D}${Join<U, D>}`
    : string;
  type Split<S extends string, D extends string> = string extends S
    ? string[]
    : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];

  interface Array<T> {
    join<This extends T[], TSeperator extends string>(this: This, seperator: TSeperator): Join<This, TSeperator>;

    concat<This extends T[], TConcat extends any[]>(this: This, arr2: TConcat): [...This, ...TConcat];
  }
  interface String {
    split<This extends string, U extends string>(this: This, splitter: U, limit?: number): Split<This, U>;
  }
}
