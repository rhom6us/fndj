

export type Error<Kind extends ErrorKind, Source extends PropertyKey, Params extends readonly any[], Message extends string | never = never> = {
  type: Kind;
  source: Source;
  params: Params;
  message?: `Ruh Roh! ${Message}\n\nLoser.`;

};
type ErrorKind = 'INVALID_TYPE_ARG' | 'NEVER_CONDITION';
export type InvalidTypeArg<Source extends PropertyKey, Params extends readonly any[] | never = never, Message extends string | never = never> = Error<'INVALID_TYPE_ARG', Source, Params, Message>;
export type AssertNever<Source extends PropertyKey, Params extends readonly any[] | never = never, Message extends string | never = never> = Error<'NEVER_CONDITION', Source, Params, Message>;

