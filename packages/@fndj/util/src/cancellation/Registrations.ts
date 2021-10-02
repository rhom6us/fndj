import { setImmediateAsync } from '..';
import { CancellationTokenSource } from './CancellationTokenSource';
import { CallbackNode } from "./CallbackNode";


export class Registrations {
    public readonly source: CancellationTokenSource;
    public callbacks?: CallbackNode = undefined;
    public freeNodeList?: CallbackNode = undefined;
    public nextAvailableId = 1;
    public executingCallbackId = 0;
    public constructor(source: CancellationTokenSource) {
        this.source = source;
    }

    private recycle(node: CallbackNode) {
        node.id = 0;
        node.callback = undefined;
        node.callbackState = undefined;
        node.prev = undefined;
        node.next = this.freeNodeList;
        this.freeNodeList = node;
    }

    public unregister(id: number, node: CallbackNode): boolean {
        if (id === 0) {
            return false;
        }
        if (node.id !== id) {
            return false;
        }
        if (this.callbacks === node) {
            this.callbacks = node.next;
        } else {
            node.prev!.next = node.next;
        }
        this.recycle(node);

        return true;
    }

    public unregisterAll(): void {
        let node = this.callbacks;
        this.callbacks = undefined;

        while (node !== undefined) {
            const next = node.next;
            this.recycle(node);
            node = next;
        }
    }


    public async waitForCallbackToCompleteAsync(id: number): Promise<void> {
        // If the currently executing callback is not the target one, then the target one has already
        // completed and we can simply return.  This should be the most common case, as the caller
        // calls if we're currently canceling but doesn't know what callback is running, if any.
        if (this.executingCallbackId !== id) {
            return;
        }

        // The specified callback is actually running: queue an async loop that'll poll for the currently executing
        // callback to complete. While such polling isn't ideal, we expect this to be a rare case (disposing while
        // the associated callback is running), and brief when it happens (so the polling will be minimal), and making
        // this work with a callback mechanism will add additional cost to other more common cases.
        while (this.executingCallbackId === id) {
            await setImmediateAsync();
        }
    }



}
