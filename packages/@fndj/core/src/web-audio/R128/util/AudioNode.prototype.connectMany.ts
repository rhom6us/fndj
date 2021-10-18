
export type ConnectParams<T extends AudioNode = AudioNode> = ConnectParamParams | ConnectNodeParams<T>;
export type ConnectNodeParams<T extends AudioNode = AudioNode> = readonly [destinationNode: T, output?: number, input?: number];
export type ConnectParamParams = readonly [destinationParam: AudioParam, output?: number];
declare global {
    interface AudioNode {
        connect<T extends AudioNode>(destinationNode: T, output?: number, input?: number): T;
        //     connect(destinationParam: AudioParam, output?: number): void;
        connectMany(this: AudioNode, ...args: [...(ConnectParams | AudioNode | AudioParam)[], ConnectParamParams | AudioParam]): void;
        connectMany<T extends AudioNode>(this: AudioNode, ...args: [...(ConnectParams | AudioNode | AudioParam)[], ConnectNodeParams<T> | T]): T;
    }


}
AudioNode.prototype.connectMany ??= function connectMany(this: AudioNode, ...args: any[]): any {
    // eslint-disable-next-line prefer-spread
    return args.map(p => Array.isArray(p) ? p : [p]).map(p => this.connect.apply(this, p as any)).slice(-1)[0];
} as any;
