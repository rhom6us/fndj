import { isFunction } from 'lodash';

type Executor<T> = (
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
  cancel: (reason?: any) => void
) => void;
function $defer<T>(cls:any = FnPromise) {
	const result:any = {};
	result.promise = new cls((resolve:any, reject:any, cancel:any) => {
	  result.resolve = resolve;
    result.reject = reject;
    if (isFunction(cancel)) {
      result.cancel = cancel;
    }
	});
  	return result;
}


export type State =
	| 'pending'
	| 'resolved'
	| 'rejected'
	| 'cancelled'


 export class FnPromise<T> implements Promise<T>  {
  #promise: Promise<T>;
  #state:State = 'pending';
  #cancel = $defer(Promise);
  constructor(executor: Executor<T>){
  	this.#promise = new Promise((resolve, reject) => {
	  	const args = [
	  		(value?:T | PromiseLike<T>) => this.#state !== 'cancelled' && resolve(value),
	  		(error?:any) => this.#state !== 'cancelled' && reject(error),
	  		(reason?:any) => this.#state !== 'cancelled' && this.#cancel.resolve(reason),
  		] as const;
  		executor(...args);
  	});
  	this.#promise.then(result => {
  		this.#state = 'resolved';
  	}, error => {
  		this.#state = 'rejected';
  	});
  	this.#cancel.promise.then(() => {
  		this.#state = 'cancelled';
  	});
  }
  get state(){
    return this.#state;
  }
  get isPending(){
  	return this.#state === 'pending';
  }
  get isResolved(){
  	return this.#state === 'resolved';
  }
  get isRejected(){
  	return this.#state === 'rejected';
  }
  get isCancelled(){
  	return this.#state === 'cancelled';
  }
  then<TResult1 = T, TResult2 = never, TResult3 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined, oncancelled?: ((reason: any) => TResult3 | PromiseLike<TResult3>) | null | undefined): Promise<TResult1 | TResult2 | TResult3> {
    return Promise.race([this.#cancel.promise.then(oncancelled), this.#promise.then(onfulfilled, onrejected)]);
  }
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult> {
    return this.#promise.catch(onrejected);
  }
   get [Symbol.toStringTag]() {
     return this.#promise[Symbol.toStringTag];
  }
  finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    return Promise.race([this.#promise, this.#cancel.promise]).finally(onfinally);
  }
  onCancel<TResult = never>(oncancelled?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult> {
    return this.#cancel.promise.then(oncancelled);
  }
}
