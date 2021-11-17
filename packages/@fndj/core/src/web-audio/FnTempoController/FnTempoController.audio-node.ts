import { audioContext } from '@rhombus/audio-context';
import { WorkerUrl } from 'worker-url';
import { PROCESSOR_NAME, TEMPO } from './constants';


await audioContext.audioWorklet.addModule(new WorkerUrl(new URL('./FnTempoController.worklet.js', import.meta.url)));
export interface FnTempoControllerNodeParameters {
  tempo?: number;
}

export interface Options extends AudioWorkletNodeOptions {
  parameterData: {
    tempo: number;
  };
}
export class FnTempoControllerNode extends AudioWorkletNode {

  get [TEMPO](): AudioParam {
    return this.parameters.get(TEMPO)!;
  }

  constructor(context: BaseAudioContext, public readonly baseTempo: number, parameterData: FnTempoControllerNodeParameters = {}) {
    if (context !== audioContext) {
      throw 'this is only set up to work with the default audio context';
    }
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
