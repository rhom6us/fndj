export {};

declare global {
  interface AudioParamMap extends Map<string, AudioParam> {}
  abstract class AudioWorkletProcessor {
    static readonly parameterDescriptors: AudioParamDescriptor[];
    constructor(options?: AudioWorkletNodeOptions);
    readonly port: MessagePort;
    abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
  }


  type AudioWorkletProcessorCtor = (new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  };
  function registerProcessor(name: string, processorCtor: AudioWorkletProcessorCtor): undefined;
}
