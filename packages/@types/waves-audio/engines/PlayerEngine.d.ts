export default PlayerEngine;
/**
 * Used with a buffer to serve audio files.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-audio/master/examples/player-engine/index.html}
 *
 * @extends AudioTimeEngine
 * @example
 * import * as audio from 'waves-audio';
 * const playerEngine = audio.PlayerEngine();
 * const playControl = new audio.PlayControl(playerEngine);
 *
 * playControl.start();
 *
 * @param {Object} [options={}] - Default options
 * @param {AudioBuffer} [options.buffer=1] - Audio buffer
 * @param {Number} [options.fadeTime=0.005] - Fade time for chaining segments
 * @param {Number} [options.cyclic=false] - Loop mode
 * @param {Number} [options.gain=1] - Gain
 */
declare class PlayerEngine extends AudioTimeEngine {
    constructor(buffer: AudioBuffer);
    constructor(options?: {
        audioContext?: BaseAudioContext,
        buffer?: AudioBuffer,
        fadeTime?: number,
        cyclic?: boolean,
        gain?: number,
    });
    transport: any;
    /**
     * Audio buffer
     *
     * @type {AudioBuffer}
     * @name buffer
     * @memberof PlayerEngine
     * @instance
     * @default null
     */
    buffer: AudioBuffer;
    /**
     * Fade time for chaining segments (e.g. in start, stop, and seek)
     *
     * @type {Number}
     * @name fadeTime
     * @memberof PlayerEngine
     * @instance
     * @default 0.005
     */
    fadeTime: number;
    private __time: number;
    private __position: number;
    private __speed: number;
    private __bufferSource: AudioBufferSourceNode;
    private __envNode: GainNode;
    private __gainNode: GainNode;
    private __cyclic: boolean;
    private __start(time: any, position: any, speed: any): void;
    private __halt(time: any): void;
    private syncSpeed(time: any, position: any, speed: any, seek?: boolean): void;
    /**
     * Set whether the audio buffer is considered as cyclic
     * @type {Bool}
     * @name cyclic
     * @memberof PlayerEngine
     * @instance
     */
    cyclic: boolean;

    /**
     * Linear gain factor
     * @type {Number}
     * @name gain
     * @memberof PlayerEngine
     * @instance
     */
    gain: number;

    /**
     * Get buffer duration
     * @type {Number}
     * @name bufferDuration
     * @memberof PlayerEngine
     * @instance
     * @readonly
     */
    readonly bufferDuration: number;
}
import AudioTimeEngine from "../core/AudioTimeEngine";
//# sourceMappingURL=PlayerEngine.d.ts.map
