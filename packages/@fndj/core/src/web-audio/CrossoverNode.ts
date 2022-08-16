import { CompositeAudioNode } from "./CompositeAudioNode";
import { CrossoverOptions, defaults } from "./FourPoleFilterNode";

export class CrossoverNode extends CompositeAudioNode {
  #qNode = this.context.createConstantSource();
  #freqNode = this.context.createConstantSource();
  #gainNode = this.context.createConstantSource();
  #detuneNode = this.context.createConstantSource();
  get Q() {
    return this.#qNode.offset;
  }
  get frequency() {
    return this.#freqNode.offset;
  }
  get gain() {
    return this.#gainNode.offset;
  }
  get detune() {
    return this.#detuneNode.offset;
  }
  override readonly numberOfOutputs: number = 2;

  constructor(context: BaseAudioContext, options?: Partial<CrossoverOptions>) {
    const opts = { ...defaults, ...options };
    super(context, opts as any);


  }
  protected override buildGraph(sourceNode: AudioNode, destinationNodes: AudioNode[]): void {
    const lowpass = new BiquadFilterNode(this.context, { type: "lowpass" });
    const highpass = new BiquadFilterNode(this.context, { type: "highpass" });


    this.#qNode.offset.value = lowpass.Q.value;
    this.#qNode.connect(lowpass.Q);
    this.#qNode.connect(highpass.Q);
    this.#freqNode.offset.value = lowpass.frequency.value;
    this.#freqNode.connect(lowpass.frequency);
    this.#freqNode.connect(highpass.frequency);
    this.#gainNode.offset.value = lowpass.gain.value;
    this.#gainNode.connect(lowpass.gain);
    this.#gainNode.connect(highpass.gain);
    this.#detuneNode.offset.value = lowpass.detune.value;
    this.#detuneNode.connect(lowpass.detune);
    this.#detuneNode.connect(highpass.detune);

    sourceNode.connect(lowpass);
    sourceNode.connect(highpass);
    lowpass.connect(destinationNodes[0]);
    highpass.connect(destinationNodes[1]);


  }
}
