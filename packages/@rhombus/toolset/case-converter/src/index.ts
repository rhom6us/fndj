/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * ASCII: 32
 * regex: \s
 */
type SpaceChar = ' ';

/**
 * regex: \S
 */
type NonSpaceChar = Exclude<AnyChar, SpaceChar>;

/**
 * ASCII: 33-47
 */
type SymbolChar1 = '!' | '"' | '#' | '$' | '%' | '&' | "'" | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/';

/**
 * ASCII: 48-57
 * regex: \d
 */
type DigitChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * regex: \D
 */
type NonDigitChar = Exclude<AnyChar, DigitChar>;

/**
 * ASCII: 58 - 64
 */
type SymbolChar2 = ':' | ';' | '<' | '=' | '>' | '?' | '@';

/**
 * ASCII: 65 - 90
 * regex: [A-Z]
 */
type UpperCaseChar = Uppercase<LowerCaseChar>;

/**
 * ASCII: 91 - 96
 */
type SymbolChar3 = '[' | '\\' | ']' | '^' | '_' | '`';

/**
 * ASCII: 97 - 122
 * regex: [a-z]
 */
type LowerCaseChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

/**
 * ASCII: 123 - 126
 */
type SymbolChar4 = '{' | '|' | '}' | '~';

type SymbolChar = SymbolChar1 | SymbolChar2 | SymbolChar3 | SymbolChar4;
type LetterChar = UpperCaseChar | LowerCaseChar;

/**
 * almost the same as string but excludes things like \t, \n, etc that is highly unlikely one would want to be explicitely typed
 */
type AnyChar = LetterChar | DigitChar | SymbolChar | SpaceChar;

/**
 * regez: \w
 */
type WordChar = LetterChar | DigitChar | '_';

/**
 * regez: \W
 */
type NonWordChar = Exclude<AnyChar, WordChar>;

type Replace<T, P extends string, R extends string> = T extends `${infer X}${P}${infer Y}` ? `${X}${R}${Replace<Y, P, R>}` : T;

