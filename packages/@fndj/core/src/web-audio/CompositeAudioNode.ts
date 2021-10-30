declare abstract class DeclaredCompositeAudioNode extends AudioNode {
  readonly inputGain: AudioParam;
  readonly outputGain: AudioParam;
  constructor(context: BaseAudioContext);
  protected abstract buildGraph(sourceNode: AudioNode, destinationNode: AudioNode): void;
}

type CompositeAudioNodeConstructor = typeof DeclaredCompositeAudioNode;

abstract class _CompositeAudioNode extends GainNode {
  #inputNode: GainNode;
  #outputNode: GainNode;

  get inputGain() {
    return super.gain;
  }
  get outputGain() {
    return this.#outputNode.gain;
  }
  constructor(context: BaseAudioContext) {
    super(context);
    this.#inputNode = new GainNode(context);
    this.#outputNode = new GainNode(context);
    this.connect(this.#inputNode);
    this.buildGraph(this.#inputNode, this.#outputNode);
  }
  protected abstract buildGraph(sourceNode: AudioNode, destinationNode: AudioNode): void;
  public bypass(bypass = true) {
    if (bypass) {
      super.disconnect(this.#inputNode);
      super.connect(this.#outputNode);
    } else {
      super.disconnect(this.#outputNode);
      super.connect(this.#inputNode);
    }
  }
  override connect(...args: [any]) {
    return this.#outputNode.connect(...args);
  }

  override disconnect(...args: []) {
    return this.#outputNode.disconnect(...args);
  }
}
export const CompositeAudioNode: CompositeAudioNodeConstructor = _CompositeAudioNode as any;
