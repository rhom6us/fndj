// export {};
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



registerProcessor("fn-pitch-shift", class extends AudioWorkletProcessor {
  static get parameterDescriptors() /*: AudioParamDescriptor[]*/ {
    return [
      {
        name: "semitones",
        defaultValue: 0,
        minValue: -11,
        maxValue: 11,
        automationRate: "k-rate"
      }
    ];
  }
  constructor(options /*: AudioWorkletNodeOptions */) {
    super(options);
    this.port.onmessage = (event) => {
      console.log(event.data);
    };
  }
  process(
    inputs /*: Float32Array[][]*/,
    outputs /*: Float32Array[][]*/,
    parameters /*: Record<string, Float32Array>*/
  ) {
    const getParam = (name /*: string*/, i /*: number*/) =>
      parameters[name][Math.min(i, parameters[name].length - 1)];

    outputs.forEach((output, ioIndex) => {
      const input = inputs[ioIndex];
      output.forEach((channel, channelIndex) => {
        const channelValue = input[channelIndex];
        for (let i = 0; i < channel.length; i++) {
          channel[i] = channelValue[i] * getParam("customGain", i);
        }
      });
    });

    return false;
  }
});
