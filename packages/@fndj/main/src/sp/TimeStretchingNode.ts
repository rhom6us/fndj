/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { logger } from '@fndj/util';
import SuperpoweredModule  from 'superpowered';
import { /*ARG1, ARG2, ARG3,*/ PROCESSOR_NAME } from './constants';
import url from './TimeStretchingProcessor.worklet.ts'
const initializedContextsWithThisWorklet = new Map<BaseAudioContext, Promise<void>>();

export interface ProcessorOptions{
//   formula: string;
    samplerate?: number;
}
export interface ParameterData{
//   [ARG1]?: any;
//   [ARG2]?: any;
//   [ARG3]?: any;
}
/**
 * formula instructions:
 * The processor will call the formula for each sample in each
 * channel. Available arguments are:
 *  x - the current sample value
 *  [ARG1]
 *  [ARG2]
 *  [ARG3]
 *
 * example1: "12 * Math.log2(x)"
 * example2: "x * [ARG1]"
 *
 */
let Superpowered: SuperpoweredModule;
export class TimeStretchingNode extends AudioWorkletNode {

//   get [ARG1]() {
//     return this.parameters.get(ARG1)!;
//   }
  // get [ARG2]() {
  //   return this.parameters.get(ARG2)!;
  // }
  // get [ARG3]() {
  //   return this.parameters.get(ARG3)!;
  // }
    set buffer(pcmData: AudioBuffer) {
        this.port.postMessage({
            left: pcmData.getChannelData(0),
            right: pcmData.getChannelData(1) }
       );

    }
    set rate(value: number) {
        this.port.postMessage({ rate: value });
    }
    set pitchShift(pitchShift: number) {
        this.port.postMessage({ 'pitchShift': pitchShift });
    }
  static async create(context: BaseAudioContext): Promise<typeof TimeStretchingNode> {
    if (!initializedContextsWithThisWorklet.has(context)) {
      initializedContextsWithThisWorklet.set(context, context.audioWorklet.addModule(url));
    }
    await initializedContextsWithThisWorklet.get(context);
    return TimeStretchingNode;
  }
  constructor(
      context: BaseAudioContext, {
      samplerate,
          //   [ARG1]:arg1,
          // [ARG2]:arg2,
          // [ARG3]:arg3
    }: ProcessorOptions & ParameterData = {},
     callback?: Function, onMessageFromAudioScope?: Function
  ) {
    if (!initializedContextsWithThisWorklet.has(context)) {
      throw new Error('Invalid constructor');
    }
    super(context, PROCESSOR_NAME, {
      processorOptions: { samplerate:samplerate||context.sampleRate, Superpowered:Superpowered.UTF8ToString(Superpowered.UTF8())} ,
      parameterData: { /*[ARG1]:arg1, [ARG2]:arg2, [ARG3]:arg3*/ },
      "outputChannelCount": [2]
    });

    this.port.onmessage = (event => {
      // eslint-disable-next-line no-console
      logger.log('Message received from the audio node: ', event);
      if (event.data == "___superpowered___onready___")
        (callback || (() => { }))(this);
      else
        (onMessageFromAudioScope || (()=> { }))(event.data);
    });
  }
  sendMessageToAudioScope(message:any) {
    this.port.postMessage(message)
  }
}
SuperpoweredModule({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioTimeStretching: true,

    onReady: function(SuperpoweredInstance) {
        Superpowered = SuperpoweredInstance;
    }
});
