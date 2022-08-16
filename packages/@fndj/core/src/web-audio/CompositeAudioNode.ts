import { FnPassthroughNode } from './FnPassthrough';

declare abstract class DeclaredCompositeAudioNode extends AudioNode {
  readonly inputGain: AudioParam;
  readonly outputGain: AudioParam;
  constructor(context: BaseAudioContext);
  protected abstract buildGraph(sourceNode: AudioNode, ...destinationNodes: AudioNode[]): void;
}

type CompositeAudioNodeConstructor = typeof DeclaredCompositeAudioNode;

export interface CompositeOptions extends Required<AudioNodeOptions> {
  numberOfOutputs: number;
}
const defaults: AudioWorkletNodeOptions = {
  numberOfInputs: 1,
  numberOfOutputs: 1,
  outputChannelCount: [2]
};
abstract class _CompositeAudioNode extends FnPassthroughNode {
  #dryGain: GainNode;
  #outputNodes: GainNode[];
  #wetGain = this.context.createConstantSource();
  get dry() {
    return this.#dryGain.gain;
  }
  get wet() {
    return this.#wetGain.offset;
  }
  constructor(context: BaseAudioContext) {
    super(context, defaults);
    this.#dryGain = new GainNode(context);
    this.#outputNodes = Array.from({ length: defaults.numberOfOutputs! }).map(() => new GainNode(context));

    this.#outputNodes.forEach(node => this.#wetGain.connect(node.gain));
    this.connect(this.#dryGain);
    this.buildGraph(this.#dryGain, ...this.#outputNodes);
  }
  protected abstract buildGraph(sourceNode: AudioNode, ...destinationNodes: AudioNode[]): void;
  public bypass(bypass = true) {
    if (bypass) {
      super.disconnect(this.#dryGain);
      super.connect(this.#outputNodes[0]);
    } else {
      super.disconnect(this.#outputNodes[0]);
      super.connect(this.#dryGain);
    }
  }
  override connect(dest: AudioParam, output?: number): void;
  override connect<T extends AudioNode>(dest: T, output?: number): T;
  override connect(dest: any, output: number = 0) {
    return this.#outputNodes[output].connect(dest,);
  }

  override disconnect(...args: [...([] | [destinationNode: AudioNode | AudioParam]), ...[output?: number, input?: number]]) {
    if (args.length < 3) {
      const target = args.slice(0, 1).findIndex(p => typeof p === 'object');
      const [output, input] = args.slice(target + 1);
      const newArgs = [
        ...spreadIf(target >= 0, args[0]),
        output ?? 0,
        input
      ] as const as any;
      return this.disconnect(...newArgs);
    }
    const [target, output, input] = args;
    const argsFinal = [...spreadIf(target), output, input] as const;
    return AudioNode.prototype.disconnect.apply(this.#outputNodes[output ?? 0], argsFinal);
  }


}
export const CompositeAudioNode: CompositeAudioNodeConstructor = _CompositeAudioNode as any;

function spreadIf<T>(condition: T): readonly [T] | [];
function spreadIf<T extends readonly any[]>(condition: boolean, ...values: T): T | [];
function spreadIf(condition: any, ...values: any[]): readonly any[] {
  if (condition) {
    if (!values.length) {
      return [condition] as const;
    }
    return values;
  }
  return [];
}