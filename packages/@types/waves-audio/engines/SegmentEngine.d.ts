export default SegmentEngine;
/**
 * Used with a buffer to serve audio files via granular synthesis.
 *
 * The engine implements the "scheduled" and "transported" interfaces.
 * When "scheduled", the engine  generates segments more or less periodically
 * (controlled by the periodAbs, periodRel, and perioVar attributes).
 * When "transported", the engine generates segments at the position of their onset time.
 *
 * Example that shows a `SegmentEngine` with a few parameter controls running in a `Scheduler`.
 * {@link https://rawgit.com/wavesjs/waves-audio/master/examples/segment-engine/index.html}
 *
 * @extends AudioTimeEngine
 * @example
 * import * as audio from 'waves-audio';
 * const scheduler = audio.getScheduler();
 * const segmentEngine = new audio.SegmentEngine();
 *
 * scheduler.add(segmentEngine);
 *
 * @param {Object} [options={}] - Default options
 * @param {AudioBuffer} [options.buffer=null] - Audio buffer
 * @param {Number} [options.periodAbs=0] - Absolute segment period in sec
 * @param {Number} [options.periodRel=1] - Segment period relative to inter-segment distance
 * @param {Number} [options.periodVar=0] - Amout of random segment period variation relative
 *  to segment period
 * @param {Number} [options.periodMin=0.001] - Minimum segment period
 * @param {Number} [options.positionArray=[0.0]] - Array of segment positions (onset times
 *  in audio buffer) in sec
 * @param {Number} [options.positionVar=0] - Amout of random segment position variation in sec
 * @param {Number} [options.durationArray=[0.0]] - Array of segment durations in sec
 * @param {Number} [options.durationAbs=0] - Absolute segment duration in sec
 * @param {Number} [options.durationRel=1] - Segment duration relative to given segment
 *  duration or inter-segment distance
 * @param {Array} [options.offsetArray=[0.0]] - Array of segment offsets in sec
 * @param {Number} [options.offsetAbs=-0.005] - Absolute segment offset in sec
 * @param {Number} [options.offsetRel=0] - Segment offset relative to segment duration
 * @param {Number} [options.delay=0.005] - Time by which all segments are delayed (especially
 *  to realize segment offsets)
 * @param {Number} [options.attackAbs=0.005] - Absolute attack time in sec
 * @param {Number} [options.attackRel=0] - Attack time relative to segment duration
 * @param {Number} [options.releaseAbs=0.005] - Absolute release time in sec
 * @param {Number} [options.releaseRel=0] - Release time relative to segment duration
 * @param {Number} [options.resampling=0] - Segment resampling in cent
 * @param {Number} [options.resamplingVar=0] - Amout of random resampling variation in cent
 * @param {Number} [options.gain=1] - Linear gain factor
 * @param {Number} [options.abortTime=0.005] - fade-out time when aborted
 * @param {Number} [options.segmentIndex=0] - Index of the segment to synthesize (i.e. of
 *  this.positionArray/durationArray/offsetArray)
 * @param {Bool} [options.cyclic=false] - Whether the audio buffer and segment indices are
 *  considered as cyclic
 * @param {Number} [options.wrapAroundExtension=0] - Portion at the end of the audio buffer
 *  that has been copied from the beginning to assure cyclic behavior
 */
