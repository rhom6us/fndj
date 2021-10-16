/* eslint-disable @typescript-eslint/ban-types */
import { audioContext } from '../audio-context';
import { PROCESSOR_NAME } from './constants';
import { FnEventTarget } from './FnEventTarget';
import { FnMeterEvent } from './FnMeterEvent';
// import url from './FnMeter.worklet.ts';
// const url = new URL('./FnMeter.worklet.ts', import.meta.url);
// console.log('heeeeeeeeey', { audioContext, url });

// await audioContext.audioWorklet.addModule(url, {});

interface FnMeterNodeEventMap extends AudioWorkletNodeEventMap {
  "meterdataupdated": FnMeterEvent;
}

export class FnMeterNode extends AudioWorkletNode implements EventTarget {

  private fnTargets: FnEventTarget;
  public onmeterdataupdated?: ((this: FnMeterNode, ev: FnMeterEvent) => any);
  addEventListener<K extends keyof FnMeterNodeEventMap>(type: K, listener: (this: FnMeterNode, ev: FnMeterNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
    this.fnTargets.addEventListener(type, listener as any);
  }
  removeEventListener<K extends keyof FnMeterNodeEventMap>(type: K, listener: (this: AudioWorkletNode, ev: FnMeterNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
    this.fnTargets.removeEventListener(type, listener as any);
  }

  // private static _processInitialized = false;
  // static async initialize(context: BaseAudioContext) {
  //   if (!FnMeterNode._processInitialized) {
  //     await context.audioWorklet.addModule(url);
  //     FnMeterNode._processInitialized = true;
  //   }
  //   return;
  // }


  public current: [{ peak: number, rms: number; }, { peak: number, rms: number; }] | undefined;
  // constructor(context: BaseAudioContext, parameterData: FnMeterNodeParameters = {}) {
  constructor(context: BaseAudioContext, options = {}) {
    super(context, PROCESSOR_NAME, { numberOfOutputs: 1, numberOfInputs: 1, processorOptions: {} });
    this.fnTargets = new FnEventTarget();
    this.port.onmessage = evt => {
      if (!('meter' in evt.data)) {
        return;
      }
      this.current = evt.data.meter;
      // if (!this.current) {
      //   this.current = evt.data.meter;
      // } else {
      //   this.current.peak = evt.data.meter.peak;
      //   this.current.rms = evt.data.meter.rms;
      // }
      const e = new FnMeterEvent(this.current!);
      this.fnTargets.dispatchEvent(e);
    };
  }

  // if (!initializedContextsWithThisWorklet.has(context)) {
  //   throw new Error(`this audio worklet hasn't been initialized with this audiocontext`);
  // }
  // const la = { processorOptions: { [FFT_SIZE]: options[FFT_SIZE] ?? 1024 }, parameterData: { [PITCH_FACTOR]: options[PITCH_FACTOR] ?? 1 } };
  // console.log("sending in fft size " + options[FFT_SIZE]);
  // super(context, PROCESSOR_NAME, la);

  // this.fnTargets.addEventListener('meterupdated', (e: FnMeterEvent) => this.onmeterdataupdated?.call(this, e));
  // this.fnTargets.addEventListener('processorerror', (e: Event) => this.onprocessorerror?.call(this, e));

}

export default FnMeterNode;
