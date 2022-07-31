import { logger } from "@rhombus-toolkit/logger";
import { AudioWorkletProcessorBase, ParameterData } from './AudioWorkletProcessorBase';
// //declare global {
// declare class AudioWorkletProcessor {
//   static readonly parameterDescriptors: AudioParamDescriptor[];
//   readonly port: MessagePort;
//   constructor(options?: AudioWorkletNodeOptions);
//   process(
//     inputs: Float32Array[][],
//     outputs: Float32Array[][],
//     parameters: Record<string, Float32Array>
//   ): boolean;
// }
// declare function registerProcessor(
//   name: string,
//   processorCtor: (new (
//     options?: AudioWorkletNodeOptions
//   ) => AudioWorkletProcessor) & {
//     parameterDescriptors?: AudioParamDescriptor[];
//   }
// ): void;
// abstract class AudioWorkletProcessor{
//   readonly parameterDescriptors: AudioParamDescriptor
//   abstract process (inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>);
// }
import { PROCESSOR_NAME, QUANTUM_SIZE, WINDOW_SIZE } from './constants';


function calcMeterValues(inputs: number[]) {
  const sqr = inputs.map(p => p ** 2);
  const peak = sqr.reduce((a, b) => Math.max(a, b)) ** 0.5;

  const rms = (sqr.reduce((a, b) => a + b) / sqr.length) ** 0.5;


  return { peak, rms };
}


// export class FnMeter extends AudioWorkletProcessorBase {


registerProcessor(
  PROCESSOR_NAME, class extends AudioWorkletProcessorBase {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [
      // {
      //   name: SEMITONES,
      //   defaultValue: 0,
      //   minValue: -11,
      //   maxValue: 11,
      //   automationRate: "k-rate"F
      // }
    ];
  }

  private window: [Float32Array, Float32Array][] = [];

  protected onMessageFromFrontEnd(data: any): void {
    logger.log(PROCESSOR_NAME, { messageFromFrontEnd: data });
  }


  protected processSingleStereoIO(inputs: [Float32Array, Float32Array], outputs?: [Float32Array, Float32Array], parameters?: ParameterData): boolean {
    this.window.push(inputs);
    if (this.window.length >= WINDOW_SIZE / QUANTUM_SIZE) {
      const channels = this.window.reduce((seed: [number[], number[]], current: [Float32Array, Float32Array]) => [[...seed[0], ...current[0]], [...seed[1], ...current[1]]], [[], []]);//.flatMap(p => p);
      this.window = [];
      const meter = channels.map(calcMeterValues);


      this.sendMessageToFrontEnd({ meter });
    }



    return true;

  }
});