// type Upper<T extends string> =
//     T extends `${infer X}a${infer Y}` ? `${Upper<X>}A${Upper<Y>}` :
//     T extends `${infer X}b${infer Y}` ? `${Upper<X>}B${Upper<Y>}` :
//     T extends `${infer X}c${infer Y}` ? `${Upper<X>}C${Upper<Y>}` :
//     T extends `${infer X}d${infer Y}` ? `${Upper<X>}D${Upper<Y>}` :
//     T extends `${infer X}e${infer Y}` ? `${Upper<X>}E${Upper<Y>}` :
//     T extends `${infer X}f${infer Y}` ? `${Upper<X>}F${Upper<Y>}` :
//     T extends `${infer X}g${infer Y}` ? `${Upper<X>}G${Upper<Y>}` :
//     T extends `${infer X}h${infer Y}` ? `${Upper<X>}H${Upper<Y>}` :
//     T extends `${infer X}i${infer Y}` ? `${Upper<X>}I${Upper<Y>}` :
//     T extends `${infer X}j${infer Y}` ? `${Upper<X>}J${Upper<Y>}` :
//     T extends `${infer X}k${infer Y}` ? `${Upper<X>}K${Upper<Y>}` :
//     T extends `${infer X}l${infer Y}` ? `${Upper<X>}L${Upper<Y>}` :
//     T extends `${infer X}m${infer Y}` ? `${Upper<X>}M${Upper<Y>}` :
//     T extends `${infer X}n${infer Y}` ? `${Upper<X>}N${Upper<Y>}` :
//     T extends `${infer X}o${infer Y}` ? `${Upper<X>}O${Upper<Y>}` :
//     T extends `${infer X}p${infer Y}` ? `${Upper<X>}P${Upper<Y>}` :
//     T extends `${infer X}q${infer Y}` ? `${Upper<X>}Q${Upper<Y>}` :
//     T extends `${infer X}r${infer Y}` ? `${Upper<X>}R${Upper<Y>}` :
//     T extends `${infer X}s${infer Y}` ? `${Upper<X>}S${Upper<Y>}` :
//     T extends `${infer X}t${infer Y}` ? `${Upper<X>}T${Upper<Y>}` :
//     T extends `${infer X}u${infer Y}` ? `${Upper<X>}U${Upper<Y>}` :
//     T extends `${infer X}v${infer Y}` ? `${Upper<X>}V${Upper<Y>}` :
//     T extends `${infer X}w${infer Y}` ? `${Upper<X>}W${Upper<Y>}` :
//     T extends `${infer X}x${infer Y}` ? `${Upper<X>}X${Upper<Y>}` :
//     T extends `${infer X}y${infer Y}` ? `${Upper<X>}Y${Upper<Y>}` :
//     T extends `${infer X}z${infer Y}` ? `${Upper<X>}Z${Upper<Y>}` :
//     T;
// type Lower<T extends string> =
//     T extends `${infer X}A${infer Y}` ? `${Lower<X>}a${Lower<Y>}` :
//     T extends `${infer X}B${infer Y}` ? `${Lower<X>}b${Lower<Y>}` :
//     T extends `${infer X}C${infer Y}` ? `${Lower<X>}c${Lower<Y>}` :
//     T extends `${infer X}D${infer Y}` ? `${Lower<X>}d${Lower<Y>}` :
//     T extends `${infer X}E${infer Y}` ? `${Lower<X>}e${Lower<Y>}` :
//     T extends `${infer X}F${infer Y}` ? `${Lower<X>}f${Lower<Y>}` :
//     T extends `${infer X}G${infer Y}` ? `${Lower<X>}g${Lower<Y>}` :
//     T extends `${infer X}H${infer Y}` ? `${Lower<X>}h${Lower<Y>}` :
//     T extends `${infer X}I${infer Y}` ? `${Lower<X>}i${Lower<Y>}` :
//     T extends `${infer X}J${infer Y}` ? `${Lower<X>}j${Lower<Y>}` :
//     T extends `${infer X}K${infer Y}` ? `${Lower<X>}k${Lower<Y>}` :
//     T extends `${infer X}L${infer Y}` ? `${Lower<X>}l${Lower<Y>}` :
//     T extends `${infer X}M${infer Y}` ? `${Lower<X>}m${Lower<Y>}` :
//     T extends `${infer X}N${infer Y}` ? `${Lower<X>}n${Lower<Y>}` :
//     T extends `${infer X}O${infer Y}` ? `${Lower<X>}o${Lower<Y>}` :
//     T extends `${infer X}P${infer Y}` ? `${Lower<X>}p${Lower<Y>}` :
//     T extends `${infer X}Q${infer Y}` ? `${Lower<X>}q${Lower<Y>}` :
//     T extends `${infer X}R${infer Y}` ? `${Lower<X>}r${Lower<Y>}` :
//     T extends `${infer X}S${infer Y}` ? `${Lower<X>}s${Lower<Y>}` :
//     T extends `${infer X}T${infer Y}` ? `${Lower<X>}t${Lower<Y>}` :
//     T extends `${infer X}U${infer Y}` ? `${Lower<X>}u${Lower<Y>}` :
//     T extends `${infer X}V${infer Y}` ? `${Lower<X>}v${Lower<Y>}` :
//     T extends `${infer X}W${infer Y}` ? `${Lower<X>}w${Lower<Y>}` :
//     T extends `${infer X}X${infer Y}` ? `${Lower<X>}x${Lower<Y>}` :
//     T extends `${infer X}Y${infer Y}` ? `${Lower<X>}y${Lower<Y>}` :
//     T extends `${infer X}Z${infer Y}` ? `${Lower<X>}z${Lower<Y>}` :
//     T;
// type Cap<T extends string> =
//     T extends `${Lower<infer X>}${infer Y}` ? `${Upper<X>}${Y}` : T;

// type Uncap<T extends string> =
//     T extends `${Upper<infer X>}${infer Y}` ? `${Lower<X>}${Y}` : T;

