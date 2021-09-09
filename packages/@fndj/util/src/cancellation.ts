/* eslint-disable no-empty */
import { ExecutionContext } from './ExecutionContext';

class AssertionFailed extends Error { }
const debug = {
    assert(condition: boolean, msg?: string): condition is true {
        if (!condition) {
            throw new AssertionFailed(msg);
        }
        return condition;
    }
};
class CancellationToken {
    constructor(source: CancellationTokenSource) { }
}

class CallbackPartition {
    readonly source: CancellationTokenSource;
    callbacks?: CallbackNode;
    freeNodeList?: CallbackNode;
    constructor(source: CancellationTokenSource) {
        this.source = source;
    }

    unregister(id: number, node: CallbackNode) {
        if (node != undefined) { } else
            throw new AssertionFailed("Expected non-null node");

        if (id == 0) {
            // In general, we won't get 0 passed in here.  However, race conditions between threads
            // Unregistering and also zero'ing out the CancellationTokenRegistration could cause 0
            // to be passed in here, in which case there's nothing to do. 0 is never a valid id.
            return false;
        }


        if (node.id != id) {
            // Either:
            // - The callback is currently or has already been invoked, in which case node.Id
            //   will no longer equal the assigned id, as it will have transitioned to 0.
            // - The registration was already disposed of, in which case node.Id will similarly
            //   no longer equal the assigned id, as it will have transitioned to 0 and potentially
            //   then to another (larger) value when reused for a new registration.
            // In either case, there's nothing to unregister.
            return false;
        }

        // The registration must still be in the callbacks list.  Remove it.
        if (this.callbacks == node) {
            if (node.prev == undefined) { } else
                throw new AssertionFailed();
            this.callbacks = node.next;
        } else {
            if (node.prev != undefined) { } else
                throw new AssertionFailed();


            node.prev.next = node.next;
        }

        if (node.next != undefined) {
            node.next.prev = node.prev;
        }

        // Clear out the now unused node and put it on the singly-linked free list.
        // The only field we don't clear out is the associated Partition, as that's fixed
        // throughout the nodes lifetime, regardless of how many times its reused by
        // the same partition (it's never used on a different partition).
        node.id = 0;
        node.callback = undefined;
        node.callbackState = undefined;
        // node.ExecutionContext = null;
        // node.SynchronizationContext = null;
        node.prev = undefined;
        node.next = this.freeNodeList;
        this.freeNodeList = node;

        return true;

    }
}

/**
 * All of the state associated a registered callback, in a node that's part of a linked list of registered callbacks.
 */

class CallbackNode {
    readonly partition: CallbackPartition;
    prev?: CallbackNode;
    next?: CallbackNode;
    id = 0;
    callback?: (arg?: any) => void;
    callbackState?: any;
    executionContext?: ExecutionContext;
    constructor(partition: CallbackPartition) {
        this.partition = partition;
    }
    executeCallback() {
        const context = this.executionContext;
        if (context != undefined) {
            ExecutionContext.runInternal(context, s => {
                if (!(s instanceof CallbackNode)) throw new AssertionFailed(`Expected CallbackNode, got ${s}`);
                const n = s as CallbackNode;

                if (n.callback == undefined) throw new AssertionFailed();
                n.callback(n.callbackState);

            }, this);
        } else {
            if (this.callback == undefined) throw new AssertionFailed();
            this.callback(this.callbackState);
        }
    }
}
const NotCanceledState = 1;
const NotifyingState = 2;
const NotifyingCompleteState = 3;
export class CancellationTokenSource {

    // legal values for _state
    private static readonly NotCanceledState = 1;
    private static readonly NotifyingState = 2;
    private static readonly NotifyingCompleteState = 3;


    static readonly s_canceledSource = Object.assign(new CancellationTokenSource(), { _state: this.NotifyingCompleteState });
    static readonly s_neverCanceledSource = new CancellationTokenSource();
    private static readonly s_timerCallback: (obj: CancellationTokenSource) => void = obj => {
        obj.notifyCancellation(false);
    };

