import { CancellationToken } from './CancellationToken';
import { CallbackNode } from "./CallbackNode";

export class CancellationTokenRegistration {
    public static _default = new CancellationTokenRegistration(0, undefined as any);
    private readonly _id: number;
    private readonly _node?: CallbackNode;
    constructor(readonly id: number, readonly node: CallbackNode) {
        this._id = id;
        this._node = node;
    }

    public get token(): CancellationToken {
        return this._node ?
            new CancellationToken(this._node.registrations.source) :
            CancellationToken.None;
    }

    public unregister(): boolean {
        return this._node?.registrations.unregister(this._id, this._node) ?? false;
    }
}
