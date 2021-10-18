
interface ANL {

    connect<T extends AudioNode>(destinationNode: T, input?: number): T;
    connect(destinationParam: AudioParam): void;
}
type MakeArray<T extends ANL, length extends number, acc extends T[] = []> =
    acc['length'] extends length ? acc & ANL :
    MakeArray<T, length, [...acc, T]>;
type ElementType<T extends any[]> =
    T extends ArrayLike<infer R> ? R : never;

declare global {

    interface AudioNode {
        splitChannels<N extends number>(this: AudioNode, count: N): MakeArray<SelectedOutputNode, N>;
        splitChannels<N extends number, T extends AudioNode>(this:AudioNode, count: N, fn: (node: SelectedOutputNode) => T): MakeArray<T, N>;
    }
    interface ChannelSplitterNode {
        forEachOutput<T extends AudioNode | void>(this:ChannelSplitterNode, fn: (node: SelectedOutputNode) => T): T extends AudioNode ? AudioNodeList<T> : void;
    }

}
function isAudioNode(value: any): value is AudioNode {
    return 'connect' in value;
}
AudioNode.prototype.splitChannels ??= <any>function (this:AudioNode, count:number, fn?:(node:SelectedOutputNode)=> ANL):any {
    const id = (p: SelectedOutputNode) => p;
    const splitter = this.context.createChannelSplitter(count)
    return splitter.forEachOutput((fn ?? id) as any);
}
ChannelSplitterNode.prototype.forEachOutput ??= <any>function(this:ChannelSplitterNode, fn: (node: SelectedOutputNode) => ANL|void) {
    const results = Array.from(new Array(this.numberOfOutputs).keys())
        .map(output => fn(new SelectedOutputNode(this, output)))
        .filter(isAudioNode);

    if (results.length) {
        return AudioNodeList.from(results);
    }
}
export class SelectedOutputNode implements ANL {
    constructor(private readonly source: ChannelSplitterNode, private readonly output:number){}
    connect<T extends AudioNode>(destinationNode: T, input?: number): T;
    connect(destinationParam: AudioParam): void;
    connect(dest: any, input?: number): any{
        return this.source.connect(dest, this.output, input);
    }
}
export class AudioNodeList<T extends ANL = AudioNode> extends Array<T>{

    connect<T extends AudioNode>(destinationNode: T, input?: number): T;
    connect(destinationParam: AudioParam): void;
    connect(dest: any, input?: number): any{
        this.forEach(p => p.connect(dest));
        return dest;
    }
}
