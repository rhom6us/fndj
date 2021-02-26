/**
 * @module cancellation-token-source
 */

import { CancellationTokenSource } from './cancellation-token-source';
import { OperationCancelledError } from './operation-cancelled-error';

/**
 * Used to signal that an operation should be canceled
 */
export class CancellationToken implements PromiseLike<void> {
  #source: CancellationTokenSource;
  #promise: Promise<void>;


  constructor(source: CancellationTokenSource, promise: Promise<void>) {
    this.#source = source;
    this.#promise = promise;
  }

  /**
   * Gets whether cancellation has been requested for this token
   */
  public get isCancellationRequested(): boolean {
    return this.#source.isCancellationRequested;
  }

  /**
   * Throws an [[OperationCanceledError]] if cancellation has been requested for this token
   */
  public throwIfCancellationRequested(): void {
    if (this.isCancellationRequested) {
      throw new OperationCancelledError();
    }
  }

  /**
   * Races this token against the given promise. If cancellation is requested before the
   * promise completes, then an [[OperationCanceledError]] will be thrown.
   *
   * @return The results from the given promise
   */
  public async race<T>(promise: Promise<T>): Promise<T> {
    await Promise.race([this.#promise, promise]);
    return promise;
  }

  /**
   * See [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) in the Promise API
   */
  then<TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): PromiseLike<TResult1 | TResult2> {
    return this.#promise.then(onfulfilled, onrejected);
  }
}
