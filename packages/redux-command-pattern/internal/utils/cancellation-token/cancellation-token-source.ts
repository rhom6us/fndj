/**
 * @module cancellation-token-source
 */

import { noop } from 'lodash';
import { CancellationToken } from './cancellation-token';
import { OperationCancelledError } from './operation-cancelled-error';

/**
 * Creates and signals to a [[CancellationToken]] that it should be canceled
 */
export  class CancellationTokenSource {
  #isCancellationRequested: boolean;
  #token: CancellationToken;
  #promise: Promise<void>;
  #reject!: (reason: OperationCancelledError) => void;

  /**
   * Gets whether cancellation has been requested
   */
  public get isCancellationRequested(): boolean {
    return this.#isCancellationRequested;
  }

  /**
   * Gets the [[CancellationToken]] bound to this [[CancellationTokenSource]]
   */
  public get token(): CancellationToken {
    return this.#token;
  }

  constructor() {
    this.#isCancellationRequested = false;
    this.#promise = new Promise<void>((_res, reject) => {
      this.#reject = reject;
    });
    this.#promise.catch(noop); // Don't cause an unhandledrejection
    this.#token = new CancellationToken(this, this.#promise);
  }

  /**
   * Signal a request for cancellation
   */
  public cancel(): void {
    this.#isCancellationRequested = true;
    this.#reject(new OperationCancelledError());
  }

  /**
   * For use as a disposable
   * Cleans up resources created by this [[CancellationTokenSource]] and cancels its [[CancellationToken]]
   */
  public dispose(): void {
    this.cancel();
  }
}
