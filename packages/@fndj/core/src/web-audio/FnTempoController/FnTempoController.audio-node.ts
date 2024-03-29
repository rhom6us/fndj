import { PROCESSOR_NAME, TEMPO } from './constants';
import url from './FnTempoController.worklet.ts';

export interface FnTempoControllerNodeParameters {
  tempo?: number;
}

export interface Options extends AudioWorkletNodeOptions {
  parameterData: {
    tempo: number;
  };
}
export class FnTempoControllerNode extends AudioWorkletNode {
  private static _processInitialized = false;
  public static async initialize(context: BaseAudioContext) {
    if (!FnTempoControllerNode._processInitialized) {
      await context.audioWorklet.addModule(url);
      FnTempoControllerNode._processInitialized = true;
    }
    return;
  }

  get [TEMPO](): AudioParam {
    return this.parameters.get(TEMPO)!;
  }

  constructor(context: BaseAudioContext, public readonly baseTempo: number, parameterData: FnTempoControllerNodeParameters = {}) {
    super(context, PROCESSOR_NAME, {
      numberOfInputs: 0,
      numberOfOutputs: 2,
      outputChannelCount: [1, 1],
      parameterData: parameterData as Record<string, number>,
      processorOptions: { baseTempo }
    });
  }

  connectPlaybackRate(destinationParam: AudioNode): AudioNode;
  connectPlaybackRate(destinationParam: AudioParam): void;
  connectPlaybackRate(destinationParam: any) {
    return super.connect(destinationParam, 0);
  }
  connectTranspose(destinationParam: AudioNode): AudioNode;
  connectTranspose(destinationParam: AudioParam): void;
  connectTranspose(destinationParam: any) {
    return super.connect(destinationParam, 1);
  }

  private _isRunning = true;
  start(/*when?: number, offset?: number, duration?: number*/): void {
    this._isRunning = true;
    this.port.postMessage({ isRunning: true });
  }
  stop(/*when?: number*/): void {
    this._isRunning = false;
    this.port.postMessage({ isRunning: false });
  }
}
