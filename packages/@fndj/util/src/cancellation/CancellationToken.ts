import { CancellationTokenRegistration } from './CancellationTokenRegistration';
import { CancellationTokenSource } from "./CancellationTokenSource";

export class CancellationToken {
    private readonly _source?: CancellationTokenSource;
    public static get None(): CancellationToken {
        return new CancellationToken();
    }
    public get isCancellationRequested(): boolean {
        return this._source !== undefined && this._source.isCancellationRequested;
    }

    public get canBeCancelled(): boolean {
        return this._source !== undefined;
    }

    constructor(cancelled: boolean);
    constructor(source?: CancellationTokenSource);
    constructor(arg: boolean | CancellationTokenSource | undefined) {
        if (arg === true) {
            this._source = CancellationTokenSource.s_canceledSource;
        }
        if (arg instanceof CancellationTokenSource) {
            this._source = arg;
        }
    }
    public register(callback: (cancellationToken: CancellationToken) => void): CancellationTokenRegistration;
    public register<TState>(callback: (state: TState, cancellationToken: CancellationToken) => void, state: TState): CancellationTokenRegistration;
    public register(callback: (...args: any) => void, state?: any): CancellationTokenRegistration {
        if (!callback) {
            throw new Error('callback is not defined');
        }
        const source = this._source;
        return source ? source.register(callback, state) : CancellationTokenRegistration._default;
    }

    public equals(other: CancellationToken) {
        return this._source === other._source;
    }

    public throwIfCancellationRequested() {
        if (this.isCancellationRequested) {
            throw new Error('Operation cancelled');
        }
    }

}
