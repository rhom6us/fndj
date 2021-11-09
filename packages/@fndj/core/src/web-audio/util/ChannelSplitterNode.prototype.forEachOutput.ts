export interface AudioNodeLike {
  connect<T extends AudioNode>(destinationNode: T, input?: number): T;
  connect(destinationParam: AudioParam): void;
}
type MakeArray<T, length extends number, acc extends T[] = []> = acc["length"] extends length
  ? acc
  : MakeArray<T, length, [...acc, T]>;

export class SelectedOutputNode implements AudioNodeLike {
  constructor(private readonly source: ChannelSplitterNode, private readonly output: number) {}
  connect<T extends AudioNode>(destinationNode: T, input?: number): T;
  connect(destinationParam: AudioParam): void;
  connect(dest: any, input?: number): any {
    return this.source.connect(dest, this.output, input);
  }
}
export class AudioNodeList<T extends AudioNodeLike = AudioNode> extends Array<T> {
  static override from<T extends AudioNodeLike>(iterable: Iterable<T> | ArrayLike<T>): AudioNodeList<T> {
    return Array.from(iterable) as any;
  }
  connect<T extends AudioNode>(destinationNode: T, input?: number): T;
  connect(destinationParam: AudioParam): void;
  connect(dest: any, input?: number): any {
    this.forEach((p) => p.connect(dest, input));
    return dest;
    }
    // override map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): AudioNodeList<U>{
    //     return super.map(callbackfn, thisArg) as any;
    // }
}

declare global {

  interface AudioNode {
    splitChannels<N extends number>(this: this, count: N): MakeArray<this, N> & AudioNodeList<this>;
    splitChannels<N extends number, T extends AudioNode>(this: this, count: N, fn: (node: SelectedOutputNode) => T): MakeArray<T, N> & AudioNodeList<T>;
  }
  interface ChannelSplitterNode {
    forEachOutput<T extends AudioNode | void>(
      this: ChannelSplitterNode,
      fn: (node: SelectedOutputNode) => T
    ): T extends AudioNode ? AudioNodeList<T> : void;
  }
}
function isAudioNode(value: any): value is AudioNode {
  return "connect" in value;
}
AudioNode.prototype.splitChannels ??= <any>function (this: AudioNode, count: number, fn?: (node: SelectedOutputNode) => AudioNodeLike): any {
  const id = (p: SelectedOutputNode) => p;
  const splitter = this.context.createChannelSplitter(count);
  return splitter.forEachOutput((fn ?? id) as any);
};
ChannelSplitterNode.prototype.forEachOutput ??= <any>function (this: ChannelSplitterNode, fn: (node: SelectedOutputNode) => AudioNodeLike | void) {
  const results = Array.from(new Array(this.numberOfOutputs).keys())
    .map((output) => fn(new SelectedOutputNode(this, output)))
    .filter(isAudioNode);

  if (results.length) {
    return AudioNodeList.from(results);
  }
};
