export interface FnTempoControllerNodeParameters {
  tempo?: number;
}
export class FnTempoControllerNode extends AudioWorkletNode {
  private static _processInitialized = false;
  public static async initialize(context: BaseAudioContext) {
    if (!FnTempoControllerNode._processInitialized) {
      await context.audioWorklet.addModule("./FnTempoControllerProcessor.js");
      FnTempoControllerNode._processInitialized = true;
    }
    return;
  }

  get tempo(): AudioParam {
    return this.parameters.get("tempo")!;
  }

  constructor(
    context: BaseAudioContext,
    public readonly baseTempo: number,
    parameterData: FnTempoControllerNodeParameters = {}
  ) {
    super(context, "fn-tempo-controller", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
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
