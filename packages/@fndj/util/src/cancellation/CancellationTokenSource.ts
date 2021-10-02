import { AggregateError } from './AggregateError';
import { CallbackNode } from './CallbackNode';
import { CancellationToken } from './CancellationToken';
import { CancellationTokenRegistration } from './CancellationTokenRegistration';
import { Registrations } from './Registrations';
function compareExchange<T>(location: [obj: any, prop: string], value: T, comparand: T): T {
    const [obj, prop] = location;
    const source = obj[prop] as T;
    if (source == comparand) {
        obj[prop] = value;
    }

    return source;
}
enum CancellationTokenState {
    notCancelled = 1,
    notifying = 2,
    notifyingComplete = 3,
}

export class CancellationTokenSource {



    static readonly s_canceledSource = Object.assign(new CancellationTokenSource(), { _state: CancellationTokenState.notifyingComplete } as Partial<CancellationTokenSource>);

    static readonly s_neverCanceledSource = new CancellationTokenSource();
    private static readonly s_timerCallback: (obj: CancellationTokenSource) => void = obj => {
        obj.notifyCancellation(false);
    };

    private _state = CancellationTokenState.notCancelled;
    private _timer?: number;
    private _registrations?: Registrations;

    get isCancellationRequested(): boolean {
        return this._state == CancellationTokenState.notifying;
    }
    get isCancellationCompleted(): boolean {
        return this._state == CancellationTokenState.notifyingComplete;
    }

    get token(): CancellationToken {
        return new CancellationToken(this);
    }

    constructor(millisecondsDelay?: number) {
        if (millisecondsDelay !== undefined) {
            if (millisecondsDelay === 0) {
                this._state = CancellationTokenState.notifyingComplete;
            } else {
                this._state = CancellationTokenState.notCancelled;
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
    public tryReset(): boolean {
        throw 'not supported';
    }

    register<TState>(callback: (state: TState, cancellationToken?: CancellationToken) => void, stateForCallback?: TState): CancellationTokenRegistration {
        if (!this.isCancellationRequested) {
            let registrations = this._registrations;
            if (registrations === undefined) {
                registrations = new Registrations(this);
                registrations = compareExchange([this, '_registrations'], registrations, undefined) ?? registrations;
            }

            let node: CallbackNode | undefined;
            let id = 0;
            if (registrations.freeNodeList) {
                node = registrations.freeNodeList;
                if (node) {
                    registrations.freeNodeList = node.next;
                    node.id = id = registrations.nextAvailableId++;
                    node.callback = callback;
                    node.callbackState = stateForCallback;
                    node.next = registrations.callbacks;
                    registrations.callbacks = node;
                    if (node.next) {
                        node.next.prev = node;
                    }
                }
            }
            if (!node) {
                node = new CallbackNode(registrations);
                node.callback = callback;
                node.callbackState = stateForCallback;
                node.id = id = registrations.nextAvailableId++;
                node.next = registrations.callbacks;
                if (node.next) {
                    node.next.prev = node;
                }
                registrations.callbacks = node;
            }
            if (!this.isCancellationRequested || !registrations.unregister(id, node)) {
                return new CancellationTokenRegistration(id, node);
            }
        }
        callback(stateForCallback!, new CancellationToken(this));
        return CancellationTokenRegistration._default;
    }
    notifyCancellation(throwOnFirstException: boolean) {
        if (!this.isCancellationRequested && compareExchange([this, '_state'], CancellationTokenState.notifying, CancellationTokenState.notCancelled) == CancellationTokenState.notCancelled) {
            const timer = this._timer;
            if (timer != undefined) {
                delete this._timer;
                clearTimeout(timer);
            }

            //    // Set the event if it's been lazily initialized and hasn't yet been disposed of.  Dispose may
            //     // be running concurrently, in which case either it'll have set m_kernelEvent back to undefined and
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


    private executeCallbackHandlers(throwOnFirstException: boolean) {
        const registrations = this._registrations;
        if (!registrations) {
            this._state = CancellationTokenState.notifyingComplete;
            return;
        }
        let errorList: unknown[] | undefined;
        try {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const node = registrations.callbacks;
                if (!node) {
                    break;
                }
                if (node.next) {
                    delete node.next.prev;
                }
                registrations.callbacks = node.next;
                registrations.executingCallbackId = node.id;
                node.id = 0;
                try {
                    node.executeCallback();
                } catch (er) {
                    (errorList ??= []).push(er);
                }

            }
        } finally {
            this._state = CancellationTokenState.notifyingComplete;
        }
        if (errorList) {
            throw new AggregateError(errorList);
        }
    }

    public static createLinkedTokenSource(...tokens: CancellationToken[]): CancellationTokenSource {
        if (tokens.length >= 1) {
            const token1 = tokens[0];

            if (tokens.length >= 2) {
                if (tokens.length >= 3) {
                    return new LinkedNCancellationTokenSource(tokens);
                }
                const token2 = tokens[1];
                return !token1.canBeCancelled ? this.createLinkedTokenSource(token2) :
                    token2.canBeCancelled ? new Linked2CancellationTokenSource(token1, token2) :
                        new Linked1CancellationTokenSource(token1);
            }
            return token1.canBeCancelled ? new Linked1CancellationTokenSource(token1) : new CancellationTokenSource();
        }
        throw new Error(`Didn't provide any tokens!`);

    }

}

class Linked1CancellationTokenSource extends CancellationTokenSource {
    private readonly _reg1: CancellationTokenRegistration;
    constructor(token1: CancellationToken) {
        super();
        this._reg1 = token1.register(LinkedNCancellationTokenSource.s_linkedTokenCancelDelegate, this);
    }
}
class Linked2CancellationTokenSource extends CancellationTokenSource {
    private readonly _reg1: CancellationTokenRegistration;
    private readonly _reg2: CancellationTokenRegistration;
    constructor(token1: CancellationToken, token2: CancellationToken) {
        super();
        this._reg1 = token1.register(LinkedNCancellationTokenSource.s_linkedTokenCancelDelegate, this);
        this._reg2 = token2.register(LinkedNCancellationTokenSource.s_linkedTokenCancelDelegate, this);
    }
}
class LinkedNCancellationTokenSource extends CancellationTokenSource {
    static readonly s_linkedTokenCancelDelegate = (s: CancellationTokenSource) => {
        s.notifyCancellation(false);
    };
    private _linkingRegistrations?: CancellationTokenRegistration[];
    constructor(tokens: CancellationToken[]) {
        super();
        this._linkingRegistrations = new Array(tokens.length);
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].canBeCancelled) {
                this._linkingRegistrations[i] = tokens[i].register(LinkedNCancellationTokenSource.s_linkedTokenCancelDelegate, this);
            }
            // Empty slots in the array will be default(CancellationTokenRegistration), which are nops to Dispose.
            // Based on usage patterns, such occurrences should also be rare, such that it's not worth resizing
            // the array and incurring the related costs.
        }
    }
}
