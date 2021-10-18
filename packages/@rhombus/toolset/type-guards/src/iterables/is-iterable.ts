export function isIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}
