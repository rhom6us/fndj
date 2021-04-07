import { defer } from './defer';


enum State {
    'pending',
    'resolved',
    'rejected',
    'cancelled'
}


export interface CancellablePromise<T> extends Promise<T> {
    cancel(): void;
}

export class FnPromise<T> implements CancellablePromise<T> {

    [Symbol.toStringTag] = 'FnPromise';
    #promise: Promise<T>;
    #state = State.pending;
    #cancel = defer();
    constructor(executor: (resolve: (value: T) => void, reject: (reason?: string) => void, isCancelled: () => boolean) => void) {
        this.#promise = new Promise((resolve, reject) => {
            executor((value) => {
                if (this.#state !== State.pending)
                    return;
                this.#state = State.resolved;
                resolve(value);
                this.#cancel.reject('resolved');
            },
                (error) => {
                    if (this.#state !== State.pending)
                        return;
                    this.#state = State.rejected;
                    reject(error);
                    this.#cancel.reject('rejected');
                },
                () => this.isCancelled
            );
        });
    }

    get state() {
        return State[this.#state];
    }
    get isPending() {
        return this.#state === State.pending;
    }
    get isResolved() {
        return this.#state === State.resolved;
    }
    get isRejected() {
        return this.#state === State.rejected;
    }
    get isCancelled() {
        return this.#state === State.cancelled;
    }

    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>), onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2> {
        return this.#promise.then(onfulfilled, onrejected);
    }
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>)): Promise<T | TResult> {
        return this.#promise.catch(onrejected);
    }

    finally(onfinally?: (() => void)): Promise<T> {
        return this.#promise.finally(onfinally);
    }

    nevermind<TResult = never>(onCancelled?: () => TResult | PromiseLike<TResult>): Promise<T | TResult> {
        return this.#cancel.promise.then(onCancelled);
    }

    cancel() {
        if (this.#state !== State.pending) {
            return;
        }
        this.#state = State.cancelled;
        this.#cancel.resolve();
    }
}
