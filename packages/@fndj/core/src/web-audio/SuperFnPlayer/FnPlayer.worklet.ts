import { AdvancedAudioPlayer, pointer, SuperpoweredBuffer, SuperpoweredTrackLoader, SuperpoweredWebAudio, TimeStretching } from '@fndj/superpowered'; //'../../../../superpowered/src';
import { PROCESSOR_NAME } from '../SuperTimeStretching/constants';
import { SPEED_FACTOR } from './constants';

// let superpowered: SuperpoweredModule | undefined;

declare const currentTime: number;
declare const sampleRate: number;
registerProcessor(PROCESSOR_NAME, class extends SuperpoweredWebAudio.AudioWorkletProcessor {
    static get parameterDescriptors(): AudioParamDescriptor[] {
        return [
            {
                name: SPEED_FACTOR,
                defaultValue: 1.0,
                minValue: 0.5,
                maxValue: 2.0,
                automationRate: 'k-rate',
            },
        ];
    }
    posFrames = -1;
    pcm!: SuperpoweredBuffer;

    player!: AdvancedAudioPlayer;
    left: any;
    right: any;
    lengthFrames!: number;
    // runs after the constructor


    startTime: number | undefined;


    onReady() {
        this.player = new this.Superpowered.AdvancedAudioPlayer(this.samplerate, 2, 2, 0, 0.501, 2, false);
        SuperpoweredTrackLoader.downloadAndDecode('../track.mp3', this);
    }

    onMessageFromMainScope(message: any) {
        if (message.SuperpoweredLoaded) {
            this.player.openMemory(this.Superpowered.arrayBufferToWASM(message.SuperpoweredLoaded.buffer), false, false);
            this.player.play();
            this.sendMessageToMainScope({ loaded: true });
        }

        if (typeof message.rate !== 'undefined') this.player.playbackRate = message.rate / 10000.0;
        if (typeof message.pitchShift !== 'undefined') this.player.pitchShiftCents = parseInt(message.pitchShift) * 100;
        if (typeof message.startTime !== 'undefined') this.startTime = parseInt(message.startTime);
    }

    private writeSilence(buffer: SuperpoweredBuffer, numberOfFrames: number) {
        for (let n = 0; n < numberOfFrames * 2; n++)
            buffer.array[n] = 0;
    }

    protected processAudio(inputBuffer: SuperpoweredBuffer, outputBuffer: SuperpoweredBuffer, bufferSize: number, parameters: Record<string, Float32Array>) {

        if (this.startTime === undefined) {
            this.writeSilence(outputBuffer, bufferSize);
            return;
        }
        const windowEndTime = currentTime + bufferSize / sampleRate;

        if (this.startTime > windowEndTime) {
            this.writeSilence(outputBuffer, bufferSize);
            return;
        }


        const timeToStart = this.startTime - currentTime;
        const framesUntilStart = timeToStart * this.samplerate;

        if (framesUntilStart > bufferSize) {
            this.writeSilence(outputBuffer, bufferSize);
            return;
        }

        if (framesUntilStart > 0) {
            this.writeSilence(outputBuffer, framesUntilStart);
            this.player.processStereo(pointer(outputBuffer.pointer + 2 * framesUntilStart * outputBuffer.array.byteLength), false, bufferSize - framesUntilStart, 1);
        }

        if (!this.player.processStereo(outputBuffer.pointer, false, bufferSize, 1)) {
            this.writeSilence(outputBuffer, bufferSize);
        };
    }
    // protected processsAudio(inputBuffer: SuperpoweredBuffer, outputBuffer: SuperpoweredBuffer, buffersize: number, parameters: Record<string, Float32Array>) {
    //     // no automation, take last value
    //     const pitchFactor = parameters[PITCH_FACTOR][parameters[PITCH_FACTOR].length - 1];
    //     const semitones = 12 * Math.log2(pitchFactor);
    //     const cents = semitones * 100;
    //     this.timeStretching.pitchShiftCents = cents;

    //     this.timeStretching.addInput(inputBuffer.pointer, buffersize);
    //     const success = this.timeStretching.getOutput(outputBuffer.pointer, buffersize);

    //     if (!success) {
    //         // eslint-disable-next-line no-debugger
    //         debugger;
    //         throw 'pitch shift failed to produce output';
    //     }
    //     // debugger;
    //     // did we receive the left and right channels already?
    //     if (this.posFrames == -1) { // if not, output silence
    //         for (let n = 0; n < buffersize * 2; n++) outputBuffer.array[n] = 0;
    //         return;
    //     }

    //     // iterate until the time stretcher has at least "buffersize" amount of output available
    //     while (this.timeStretching.getOutputLengthFrames() < buffersize) {
    //         // how many frames of input should we provide to the time stretcher to produce some output?
    //         let framesNeeded = this.timeStretching.getNumberOfInputFramesNeeded();
    //         if (framesNeeded == 0) framesNeeded = buffersize; // happens when time stretch rate = 1.0x and pitch shift = 0

    //         // do we have that many frames available?
    //         const framesAvailable = this.lengthFrames - (this.posFrames + framesNeeded);
    //         if (framesAvailable < 1) this.posFrames = 0; // start from 0 when we reach the end (loop)
    //         else if (framesAvailable < framesNeeded) framesNeeded = framesAvailable; // use less frames if we still have some until the end

    //         // copy the audio samples to the WASM memory and step posFrames
    //         for (let n = 0, to = framesNeeded * 2; n < to; n++) {
    //             this.pcm.array[n++] = this.left[this.posFrames];
    //             this.pcm.array[n] = this.right[this.posFrames++];
    //         }

    //         // start from 0 when we reach the end (loop)
    //         if (this.posFrames >= this.lengthFrames) this.posFrames = 0;

    //         // pass the input to the time stretcher
    //         // it will produce some output in this step if it has enough frames collected
    //         this.timeStretching.addInput(this.pcm.pointer, framesNeeded);
    //     }

    //     // get the requested amount of output
    //     this.timeStretching.getOutput(outputBuffer.pointer, buffersize);
    // }
});
