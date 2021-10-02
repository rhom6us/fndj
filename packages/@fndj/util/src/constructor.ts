import { Ctor } from './func';

export type Constructor<T extends Ctor<any[], any> = Ctor<any[], any>> = Ctor<ConstructorParameters<T>, InstanceType<T>>;// new (...args: ConstructorParameters<T>) => InstanceType<T>;
export type ConstructorFor<TInstance> = Ctor<any[], TInstance>;//new (...args: any) => TInstance;
