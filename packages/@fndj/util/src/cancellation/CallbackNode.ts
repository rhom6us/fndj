import { CancellationToken } from './CancellationToken';
import { Registrations } from './Registrations';


export class CallbackNode<TState = any> {
    public readonly registrations: Registrations;
    public prev?: CallbackNode;
    public next?: CallbackNode;
    public id = 0;
    public callback?: (state: TState, cancellationToken?: CancellationToken) => void;
    public callbackState?: TState;
    public constructor(registrations: Registrations) {
        this.registrations = registrations;
    }
    public executeCallback(): void {
        this.callback?.call(undefined, this.callbackState!, new CancellationToken(this.registrations.source));
    }

}
