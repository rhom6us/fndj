import { initializeWorklet, PhaseVocodoerNode } from '@fndj/phase-vocoder';
import { FnFormulaNode } from './FnFormula';
import { FnPitchShiftNode } from './FnPitchShift';
import { FnTempoControllerNode } from './FnTempoController';



export class FnAudioBufferSourceNode extends AudioWorkletNode
  implements AudioBufferSourceNode, GainNode {
  private readonly _constantNode: ConstantSourceNode;
  private readonly _formulaNode: FnFormulaNode;
  // private readonly _tempoControllerNode: FnTempoControllerNode;
  private readonly _bufferSourceNode: AudioBufferSourceNode;
  private readonly _pitchShiftNode: FnPitchShiftNode;
  private readonly _gainNode: GainNode;

  private _vocoderNode: PhaseVocodoerNode | undefined;

  get buffer() {
    return this._bufferSourceNode.buffer;
  }
  set buffer(value: AudioBufferSourceNode['buffer']) {
    this._bufferSourceNode.buffer = value;
  }

  // /**
  //  * a-rate
  //  */
  // get semitones(): AudioParam {
  //   return this._constantNode.offset;
  // }

  /**
   * a-rate
   */
  get tempo() {
    return this._constantNode.offset;
    // return this._tempoControllerNode.tempo;
  }
  get baseTempo() {
    return this._formulaNode.arg1;
  }

  /**
   * k-rate
   */
  get detune() {
    return this._bufferSourceNode.detune;
  }

  /**
   * k-rate
   */
  get playbackRate() {
    return this._bufferSourceNode.playbackRate;
  }

  /**
   * a-rate
   */
  get gain() {
    return this._gainNode.gain;
  }

  get loop() {
    return this._bufferSourceNode.loop;
  }
  set loop(value) {
    this._bufferSourceNode.loop = value;
  }
  get loopEnd() {
    return this._bufferSourceNode.loopEnd;
  }
  set loopEnd(value) {
    this._bufferSourceNode.loopEnd = value;
  }
  get loopStart() {
    return this._bufferSourceNode.loopStart;
  }
  set loopStart(value) {
    this._bufferSourceNode.loopStart = value;
  }
  get ondended() {
    return this._bufferSourceNode.onended;
  }
  set onended(value: AudioBufferSourceNode['onended']) {
    this._bufferSourceNode.onended = value;
  }

  ready: Promise<void>;
  constructor(
    context: BaseAudioContext,
    {
      buffer,
      baseTempo,
      gain,
      tempo
    }: {
      buffer: AudioBuffer;
      baseTempo: number;
      tempo?: number;
      gain?: number;
    }
  ) {
    super(context, "fn-audio-buffer-source");
    this._constantNode = new ConstantSourceNode(context, {
      offset: tempo || baseTempo
    });
    this._formulaNode = new FnFormulaNode(context, {
      formula: `-12 * Math.log2(x / arg1)` /*`-12 * Math.log2(x / ${baseTempo})`*/,
      arg1: baseTempo
    });

    // this._tempoControllerNode = new FnTempoControllerNode(context, baseTempo, {
    //   tempo: baseTempo
    // });
    this._bufferSourceNode = new AudioBufferSourceNode(context, { buffer });
    this._pitchShiftNode = new FnPitchShiftNode(context);
    this._gainNode = new GainNode(context, { gain });

    this.ready = initializeWorklet(context).then(ctor => {
      this._vocoderNode = new ctor(context);
    });
    this._constantNode.connect(this._bufferSourceNode.playbackRate);
    this._constantNode
      .connect(this._formulaNode)
      .connect(this._pitchShiftNode.semitones);

    // this._tempoControllerNode.connectPlaybackRate(
    //   this._bufferSourceNode.playbackRate
    // );
    this._bufferSourceNode
      .connect(this._pitchShiftNode)
      .connect(this._gainNode);
    // this._tempoControllerNode.connectTranspose(this._pitchShiftNode.semitones);
  }
  connect(
    destinationNode: AudioNode,
    output?: number,
    input?: number
  ): AudioNode;
  connect(destinationParam: AudioParam, output?: number): void;
  connect(destination: any, output?: number, input?: number) {
    return this._gainNode.connect(destination, output, input);
  }

  start(when?: number, offset?: number, duration?: number): void {
    this._constantNode.start(when);
    this._bufferSourceNode.start(when, offset, duration);
  }
  stop(when?: number): void {
    this._bufferSourceNode.stop(when);
    this._constantNode.stop(when);
  }
}

async function go(context = new AudioContext()) {
  await Promise.all([
    FnFormulaNode.intialize(context),
    FnPitchShiftNode.initialize(context),
    FnTempoControllerNode.initialize(context)
  ]);

  const buffer = context.createBuffer(2, 500, 44100);
  const source = new FnAudioBufferSourceNode(context, {
    buffer,
    baseTempo: 128
  });
  source.connect(context.destination);
  source.start();
  source.tempo.linearRampToValueAtTime(160, context.currentTime + 10);
}
