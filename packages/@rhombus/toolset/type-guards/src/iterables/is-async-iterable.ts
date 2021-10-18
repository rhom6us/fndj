export function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}

