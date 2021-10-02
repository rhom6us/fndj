import { Pointer } from '../Pointer';

export class TimeStretching {
    constructor(sampleRate: number, minimumRate: number, sound: 0 | 1 | 2);

    /**
     * @description Time stretching rate (tempo). 1 means no time stretching. Maximum: 4. Values above 2 or below 0.5 are not recommended on mobile devices with low latency audio due high CPU load and risk of audio dropouts.
     * @type {number}
     * @memberof TimeStretching
     */
    rate: number;
    /**
     * Pitch shift cents, limited from -2400 (two octaves down) to 2400 (two octaves up). Examples: 0 (no pitch shift), -100 (one note down), 300 (3 notes up).
     * When the value if a multiply of 100 and is >= -1200 and <= 1200, changing the pitch shift needs only a few CPU clock cycles. Any change in pitchShiftCents involves significant momentary CPU load otherwise.
     */
    pitchShiftCents: number;
    /**
     * @description Sample rate in Hz. High quality pitch shifting requires 44100 Hz or more, the sound is "echoing" on lower sample rates.
     */
    samplerate: number;
    /**
     * @type {number}
     * @memberof TimeStretching
     * @description Valid values are: 0 (best to save CPU with slightly lower audio quality), 1 (best for DJ apps, modern and "complete" music), 2 (best for instrumental loops and single instruments). Default: 1.
     * @default 1
     */
    sound: 0 | 1 | 2;

    /**
     * Amount of formant correction, between 0 (none) and 1 (full). Default: 0.
     *
     * @type {number}
     * @memberof TimeStretching
     */
    formantCorrection: number;

    /**
     * Maintain precise timing when the time-stretcher turns on. Useful for all use-cases except when the audio is heavily manipulated with some resampler (scratching). Default: true.
     *
     * @type {boolean}
     * @memberof TimeStretching
     */
    preciseTurningOn: boolean;

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
     * Gets the audio output into a buffer.
     * It's never blocking for real-time usage. You can change all properties on any thread, concurrently with process(). Use it in the same thread with the other real-time methods of this class.eturns true if it has enough output frames stored and output is successfully written, false otherwise.
     *
     * @param output Pointer to floating point numbers. 32-bit interleaved stereo output.
     * @param frames Number of frames to return with.
     * @returns {boolean} Returns true if it has enough output frames stored and output is successfully written, false otherwise.
     * @memberof TimeStretching
     */
    getOutput(output: Pointer, frames: number): boolean;
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
