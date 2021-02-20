/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhaseVocoderNode } from '@fndj/phase-vocoder';
import { FnFormulaNode } from './FnFormula';
import { FnPitchShiftNode } from './FnPitchShift';
import { FnTempoControllerNode } from './FnTempoController';
import { TimeStretchingNode } from './sp';


export interface Options extends AudioBufferSourceOptions, GainOptions  {
  baseTempo?: number;
  tempo?: number;
}

export class FnAudioBufferSourceNode implements AudioBufferSourceNode, GainNode {
  private readonly _constantNode: ConstantSourceNode;
  private readonly _formulaNode: FnFormulaNode;
  // private readonly _tempoControllerNode: FnTempoControllerNode;
  private readonly _bufferSourceNode: AudioBufferSourceNode;
  // private readonly _pitchShiftNode: FnPitchShiftNode;
  private readonly _gainNode: GainNode;
  private readonly _vocoderNode: PhaseVocoderNode;
  private readonly _stretchNode: TimeStretchingNode;

  private get _audioNodes(): AudioNode[] {
    return [this._bufferSourceNode, this._formulaNode, this._constantNode,this._gainNode, this._vocoderNode];
  }


  start(when?: number, offset?: number, duration?: number): void {

    // this._constantNode.start(when);
    // this._bufferSourceNode.start(when, offset, duration);
    // //this._stretchNode.
  }
  //#region TimeStretchingNode decorator
  set rate(value: number) {
    this._stretchNode.rate = value;
  }
  set pitchShift(value: number) {
    this._stretchNode.pitchShift = value;
  }
  //#endregion

  // get buffer() {
  //   return this._bufferSourceNode.buffer;
  // }
  set buffer(value: AudioBuffer) {
    this._stretchNode.buffer = value;
    this._bufferSourceNode.buffer = value;
  }
//#region AudioBufferSource decorator
  get detune() {
    return this._bufferSourceNode.detune;
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
  get playbackRate() {
    return this._bufferSourceNode.playbackRate;
  }
  addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: any, listener: any, options?: any) {
    return this._bufferSourceNode.addEventListener(type, listener, options);
  }
  removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: any, listener: any, options?: any) {
    return this._bufferSourceNode.removeEventListener(type, listener, options);
  }
  //#endregion

//#region AudioScheduledSourceNode decorator
  get ondended() {
    return this._bufferSourceNode.onended;
  }
  set onended(value: AudioBufferSourceNode['onended']) {
    this._bufferSourceNode.onended = value;
  }

  //#endregion

//#region GainNode decorator
  get gain() {
    return this._gainNode.gain;
  }

//#endregion

//#region AudioContext decorator
  get channelCount(): number{
    return this._bufferSourceNode.channelCount;
  }
  set channelCount(value) {
    this._audioNodes.forEach(p => {
      p.channelCount = value;
    });
  }
  get channelCountMode(): ChannelCountMode {
    return this._bufferSourceNode.channelCountMode;
  }
  set channelCountMode(value) {
    this._audioNodes.forEach(p => {
      p.channelCountMode = value;
    });
  }
  get channelInterpretation(): ChannelInterpretation {
    return this._bufferSourceNode.channelInterpretation;
  }
  set channelInterpretation(value) {
    this._audioNodes.forEach(p => {
      p.channelInterpretation = value;
    });
  }
  get context(): BaseAudioContext {
    return this._bufferSourceNode.context;
  }
  get numberOfInputs(): number {
    return this._bufferSourceNode.numberOfInputs;
  }
  get numberOfOutputs(): number {
    return this._bufferSourceNode.numberOfOutputs;
  }
//#endregion



  // get semitones(): AudioParam {
  //   return this._constantNode.offset;
  // }


  get tempo() {
    return this._vocoderNode.pitchFactor;
    return this._constantNode.offset;
    // return this._tempoControllerNode.tempo;
  }
  get baseTempo() {
    return this._formulaNode.arg1;
  }



  static async create(context: BaseAudioContext, options: & Options) {
    const nodes = await Promise.all([TimeStretchingNode.create(context), PhaseVocoderNode.create(context), FnFormulaNode.create(context)]);
    return new FnAudioBufferSourceNode(context, nodes, options);
    // this._tempoControllerNode.connectTranspose(this._pitchShiftNode.semitones);
  }
  private constructor(context: BaseAudioContext, [StretchNode,PitchShiftNode, FormulaNode]:[typeof TimeStretchingNode,typeof PhaseVocoderNode, typeof FnFormulaNode], options:AudioBufferSourceOptions & GainOptions & Options) {
    //super(context);


    this._constantNode = new ConstantSourceNode(context, {
      offset: options.tempo || options.baseTempo
    });
    /**
      * this gives playbackTempo/songTempo
      * value > 1 means we're playing back the song sped up
      * value < 1 means we're playing back the song slowed down
      **/
    this._formulaNode = new FormulaNode(context, {
      formula: `x / arg1`, //`-12 * Math.log2(x / arg1)` /*`-12 * Math.log2(x / ${baseTempo})`*/,
      arg1: options.baseTempo
    });


    // this._tempoControllerNode = new FnTempoControllerNode(context, baseTempo, {
    //   tempo: baseTempo
    // });
    this._bufferSourceNode = new AudioBufferSourceNode(context, options);
    // this._pitchShiftNode = new FnPitchShiftNode(context);
    this._gainNode = new GainNode(context, options);
    this._vocoderNode = new PitchShiftNode(context);
    this._vocoderNode.pitchFactor.value = 2 ** (0 / 12);
    this._stretchNode = new StretchNode(context);

    // this._constantNode.connect(this._bufferSourceNode.playbackRate);
    this._constantNode
      .connect(this._formulaNode)
      .connect(this._vocoderNode.pitchFactor);

  // (context as AudioContext).suspend();
    this._stretchNode.connect(this._gainNode);
    // this._tempoControllerNode.connectPlaybackRate(
    //   this._bufferSourceNode.playbackRate
    // );
    // this._bufferSourceNode
    //   .connect(this._vocoderNode)
    //   .connect(this._gainNode);

  }

  disconnect(): void;
  disconnect(output: number): void;
  disconnect(destinationNode: AudioNode): void;
  disconnect(destinationNode: AudioNode, output: number): void;
  disconnect(destinationNode: AudioNode, output: number, input: number): void;
  disconnect(destinationParam: AudioParam): void;
  disconnect(destinationParam: AudioParam, output: number): void;
  disconnect(...args:any[]) {
    this._gainNode.disconnect(...(args as Parameters<GainNode['disconnect']>));
  }
  dispatchEvent(event: Event): boolean {
    return this._bufferSourceNode.dispatchEvent(event);
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

  stop(when?: number): void {
    this._bufferSourceNode.stop(when);
    this._constantNode.stop(when);
  }
}

export async function go(context = new AudioContext()) {
  (window as any)['fnctx'] = context;

  const response = await fetch("https://fuckingdj.blob.core.windows.net/test/Swedish%20House%20Mafia%20-%20Save%20The%20World%20(Zedd%20Remix).mp3");
  const buffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(buffer);


  const source = await FnAudioBufferSourceNode.create(context, {
    //buffer: audioBuffer,
    baseTempo: 128,
    tempo: 128
  });
  source.buffer = audioBuffer;
  source.connect(context.destination);
  // source.start();
  // context.resume();
  setTimeout(() => {
    source.rate = 1.25;
  }, 8000);
  // source.tempo.setValueAtTime(140/128, context.currentTime + 10);
  // source.playbackRate.setValueAtTime(128/140, context.currentTime + 10);
}