// type Stringable = string | number | bigint | boolean | null | undefined;

// eslint-disable-next-line prettier/prettier
type J<T extends unknown[]> =
  T extends [] ? '' :
  T extends [any] ? `${T[0]}` :
  T extends [any, ...infer Y] ? `${T[0]}${J<Y>}` :
  never;

// type D2<T> = J<[T, T]>;
// type D3<T> = J<[T, D2<T>]>;
// type D4<T> = J<[T, D3<T>]>;
// type D5<T> = J<[T, D4<T>]>;
// type D6<T> = J<[T, D5<T>]>;
// type D7<T> = J<[T, D6<T>]>;
// type D8<T> = J<[T, D7<T>]>;
// type D9<T> = J<[T, D8<T>]>;
// type Many<T> = D2<T> | D3<T> | D4<T> | D5<T> | D6<T> | D7<T> | D8<T> | D9<T>;
// type OneOrMany<T> = T | Many<T>;
// type SingleLetter<T> = Tail<T> extends '' ? T : never;
// type Gobble<T, U> = T extends J<[infer X, infer Y, infer Z]> ? (Y extends U ? X : J<[X, Gobble<J<[Y, Z]>, U>]>) : T;
// type Gobble<T, U> =
//     T extends `${infer X}${infer Y}${infer Z}`
//     ? Y extends U
//       ? X
//       : `${X}${Gobble<`${T}${Z}`, U>}`
//     : T;

// type HeadTail<T> = T extends `${infer THead}${infer TTail}` ? [THead, TTail] : never;

// type Head<T> = HeadTail<T> extends [infer X, any] ? X : '';
// type Tail<T> = HeadTail<T> extends [any, infer X] ? X : '';

// type Train<T> = T extends string ? Train<ToCharArray<T>> : T extends [...infer TFront, infer TCaboose] ? [FromCharArray<TFront>, TCaboose] : never;

// type Front<T> = Train<T> extends [infer X, any] ? X : '';
// type Caboose<T> = Train<T> extends [any, infer X] ? X : '';

type ToCharArray<T> = T extends '' ? [] : T extends J<[infer X, infer Y]> ? [X, ...ToCharArray<Y>] : never;
type FromCharArray<T extends unknown[]> = T extends []
  ? ''
  : T extends [string]
  ? T[0]
  : T extends [string, ...infer Y]
  ? J<[T[0], FromCharArray<Y>]>
  : never;

type Reverse<T> = T extends '' ? '' : T extends J<[infer X, infer Y]> ? J<[Reverse<Y>, X]> : never;

type InsertBefore<TInput, TSearch, TInsert> = TInput extends J<[infer X, infer Y, infer Z]>
  ? Y extends TSearch
  ? J<[X, TInsert, Y, InsertBefore<Z, TSearch, TInsert>]>
  : J<[X, InsertBefore<J<[Y, Z]>, TSearch, TInsert>]>
  : TInput;

// type SnakeCase<T extends string> =
//     T extends Lower<T> ? T :

//     T extends `${Lower<infer X>}${Upper<infer Y>}${Cap<infer Z>}` ? SnakeCase<`${X}${Y}${Lowercase<Z>}`> :
//     T extends `${Lower<infer X>}${Cap<infer Y>}` ? `${X}_${SnakeCase<Uncapitalize<Y>>}` :
//     T extends `${Lower<infer X>}${Uncap<infer Y>}` ? `${X}${SnakeCase<Y>}` :
//     T extends Cap<T> ? SnakeCase<Uncapitalize<T>> :
//     1;
// type DashCase<T extends string> = Replace<SnakeCase<T>, '_', '-'>;

export type SnakeCase<T extends string> = Uppercase<InsertBefore<T, UpperCaseChar, '_'>>;
export type DashCase<T extends string> = Lowercase<InsertBefore<T, UpperCaseChar, '-'>>;
type pdpd = SnakeCase<'ProperID4Form'>;
type spdpd = DashCase<'Pro5per1ID4Form'>;


