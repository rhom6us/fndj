import { CompositeAudioNode } from "./CompositeAudioNode";

export class FourPoleFilterNode extends CompositeAudioNode {
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
  #type: BiquadFilterNode["type"] = "allpass";
  get type() {
    return this.#type;
  }
  set type(value) {
    this.#type = value;
    this.dispatchEvent(new Event("filter_type_changed"));
  }

  protected buildGraph(sourceNode: AudioNode, destinationNode: AudioNode): void {
    const filter1 = super.context.createBiquadFilter();
    const filter2 = super.context.createBiquadFilter();

    this.#qNode.offset.value = filter1.Q.value;
    this.#qNode.connect(filter1.Q);
    this.#qNode.connect(filter2.Q);
    this.#freqNode.offset.value = filter1.frequency.value;
    this.#freqNode.connect(filter1.frequency);
    this.#freqNode.connect(filter2.frequency);
    this.#gainNode.offset.value = filter1.gain.value;
    this.#gainNode.connect(filter1.gain);
    this.#gainNode.connect(filter2.gain);
    this.#detuneNode.offset.value = filter1.detune.value;
    this.#detuneNode.connect(filter1.detune);
    this.#detuneNode.connect(filter2.detune);

    this.#type = filter1.type;
    this.addEventListener("filter_type_changed", () => {
      filter1.type = this.#type;
      filter2.type = this.#type;
    });

    sourceNode.connect(filter1).connect(filter2).connect(destinationNode);
  }
}
