export default GranularEngine;
/**
 * Granular synthesis TimeEngine implementing the scheduled interface.
 * The grain position (grain onset or center time in the audio buffer) is
 * optionally determined by the engine's currentPosition attribute.
 *
 * Example that shows a `GranularEngine` (with a few parameter controls) driven
 * by a `Scheduler` and a `PlayControl`:
 * {@link https://rawgit.com/wavesjs/waves-audio/master/examples/granular-engine/index.html}
 *
 * @extends AudioTimeEngine
 * @example
 * import * as audio from 'waves-audio';
 * const scheduler = audio.getScheduler();
 * const granularEngine = new audio.GranularEngine();
 *
 * scheduler.add(granularEngine);
 *
 *
 * @param {Object} options={} - Parameters
 * @param {AudioBuffer} [options.buffer=null] - Audio buffer
 * @param {Number} [options.periodAbs=0.01] - Absolute grain period in sec
 * @param {Number} [options.periodRel=0] - Grain period relative to absolute
 *  duration
 * @param {Number} [options.periodVar=0] - Amout of random grain period
 *  variation relative to grain period
 * @param {Number} [options.periodMin=0.001] - Minimum grain period
 * @param {Number} [options.position=0] - Grain position (onset time in audio
 *  buffer) in sec
 * @param {Number} [options.positionVar=0.003] - Amout of random grain position
 *  variation in sec
 * @param {Number} [options.durationAbs=0.1] - Absolute grain duration in sec
 * @param {Number} [options.durationRel=0] - Grain duration relative to grain
 *  period (overlap)
 * @param {Number} [options.attackAbs=0] - Absolute attack time in sec
 * @param {Number} [options.attackRel=0.5] - Attack time relative to grain duration
 * @param {String} [options.attackShape='lin'] - Shape of attack
 * @param {Number} [options.releaseAbs=0] - Absolute release time in sec
 * @param {Number} [options.releaseRel=0.5] - Release time relative to grain duration
 * @param {Number} [options.releaseShape='lin'] - Shape of release
 * @param {String} [options.expRampOffset=0.0001] - Offset (start/end value)
 *  for exponential attack/release
 * @param {Number} [options.resampling=0] - Grain resampling in cent
 * @param {Number} [options.resamplingVar=0] - Amout of random resampling variation in cent
 * @param {Number} [options.gain=1] - Linear gain factor
 * @param {Boolean} [options.centered=true] - Whether the grain position refers
 *  to the center of the grain (or the beginning)
 * @param {Boolean} [options.cyclic=false] - Whether the audio buffer and grain
 *  position are considered as cyclic
 * @param {Number} [options.wrapAroundExtension=0] - Portion at the end of the
 *  audio buffer that has been copied from the beginning to assure cyclic behavior
 */
