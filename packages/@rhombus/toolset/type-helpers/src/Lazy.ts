// import { Ctor, Func } from '@rhombus/func';
// import * as obj from './obj';

// export function Lazy<T extends Ctor>(ctor: T): T {

//     return class {
//         constructor(...ctorArgs: any[]) {
//             let ref: WeakRef<InstanceType<T>>;

//             return new Proxy({}, mapValues(Reflect, (key, fn) => (...args: any) => {
//                 const target = ref?.deref() ?? (ref = new WeakRef(new ctor(...ctorArgs))).deref();
//                 if (!target) {
//                     throw 'wtf mate?';
//                 }
//                 return fn(target, ...args.slice(1) as GoddamnTuple)
//             }));
//         }
//     } as T;
// }

// type GoddamnTuple = [any, any, any];
// function mapValues<T extends Record<PropertyKey, any>, R>(source: T, map: Func<obj.entries<T>, R>) {
//     return obj.fromEntries(entries(source).map(([key, fn]) => [key, map(key, fn)] as const));
// }

// function entries<T extends object>(p: T): obj.entries<T>[] { // eslint-disable-line @typescript-eslint/ban-types
//     return Reflect.ownKeys(p).filter(p => typeof p === 'string').map(key => [key, p[key as keyof T]]) as any;
// };
