export default Metronome;
/**
 * Metronome audio engine. It extends Time Engine as a transported interface.
 * [example]{@link https://rawgit.com/wavesjs/waves-audio/master/examples/metronome/index.html}
 *
 * @extends AudioTimeEngine
 * @example
 * import * as audio from 'waves-audio';
 * const scheduler = audio.getScheduler();
 * const metronome = new audio.Metronome({period: 0.333});
 *
 * scheduler.add(metronome);
 *
 * @param {Object} [options={}] - Default options
 * @param {Number} [options.period=1] - Metronome period
 * @param {Number} [options.clickFreq=600] - Metronome click frequency
 * @param {Number} [options.clickAttack=0.002] - Metronome click attack time
 * @param {Number} [options.clickRelease=0.098] - Metronome click release time
 * @param {Number} [options.gain=1] - Gain
 */
declare class Metronome extends AudioTimeEngine {
    constructor(options?: {
        audioContext?: BaseAudioContext,
        period?: number,
        clickFreq?: number,
        clickAttack?: number,
        clickRelease?: number,
        gain?: number,
    });
    /**
     * Metronome period
     * @type {Number}
     * @private
     */
    private __period;
    /**
     * Metronome click frequency
     *
     * @type {Number}
     * @memberof Metronome
     * @name clickFreq
     * @instance
     */
    clickFreq: number;
    /**
     * Metronome click attack time
     *
     * @type {Number}
     * @memberof Metronome
     * @name clickAttack
     * @instance
     */
    clickAttack: number;
    /**
     * Metronome click release time
     *
     * @type {Number}
     * @memberof Metronome
     * @name clickRelease
     * @instance
     */
    clickRelease: number;
    __lastTime: number;
    __phase: number;
    __gainNode: GainNode;
    advanceTime(time: any): any;
    syncPosition(time: any, position: any, speed: any): number;
    advancePosition(time: any, position: any, speed: any): any;
    /**
     * Trigger metronome click
     * @param {Number} time metronome click synthesis audio time
     */
    trigger(time: number): void;
    /**
     * linear gain factor
     *
     * @type {Number}
     * @name gain
     * @memberof Metronome
     * @instance
     */
    set gain(arg: number);
    get gain(): number;
    /**
     * metronome period
     *
     * @type {Number}
     * @name period
     * @memberof Metronome
     * @instance
     */
    set period(arg: number);
    get period(): number;
    /**
     * Set phase parameter (available only when 'transported'), should be
     * between [0, 1[
     *
     * @type {Number}
     * @name phase
     * @memberof Metronome
     * @instance
     */
    set phase(arg: number);
    get phase(): number;
}
import AudioTimeEngine from "../core/AudioTimeEngine";
//# sourceMappingURL=Metronome.d.ts.map
