import { Func, Sub } from "@rhombus-toolkit/func";


/**
 * 
 * @example
 * 
 * class extends AudioWorkletProcessor {
 *   static get parameterDescriptors(): AudioParamDescriptor[] {
 *     return [];
 *   }
 * 
 *   process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
 * 
 *     flatMap(zip(inputs, outputs), spread(zip));
 * 
 *     // -OR-
 * 
 *     Iter.from(inputs).zip(outputs).flatMap(spread(zip))
 * 
 *     
 * 
 *     // forEach(zip(inputs, outputs), spread((input, output) => 
 *     //   forEach(zip(input, output), spread((chnlIn, chnlOut]) => 
 *     //     chnlOut.set(chnlIn);
 *     //   );
 *     // ));
 * 
 * 
 *     // for (const [inputChannels, outputChannels] of zip(inputs, outputs)) {
 *     //   for (const [inputSamples, outputSamples] of zip(inputChannels, outputChannels)) {
 *     //     outputSamples.set(inputSamples);
 *     //   }
 *     // }
 * 
 * 
 *     //for (let ioIndex = 0; ioIndex < inputs.length; ioIndex++) {
 *     //  for (let channelIndex = 0; channelIndex < inputs[ioIndex].length; channelIndex++) {
 *     //    outputs[ioIndex][channelIndex].set(inputs[ioIndex][channelIndex]);
 *     //  }
 *     //}
 *     return true;
 *   }
 * }
 * 
 * 
 */


type Cast<T, R> = T extends R ? T : R;
type Inc<N extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][N];

type ArrayTypes<T extends any[]> = _ArrayTypes<T, never>;
type _ArrayTypes<T extends any[], Acc> = T extends [infer R, ...infer Rest]
  ? _ArrayTypes<Rest, Acc | R>
  : T extends []
  ? Acc
  : [ERROR: "ArrayTypes", args: [T: T, Acc: Acc]];

type ExtractTypesToObj<T extends Iterable<any>[]> = _ExtractTypesToObj<T, []>;
type _ExtractTypesToObj<T extends Iterable<any>[], Acc extends [number, any][]> = T extends [Iterable<infer R>, ...infer Rest]
  ? _ExtractTypesToObj<Cast<Rest, Iterable<any>[]>, [...Acc, [Inc<Acc["length"]>, R]]>
  : T extends []
  ? {
      [K in ArrayTypes<Acc> as `item${K[0]}`]: K[1];
    }
  : [ERROR: "ExtractTypesToObj", args: [T: T, Acc: Acc]];

type ExtractTypesToTuple<T extends Iterable<any>[]> = _ExtractTypesToTuple<T, []>;
type _ExtractTypesToTuple<T extends Iterable<any>[], Acc extends any[]> = T extends [Iterable<infer R>, ...infer Rest]
  ? _ExtractTypesToTuple<Cast<Rest, Iterable<any>[]>, [...Acc, R]>
  : T extends []
  ? Acc
  : [ERROR: "ExtractTypesToTuple", args: [T: T, Acc: Acc]];

function* filter<T>(source: Iterable<T>, fn: Func<[T], boolean>) {
  for (const item of source) {
    if (fn(item)) {
      yield item;
    }
  }
}
function* flatMap<T, R = T>(source: Iterable<T>, fn?: Func<[T], Iterable<R>>): Iterable<R> {
  for (const item of source) {
    yield* fn?.(item) ?? (item as unknown as Iterable<R>);
  }
}
function flatten<T>(source: Iterable<Iterable<T>>) {
  return flatMap(source, (p) => p);
}
function forEach<T>(source: Iterable<T>, fn: Sub<[T]>) {
  for (const item of source) {
    fn(item);
  }
}
function* map<T, R>(source: Iterable<T>, fn: Func<[T], R>): Iterable<R> {
  for (const item of source) {
    yield fn(item);
  }
}
function* zip<T extends Iterable<any>[]>(...args: T): Iterable<ExtractTypesToTuple<T>> {
  const iters = args.map((p) => p[Symbol.iterator]());
  while (true) {
    const currents = iters.map((p) => p.next());
    if (currents.some((p) => p.done)) {
      break;
    }
    yield currents.map((p) => p.value) as ExtractTypesToTuple<T>;
  }
}

function zipObj<T extends Iterable<any>[]>(...args: T) {
  return map(zip(...args), (items) => items.reduce((result, item, i) => ({ ...result, [`item${i + 1}`]: item }), {} as ExtractTypesToObj<T>));
}

function spread<Args extends any[], R>(fn: Func<Args, R>): Func<[Args], R> {
  return (args: Args) => fn(...args);
}

class Iter<T> implements Iterable<checkArg<T>> {
  static from<T>(source: Iterable<T>) {
    return new Iter(source);
  }
  #source: Iterable<checkArg<T>>;
  constructor(source: Iterable<T>) {
    this.#source = map(source, checkArg);
  }

  [Symbol.iterator](): Iterator<checkArg<T>> {
    return this.#source[Symbol.iterator]();
  }
  filter(fn: Func<[checkArg<T>], boolean>) {
    return new Iter[Symbol.species](filter(this, fn));
  }
  flatMap<R = T>(fn?: Func<[checkArg<T>], Iterable<R>>) {
    return new Iter[Symbol.species](flatMap(this, fn));
  }
  forEach(fn: Sub<[checkArg<T>]>) {
    forEach(this, fn);
  }
  map<R>(fn: Func<[checkArg<T>], R>) {
    return new Iter[Symbol.species](map(this, fn));
  }
  zip<R extends Iterable<any>[]>(...args: R) {
    return new Iter[Symbol.species](zip(this, ...args.map((p) => map(p, checkArg))));
  }
  zipObj<R extends Iterable<any>[]>(...args: R) {
    return new Iter[Symbol.species](zipObj(this, ...args.map((p) => map(p, checkArg))));
  }
  static [Symbol.species] = Iter;
}
let ℓ,k,Ω,℮,Ⅎ,φ,Ξ,Δ,Θ,Τ,Λ,ψ,Ϫ,ϫ = 3;

type checkArg<T> = 
T extends Iter<any> ? T : 
  T extends any[] ? T :
  T extends Iterable<infer R> ? Iter<R> :
  T;

function checkArg<T>(value: T): checkArg<T>;
function checkArg(value: any) {
  if (value instanceof Iter) {
    return value;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (Symbol.iterator in value) {
    return new Iter(value);
  }
  return value;
}
var aa = Array[Symbol.species];