declare class SegmentEngine extends AudioTimeEngine {
    constructor(options?: {
        audioContext?: BaseAudioContext,
        buffer?: AudioBuffer,
        periodAbs?: number,
        periodRel?: number,
        periodVar?: number,
        periodMin?: number,
        positionArray?: number,
        positionVar?: number,
        durationArray?: number,
        durationAbs?: number,
        durationRel?: number,
        offsetArray?: number[],
        offsetAbs?: number,
        offsetRel?: number,
        delay?: number,
        attackAbs?: number,
        attackRel?: number,
        releaseAbs?: number,
        releaseRel?: number,
        resampling?: number,
        resamplingVar?: number,
        gain?: number,
        abortTime?: number,
        segmentIndex?: number,
        cyclic?: boolean,
        wrapAroundExtension?: number,
    });
    /**
     * Audio buffer
     * @name buffer
     * @type {AudioBuffer}
     * @default null
     * @memberof SegmentEngine
     * @instance
     */
    buffer: AudioBuffer;
    /**
     * Absolute segment period in sec
     * @name periodAbs
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    periodAbs: number;
    /**
     * Segment period relative to inter-segment distance
     * @name periodRel
     * @type {Number}
     * @default 1
     * @memberof SegmentEngine
     * @instance
     */
    periodRel: number;
    /**
     * Amout of random segment period variation relative to segment period
     * @name periodVar
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    periodVar: number;
    /**
     * Minimum segment period
     * @name periodMin
     * @type {Number}
     * @default 0.001
     * @memberof SegmentEngine
     * @instance
     */
    periodMin: number;
    /**
     * Array of segment positions (onset times in audio buffer) in sec
     * @name positionArray
     * @type {Number}
     * @default [0.0]
     * @memberof SegmentEngine
     * @instance
     */
    positionArray: number;
    /**
     * Amout of random segment position variation in sec
     * @name positionVar
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    positionVar: number;
    /**
     * Array of segment durations in sec
     * @name durationArray
     * @type {Number}
     * @default [0.0]
     * @memberof SegmentEngine
     * @instance
     */
    durationArray: number;
    /**
     * Absolute segment duration in sec
     * @name durationAbs
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    durationAbs: number;
    /**
     * Segment duration relative to given segment duration or inter-segment distance
     * @name durationRel
     * @type {Number}
     * @default 1
     * @memberof SegmentEngine
     * @instance
     */
    durationRel: number;
    /**
     * Array of segment offsets in sec
     *
     * offset > 0: the segment's reference position is after the given segment position
     * offset < 0: the given segment position is the segment's reference position
     * and the duration has to be corrected by the offset
     *
     * @name offsetArray
     * @type {Array}
     * @default [0.0]
     * @memberof SegmentEngine
     * @instance
     */
    offsetArray: number[];
    /**
     * Absolute segment offset in sec
     * @name offsetAbs
     * @type {Number}
     * @default -0.005
     * @memberof SegmentEngine
     * @instance
     */
    offsetAbs: number;
    /**
     * Segment offset relative to segment duration
     * @name offsetRel
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    offsetRel: number;
    /**
     * Time by which all segments are delayed (especially to realize segment offsets)
     * @name delay
     * @type {Number}
     * @default 0.005
     * @memberof SegmentEngine
     * @instance
     */
    delay: number;
    /**
     * Absolute attack time in sec
     * @name attackAbs
     * @type {Number}
     * @default 0.005
     * @memberof SegmentEngine
     * @instance
     */
    attackAbs: number;
    /**
     * Attack time relative to segment duration
     * @name attackRel
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    attackRel: number;
    /**
     * Absolute release time in sec
     * @name releaseAbs
     * @type {Number}
     * @default 0.005
     * @memberof SegmentEngine
     * @instance
     */
    releaseAbs: number;
    /**
     * Release time relative to segment duration
     * @name releaseRel
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    releaseRel: number;
    /**
     * Segment resampling in cent
     * @name resampling
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    resampling: number;
    /**
     * Amout of random resampling variation in cent
     * @name resamplingVar
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    resamplingVar: number;
    /**
     * Linear gain factor
     * @name gain
     * @type {Number}
     * @default 1
     * @memberof SegmentEngine
     * @instance
     */
    gain: number;
    /**
     * Index of the segment to synthesize (i.e. of this.positionArray/durationArray/offsetArray)
     * @name segmentIndex
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    segmentIndex: number;
    /**
     * Whether the audio buffer and segment indices are considered as cyclic
     * @name cyclic
     * @type {Bool}
     * @default false
     * @memberof SegmentEngine
     * @instance
     */
    cyclic: any;
    __cyclicOffset: number;
    /**
     * Whether the last segment is aborted when triggering the next
     * @name monophonic
     * @type {Number}
     * @default false
     * @memberof SegmentEngine
     * @instance
     */
    private monophonic: number;
    private __currentSrc: AudioBufferSourceNode;
    private __currentEnv: GainNode;
    private __releaseStartTime: number;
    private __currentGain: number;
    private __currentEndTime: number;
    /**
     * Fade-out time (when aborted)
     * @name abortTime
     * @type {Number}
     * @default 0.005
     * @memberof SegmentEngine
     * @instance
     */
    abortTime: number;
    /**
     * Portion at the end of the audio buffer that has been copied from the beginning to assure cyclic behavior
     * @name wrapAroundExtension
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    wrapAroundExtension: number;
    /**
     * Get buffer duration (excluding wrapAroundExtension)
     *
     * @type {Number}
     * @default 0
     * @memberof SegmentEngine
     * @instance
     */
    get bufferDuration(): number;
    advanceTime(time: number): number;
    syncPosition(time: number, position: number, speed: number): number;
    advancePosition(time: number, position: number, speed: number): number;
    /**
     * Trigger a segment.
     * This function can be called at any time (whether the engine is scheduled/transported or not)
     * to generate a single segment according to the current segment parameters.
     *
     * @param {Number} time segment synthesis audio time
     * @return {Number} period to next segment
     */
    trigger(time: number): number;
    /**
     * Abort the current segment at given time, fade out duration
     *
     * @param {Number} time - abort time
     */
    abort(time: number): void;
}
import AudioTimeEngine from "../core/AudioTimeEngine";
//# sourceMappingURL=SegmentEngine.d.ts.map
