/**
 * ASCII: 65 - 90
 * regex: [A-Z]
 */
declare type UpperCaseChar = Uppercase<LowerCaseChar>;
/**
 * ASCII: 97 - 122
 * regex: [a-z]
 */
declare type LowerCaseChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
declare type J<T extends unknown[]> = T extends [] ? '' : T extends [any] ? `${T[0]}` : T extends [any, ...infer Y] ? `${T[0]}${J<Y>}` : never;
declare type InsertBefore<TInput, TSearch, TInsert> = TInput extends J<[infer X, infer Y, infer Z]> ? Y extends TSearch ? J<[X, TInsert, Y, InsertBefore<Z, TSearch, TInsert>]> : J<[X, InsertBefore<J<[Y, Z]>, TSearch, TInsert>]> : TInput;
export declare type SnakeCase<T extends string> = Uppercase<InsertBefore<T, UpperCaseChar, '_'>>;
export declare type DashCase<T extends string> = Lowercase<InsertBefore<T, UpperCaseChar, '-'>>;
export {};
//# sourceMappingURL=index.d.ts.map