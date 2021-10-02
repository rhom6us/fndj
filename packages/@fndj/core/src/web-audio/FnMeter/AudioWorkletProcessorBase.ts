

export class ParameterData {
  constructor(public readonly parameters: Record<string, Float32Array>) {

  }
  get(name: string, i: number) {
    return this.parameters[name][Math.min(i, this.parameters[name].length - 1)];
  }
}


export abstract class AudioWorkletProcessorBase<PortInData = any, PortOutMessage = any> extends AudioWorkletProcessor {
  constructor() {
    super();

    this.port.onmessage = (ev) => this.onMessageFromFrontEnd(ev.data);
  }
  protected abstract onMessageFromFrontEnd(data: PortInData): void;
  protected sendMessageToFrontEnd(message: any, ...transfers: Array<ArrayBuffer | MessagePort | ImageBitmap>) {
    this.port.postMessage(message, transfers);
  }


  private validateIO(buffer: Float32Array[][]): buffer is [[Float32Array, Float32Array]] {
    if (buffer.length !== 1) {
      return false;
    }
    if (buffer[0].length !== 2) {
      return false;
    }
    return true;
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
    if (this.validateIO(inputs) && this.validateIO(outputs)) {
      return this.processSingleStereoIO(inputs[0], outputs[0], new ParameterData(parameters));
    } else {
      throw new Error(`AudioWorkletProcessorBase currently only suppers single input, single output, stereo data`);
    }
  }
  protected abstract processSingleStereoIO(inputs: [Float32Array, Float32Array], outputs: [Float32Array, Float32Array], parameters: ParameterData): boolean;
}
