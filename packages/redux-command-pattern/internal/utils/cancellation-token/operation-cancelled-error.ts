/**
 * @module cancellation-token-source
 */

/**
 * The exception that is thrown upon signalling cancellation from a [[CancellationTokenSource]]
 */
export class OperationCancelledError extends Error {
  constructor() {
    super("The operation was canceled");
  }
}
