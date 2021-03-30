declare module 'superpowered' {
    type Pointer = number;
    export const enum SoundQuality {
        Low = 1,
        Realtime = 2,
        Best = 3,
    }

    export interface TimeStretching {
        /**
         * Do this when the sample rate change
         */
        samplerate: number;
        /**
         * @description Time stretching rate (tempo). 1 means no time stretching. Maximum: 4. Values above 2 or below 0.5 are not recommended on mobile devices with low latency audio due high CPU load and risk of audio dropouts.
         * @type {number}
         * @memberof TimeStretching
         */
        rate: number;
        /**
         * @type {number}
         * @memberof TimeStretching
         * @description Valid values are: 0 (best to save CPU with slightly lower audio quality), 1 (best for DJ apps, modern and "complete" music), 2 (best for instrumental loops and single instruments). Default: 1.
         * @default 1
         */
        sound: 0 | 1 | 2;
        /**
         * Pitch shift cents, limited from -2400 (two octaves down) to 2400 (two octaves up). Examples: 0 (no pitch shift), -100 (one note down), 300 (3 notes up).
         * When the value if a multiply of 100 and is >= -1200 and <= 1200, changing the pitch shift needs only a few CPU clock cycles. Any change in pitchShiftCents involves significant momentary CPU load otherwise.
         */
        pitchShiftCents: number;
        /**
         * Returns with how many frames of input should be provided to the time stretcher to produce some output.
         * It's never blocking for real-time usage. Use it in the same thread with the other real-time methods of this class.
         * The result can be 0 if rate is 1 and pitch shift is 0, because in that case the time stretcher is fully "transparent" and any number of input frames will produce some output.
         */
        getNumberOfInputFramesNeeded(): number;
        /**
         * Returns with how many frames of output is available.
         * It's never blocking for real-time usage. Use it in the same thread with the other real-time methods of this class.
         */
        getOutputLengthFrames(): number;

        /**
         * Processes audio. Has no return value.
         * It's never blocking for real-time usage. You can change all properties on any thread, concurrently with process(). Use it in the same thread with the other real-time methods of this class.
         * @param input Pointer to floating point numbers. 32-bit interleaved stereo output.
         * @param frames Number of frames to process.
         */
        addInput(input: Pointer, frames: number): void;
        /**
         * @description Gets the audio output into a buffer.
         * It's never blocking for real-time usage. You can change all properties on any thread, concurrently with process(). Use it in the same thread with the other real-time methods of this class.
         * eturns true if it has enough output frames stored and output is successfully written, false otherwise.
         * @param input Pointer to floating point numbers. 32-bit interleaved stereo output.
         * @param frames Number of frames to return with.
         */
        getOutput(input: Pointer, frames: number): void;
        /**
         * Reset all internals, sets the instance as good as new. Has no return value.
         * Don't call this concurrently with process() and in a real-time thread.
         */
        reset(): void;
        /**
         * Destructor (to free up memory).
         */
        desctruct(): void;

    }
    export interface SuperpoweredBuffer {
        pointer: Pointer;
        length: number;
        array: Float32Array;
    }
    interface SuperpoweredOptions {
        processorOptions: {
            samplerate: number;
        };
    }
    interface SuperpoweredModule {
        samplerate: number;
        getAudioContext(minimumSampleRate: number): AudioContext;
        createFloatArray(length: number): SuperpoweredBuffer;     /**
        * @param initialSampleRate The initial sample rate in Hz.
        * @param minimumRate The minimum value of rate. For example: if the rate will never go below 0.5, minimumRate = 0.5 will save significant computing power and memory. Minimum value of this: 0.01.
        * @param sound Valid values are: 0 (best to save CPU with slightly lower audio quality), 1 (best for DJ apps, modern and "complete" music), 2 (best for instrumental loops and single instruments).
        */
        UTF8ToString(arg: any): any;
        UTF8(): any;
        ["new"](type: 'TimeStretching', initialSampleRate: number, minimumRate: number, sound?: 0 | 1 | 2): TimeStretching;

    }
    namespace SuperpoweredModule {

        abstract class SuperpoweredAudioWorkletProcessor extends AudioWorkletProcessor {
            protected readonly Superpowered: SuperpoweredModule;
            private readonly inputBuffer: SuperpoweredBuffer;
            private readonly outputBuffer: SuperpoweredBuffer;
            private readonly ok: boolean;
            constructor(options: SuperpoweredOptions);
            protected abstract onReady(): void;
            protected abstract onMessageFromMainScope(message: any): void;
            protected sendMessageToMainScope(message: any): void;

            protected abstract processAudio(inputBuffer: SuperpoweredBuffer, outputBuffer: SuperpoweredBuffer, buffersize: number, parameters: Record<string, Float32Array>): boolean | void;
            process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
        }
        export { SuperpoweredAudioWorkletProcessor as AudioWorkletProcessor };
    }
    function SuperpoweredModule(options: {
        licenseKey?: string;
        enableAudioTimeStretching?: boolean;
        options?: SuperpoweredOptions;
        onReady: (SuperpoweredInstance: SuperpoweredModule) => void;
    }): void;

    export default SuperpoweredModule;
}
