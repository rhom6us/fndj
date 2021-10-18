// import './navigator.locks';

// export class ManualResetEvent implements PromiseLike<void> {
//     // #spinCount: number;
//     #state = false;
//     //#wait: Promise<void> = this.waiter();//new Promise(resolve => this.#waitHandle.promise.then(()=>resolve()));// = navigator.locks.request("wait_handle", lock => this.#waitHandle.promise);

//     #waitHandle: Defer<void> = defer();
//     get isSet(): boolean {
//         return this.#state;
//     }

//     // get spinCount() {
//     //     return this.#spinCount;
//     // }

//     // private static id = 0;
//     constructor(initialState = false/*, spinCount = 10*/) {
//         // this.#spinCount = spinCount;
//         if (initialState) {
//             this.set();
//         }


//     }

//     then<TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2> {
//         return this.#waitHandle.promise.then(onfulfilled, onrejected);
//     }
//     // catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<void | TResult> {
//     //     return this.#waitHandle.promise.catch(onrejected);
//     // }
//     // finally(onfinally?: (() => void) | null): Promise<void> {
//     //     return this.#waitHandle.promise.finally(onfinally);
//     // }
//     // [Symbol.toStringTag]: "ManualResetEvent";
//     set() {
//         this.#state = true;
//         this.#waitHandle.resolve();
//     }

//     reset() {
//         this.#state = false;
//         this.#waitHandle = defer();

//         // this.#wait = navigator.locks.request("wait_handle", lock =>
//         //     this.#waitHandle.promise.then(() => {
//         //         this.#state = true;
//         //     })
//         // );
//     }

// }
// function getWaitHandle(name: string) {
//     const def = defer();
//     const lockPromise = navigator.locks.request(name, lock => def.promise);
//     return {
//         async wait() {
//             await lockPromise;
//         },
//         signal() {
//             def.resolve();
//         }
//     };

// }