declare class GranularEngine extends AudioTimeEngine {
    constructor(options?: {
        buffer?: AudioBuffer,
        periodAbs?: number,
        periodRel?: number,
        periodVar?: number,
        periodMin?: number,
        position?: number,
        positionVar?: number,
        durationAbs?: number,
        durationRel?: number,
        attackAbs?: number,
        attackRel?: number,
        attackShape?: string,
        releaseAbs?: number,
        releaseRel?: number,
        releaseShape?: number,
        expRampOffset?: string,
        resampling?: number,
        resamplingVar?: number,
        gain?: number,
        centered?: boolean,
        cyclic?: boolean,
        wrapAroundExtension?: number,
    });
    /**
     * Audio buffer
     *
     * @type {AudioBuffer}
     * @name buffer
     * @default null
     * @memberof GranularEngine
     * @instance
     */
    buffer: AudioBuffer;
    /**
     * Absolute grain period in sec
     *
     * @type {Number}
     * @name periodAbs
     * @default 0.01
     * @memberof GranularEngine
     * @instance
     */
    periodAbs: number;
    /**
     * Grain period relative to absolute duration
     *
     * @type {Number}
     * @name periodRel
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    periodRel: number;
    /**
     * Amout of random grain period variation relative to grain period
     *
     * @type {Number}
     * @name periodVar
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    periodVar: number;
    /**
     * Minimum grain period
     *
     * @type {Number}
     * @name periodMin
     * @default 0.001
     * @memberof GranularEngine
     * @instance
     */
    periodMin: number;
    /**
     * Grain position (onset time in audio buffer) in sec
     *
     * @type {Number}
     * @name position
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    position: number;
    /**
     * Amout of random grain position variation in sec
     *
     * @type {Number}
     * @name positionVar
     * @default 0.003
     * @memberof GranularEngine
     * @instance
     */
    positionVar: number;
    /**
     * Absolute grain duration in sec
     *
     * @type {Number}
     * @name durationAbs
     * @default 0.1
     * @memberof GranularEngine
     * @instance
     */
    durationAbs: number;
    /**
     * Grain duration relative to grain period (overlap)
     *
     * @type {Number}
     * @name durationRel
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    durationRel: number;
    /**
     * Absolute attack time in sec
     *
     * @type {Number}
     * @name attackAbs
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    attackAbs: number;
    /**
     * Attack time relative to grain duration
     *
     * @type {Number}
     * @name attackRel
     * @default 0.5
     * @memberof GranularEngine
     * @instance
     */
    attackRel: number;
    /**
     * Shape of attack ('lin' for linear ramp, 'exp' for exponential ramp)
     *
     * @type {String}
     * @name attackShape
     * @default 'lin'
     * @memberof GranularEngine
     * @instance
     */
    attackShape: string;
    /**
     * Absolute release time in sec
     *
     * @type {Number}
     * @name releaseAbs
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    releaseAbs: number;
    /**
     * Release time relative to grain duration
     *
     * @type {Number}
     * @name releaseRel
     * @default 0.5
     * @memberof GranularEngine
     * @instance
     */
    releaseRel: number;
    /**
     * Shape of release ('lin' for linear ramp, 'exp' for exponential ramp)
     *
     * @type {String}
     * @name releaseShape
     * @default 'lin'
     * @memberof GranularEngine
     * @instance
     */
    releaseShape: string;
    /**
     * Offset (start/end value) for exponential attack/release
     *
     * @type {Number}
     * @name expRampOffset
     * @default 0.0001
     * @memberof GranularEngine
     * @instance
     */
    expRampOffset: number;
    /**
     * Grain resampling in cent
     *
     * @type {Number}
     * @name resampling
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    resampling: number;
    /**
     * Amout of random resampling variation in cent
     *
     * @type {Number}
     * @name resamplingVar
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    resamplingVar: number;
    /**
     * Linear gain factor
     *
     * @type {Number}
     * @name gain
     * @default 1
     * @memberof GranularEngine
     * @instance
     */
    gain: number;
    /**
     * Whether the grain position refers to the center of the grain (or the beginning)
     *
     * @type {Boolean}
     * @name centered
     * @default true
     * @memberof GranularEngine
     * @instance
     */
    centered: boolean;
    /**
     * Whether the audio buffer and grain position are considered as cyclic
     *
     * @type {Boolean}
     * @name cyclic
     * @default false
     * @memberof GranularEngine
     * @instance
     */
    cyclic: boolean;
    /**
     * Portion at the end of the audio buffer that has been copied from the
     * beginning to assure cyclic behavior
     *
     * @type {Number}
     * @name wrapAroundExtension
     * @default 0
     * @memberof GranularEngine
     * @instance
     */
    wrapAroundExtension: number;
    /**
     * Get buffer duration (excluding wrapAroundExtension)
     *
     * @type {Number}
     * @name bufferDuration
     * @memberof GranularEngine
     * @instance
     * @readonly
     */
    get bufferDuration(): number;
    /**
     * Current position
     *
     * @type {Number}
     * @name currentPosition
     * @memberof GranularEngine
     * @instance
     * @readonly
     */
    get currentPosition(): number;
    advanceTime(time: number): number;
    /**
     * Trigger a grain. This function can be called at any time (whether the
     * engine is scheduled or not) to generate a single grain according to the
     * current grain parameters.
     *
     * @param {Number} time - grain synthesis audio time
     * @return {Number} - period to next grain
     */
    trigger(time: number): number;
}
import AudioTimeEngine from "../core/AudioTimeEngine";
//# sourceMappingURL=GranularEngine.d.ts.map
