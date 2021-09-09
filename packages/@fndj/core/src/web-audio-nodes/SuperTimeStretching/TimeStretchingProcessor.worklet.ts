import { SuperpoweredBuffer, SuperpoweredWebAudio, TimeStretching } from '@fndj/superpowered';
import { PROCESSOR_NAME } from './constants';

// let superpowered: SuperpoweredModule | undefined;

registerProcessor(PROCESSOR_NAME, class extends SuperpoweredWebAudio.AudioWorkletProcessor {
    static get parameterDescriptors(): AudioParamDescriptor[] {
        return [
            //   {
            //     name: TEMPO,
            //     defaultValue: 128,
            //     minValue: 1,
            //     maxValue: 1000,
            //     automationRate: "a-rate"
            //   }
        ];
    }


    posFrames = -1;
    pcm!: SuperpoweredBuffer;

    timeStretching!: TimeStretching;
    left: any;
    right: any;
    lengthFrames!: number;
    // runs after the constructor


    onReady() {

        // allocating some WASM memory for passing audio to the time stretcher
        this.pcm = this.Superpowered.createFloatArray(2048 * 2);
        // the star of the show
        this.timeStretching = new this.Superpowered.TimeStretching(this.samplerate, 0.5, 1);
        this.timeStretching.rate = 1.1;
    }

    onMessageFromMainScope(message: any) {

        // did we receive the audio from the main thread?
        if (message.left && message.right) {
            // left and right channels are NOT stored in WASM memory
            this.left = message.left;
            this.right = message.right;

            this.lengthFrames = Math.min(message.left.length, message.right.length);
            this.posFrames = 0;
        }
        // changing the rate?
        if (typeof message.rate !== 'undefined') this.timeStretching!.rate = message.rate / 10000.0;
        // changing the pitch shift?
        if (typeof message.pitchShift !== 'undefined') this.timeStretching!.pitchShiftCents = message.pitchShift * 100;
    }
    protected processAudio(inputBuffer: SuperpoweredBuffer, outputBuffer: SuperpoweredBuffer, buffersize: number, parameters: Record<string, Float32Array>) {
        // debugger;
        // did we receive the left and right channels already?
        if (this.posFrames == -1) { // if not, output silence
            for (let n = 0; n < buffersize * 2; n++) outputBuffer.array[n] = 0;
            return;
        }

        // iterate until the time stretcher has at least "buffersize" amount of output available
        while (this.timeStretching.getOutputLengthFrames() < buffersize) {
            // how many frames of input should we provide to the time stretcher to produce some output?
            let framesNeeded = this.timeStretching.getNumberOfInputFramesNeeded();
            if (framesNeeded == 0) framesNeeded = buffersize; // happens when time stretch rate = 1.0x and pitch shift = 0

            // do we have that many frames available?
            const framesAvailable = this.lengthFrames - (this.posFrames + framesNeeded);
            if (framesAvailable < 1) this.posFrames = 0; // start from 0 when we reach the end (loop)
            else if (framesAvailable < framesNeeded) framesNeeded = framesAvailable; // use less frames if we still have some until the end

            // copy the audio samples to the WASM memory and step posFrames
            for (let n = 0, to = framesNeeded * 2; n < to; n++) {
                this.pcm.array[n++] = this.left[this.posFrames];
                this.pcm.array[n] = this.right[this.posFrames++];
            }

            // start from 0 when we reach the end (loop)
            if (this.posFrames >= this.lengthFrames) this.posFrames = 0;

            // pass the input to the time stretcher
            // it will produce some output in this step if it has enough frames collected
            this.timeStretching.addInput(this.pcm.pointer, framesNeeded);
        }

        // get the requested amount of output
        this.timeStretching.getOutput(outputBuffer.pointer, buffersize);
    }
});