    private _state = CancellationTokenSource.NotCanceledState;
    private _timer?: number;
    private _callbackPartitions?: Array<CallbackPartition | undefined>;

    get isCancellationRequested(): boolean {
        return this._state == CancellationTokenSource.NotifyingState;
    }
    get isCancellationCompleted(): boolean {
        return this._state == CancellationTokenSource.NotifyingCompleteState;
    }

    get token() {
        return new CancellationToken(this);
    }

    constructor(millisecondsDelay?: number) {
        if (millisecondsDelay !== undefined) {
            if (millisecondsDelay === 0) {
                this._state = NotifyingCompleteState;
            } else {
                this._state = NotCanceledState;
                this._timer = setTimeout(CancellationTokenSource.s_timerCallback, millisecondsDelay, this);
            }
        }
    }

    cancel(throwOnFirstException = false): void {
        this.notifyCancellation(throwOnFirstException);
    }
    cancelAfter(millisecondsDelay: number) {
        if (millisecondsDelay < -1) {
            throw new RangeError('millisecondsDelay');
        }
        if (this.isCancellationRequested) {
            return;
        }

        if (this._timer !== undefined) {
            clearTimeout(this._timer);
            delete this._timer;
        }

        this._timer = setTimeout(CancellationTokenSource.s_timerCallback, millisecondsDelay, this);

    }
    private notifyCancellation(throwOnFirstException: boolean) {
        if (!this.isCancellationRequested && compareExchange([this, '_state'], CancellationTokenSource.NotifyingState, CancellationTokenSource.NotCanceledState) == CancellationTokenSource.NotCanceledState) {
            const timer = this._timer;
            if (timer != undefined) {
                delete this._timer;
                clearTimeout(timer);
            }

            //    // Set the event if it's been lazily initialized and hasn't yet been disposed of.  Dispose may
            //     // be running concurrently, in which case either it'll have set m_kernelEvent back to null and
            //     // we won't see it here, or it'll see that we've transitioned to NOTIFYING and will skip disposing it,
            //     // leaving cleanup to finalization.
            //     _kernelEvent?.Set(); // update the MRE value.

            // - late enlisters to the Canceled event will have their callbacks called immediately in the Register() methods.
            // - Callbacks are not called inside a lock.
            // - After transition, no more delegates will be added to the
            // - list of handlers, and hence it can be consumed and cleared at leisure by ExecuteCallbackHandlers.
            this.executeCallbackHandlers(throwOnFirstException);
            console.assert(this.isCancellationCompleted, "Expected cancellation to have finished");
        }
    }

    internalRegister<TState>(callback: (state: TState) => void, state: TState, executionContext: ExecutionContext) {
        console.assert(this != CancellationTokenSource.s_neverCanceledSource, "This source should never be exposed via a CancellationToken.");

        // If not canceled, register the handler; if canceled already, run the callback synchronously.
        // This also ensures that during ExecuteCallbackHandlers() there will be no mutation of the _callbackPartitions.
        if (!this.isCancellationRequested) {
            // In order to enable code to not leak too many handlers, we allow Dispose to be called concurrently
            // with Register.  While this is not a recommended practice, consumers can and do use it this way.
            // We don't make any guarantees about whether the CTS will hold onto the supplied callback if the CTS
            // has already been disposed when the callback is registered, but we try not to while at the same time
            // not paying any non-negligible overhead.  The simple compromise is to check whether we're disposed
            // (not volatile), and if we see we are, to return an empty registration. If there's a race and _disposed
            // is false even though it's been disposed, or if the disposal request comes in after this line, we simply
            // run the minor risk of having _callbackPartitions reinitialized (after it was cleared to null during Dispose).
        }
    }
    private executeCallbackHandlers(throwOnFirstException: boolean) {
        const partitions = this._callbackPartitions;
    }

    static CallbackNode = CallbackNode;
    static CallbackPartition = CallbackPartition;
}
function compareExchange<T>(location: [obj: any, prop: string], value: T, comparand: T): T {
    const [obj, prop] = location;
    const source = obj[prop] as T;
    if (source == comparand) {
        obj[prop] = value;
    }

    return source;
}


interface CancellationTokenRegistration { }
