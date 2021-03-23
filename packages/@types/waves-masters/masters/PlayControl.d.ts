export default PlayControl;
/**
 * Extends Time Engine to provide playback control of a Time Engine instance.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-masters/master/examples/transport/index.html}
 *
 * @extends TimeEngine
 * @param {Object} scheduler - instance of Scheduler
 * @param {TimeEngine} engine - engine to control
 *
 * @example
 * import masters from 'waves-masters';
 *
 * const getTimeFunction = () => {
 *   const now = process.hrtime();
 *   return now[0] + now[1] * 1e-9;
 * }
 * const scheduler = new masters.Scheduler(getTimeFunction);
 * const playerEngine = new MyTimeEngine();
 * const playControl = new masters.PlayControl(scheduler, playerEngine);
 *
 * playControl.start();
 */
declare class PlayControl extends TimeEngine {
    constructor(scheduler: any, engine: any, options?: any);
    // __scheduler: any;
    // __playControlled: PlayControlledSpeedControlled | PlayControlledTransported | PlayControlledScheduled;
    // __loopControl: LoopControl;
    // __loopStart: number;
    // __loopEnd: number;
    // __time: number;
    // __position: number;
    // __speed: number;
    // __playingSpeed: number;
    // __setEngine(engine: any): void;
    // __resetEngine(): void;
    /**
     * Calculate/extrapolate playing time for given position
     *
     * @param {Number} position position
     * @return {Number} extrapolated time
     * @private
     */
    private __getTimeAtPosition;
    /**
     * Calculate/extrapolate playing position for given time
     *
     * @param {Number} time time
     * @return {Number} extrapolated position
     * @private
     */
    private __getPositionAtTime;
    __sync(): number;
    /**
     * Returns if the play control is running.
     *
     * @name running
     * @type {Boolean}
     * @memberof PlayControl
     * @instance
     * @readonly
     */
    readonly  running: boolean;
    set(engine?: any): void;
    /**
     * Sets the play control loop behavior.
     *
     * @type {Boolean}
     * @name loop
     * @memberof PlayControl
     * @instance
     */
    set loop(arg: boolean);
    get loop(): boolean;
    /**
     * Sets loop start and end time.
     *
     * @param {Number} loopStart - loop start value.
     * @param {Number} loopEnd - loop end value.
     */
    setLoopBoundaries(loopStart: number, loopEnd: number): void;
    /**
     * Sets loop start value
     *
     * @type {Number}
     * @name loopStart
     * @memberof PlayControl
     * @instance
     */
    set loopStart(arg: number);
    get loopStart(): number;
    /**
     * Sets loop end value
     *
     * @type {Number}
     * @name loopEnd
     * @memberof PlayControl
     * @instance
     */
    set loopEnd(arg: number);
    get loopEnd(): number;
    syncSpeed(time: any, position: any, speed: any, seek?: boolean): void;
    /**
     * Starts playback
     */
    start(): void;
    /**
     * Pauses playback and stays at the same position.
     */
    pause(): void;
    /**
     * Stops playback and seeks to initial (0) position.
     */
    stop(): void;
    /**
     * If speed if provided, sets the playback speed. The speed value should
     * be non-zero between -16 and -1/16 or between 1/16 and 16.
     *
     * @type {Number}
     * @name speed
     * @memberof PlayControl
     * @instance
     */
    set speed(arg: number);
    get speed(): number;
    /**
     * Set (jump to) playing position.
     *
     * @param {Number} position target position
     */
    seek(position: number): void;
}
import TimeEngine from "../core/TimeEngine.js";
declare class PlayControlledSpeedControlled extends PlayControlled {
}
declare class PlayControlledTransported extends PlayControlled {
    __schedulerHook: PlayControlledSchedulerHook;
    resetEnginePosition(engine: any, position?: any): void;
}
declare class PlayControlledScheduled extends PlayControlled {
    __schedulingQueue: PlayControlledSchedulingQueue;
}
declare class LoopControl extends TimeEngine {
    constructor(playControl: any);
    __playControl: any;
    speed: number;
    lower: number;
    upper: number;
    advanceTime(time: any): any;
    reschedule(speed: any): void;
    applyLoopBoundaries(position: any, speed: any): any;
}
declare class PlayControlled {
    constructor(playControl: any, engine: any);
    __playControl: any;
    __engine: any;
    syncSpeed(time: any, position: any, speed: any, seek: any, lastSpeed: any): void;
    get currentTime(): any;
    get audioTime(): any;
    get currentPosition(): any;
    destroy(): void;
}
declare class PlayControlledSchedulerHook extends TimeEngine {
    constructor(playControl: any, engine: any);
    __playControl: any;
    __engine: any;
    __nextPosition: number;
    advanceTime(time: any): any;
    destroy(): void;
}
declare class PlayControlledSchedulingQueue extends SchedulingQueue {
    constructor(playControl: any, engine: any);
    __playControl: any;
    __engine: any;
    destroy(): void;
}
import SchedulingQueue from "../core/SchedulingQueue.js";
//# sourceMappingURL=PlayControl.d.ts.map
