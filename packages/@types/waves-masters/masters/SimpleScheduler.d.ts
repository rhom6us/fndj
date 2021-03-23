export default SimpleScheduler;
/**
 * @private
 *
 * The SimpleScheduler class implements a simplified master for time engines
 * (see TimeEngine) that implement the scheduled interface
 * such as the Metronome and the GranularEngine. The API and funtionalities of
 * the SimpleScheduler class are identical to the Scheduler class. But, other
 * than the Scheduler, the SimpleScheduler class does not guarantee the order
 * of events (i.e. calls to the advanceTime method of scheduled time engines
 * and to scheduled callback functions) within a scheduling period (see period
 * attribute).
 *
 * {@link https://rawgit.com/wavesjs/waves-masters/master/examples/scheduler/index.html}
 *
 * @param {Function} getTimeFunction - Function that must return a time in second.
 * @param {Object} [options={}] - default options
 * @param {Number} [options.period=0.025] - period of the scheduler.
 * @param {Number} [options.lookahead=0.1] - lookahead of the scheduler.
 *
 * @see TimeEngine
 * @see Scheduler
 *
 * @example
 * import * as masters from 'waves-masters';
 *
 * const getTimeFunction = () => preformance.now() / 1000;
 * const scheduler = new masters.SimpleScheduler(getTimeFunction);
 *
 * scheduler.add(myEngine);
 */
declare class SimpleScheduler {
    constructor(getTimeFunction: any, options?: {});
    getTimeFunction: any;
    __engines: Set<any>;
    __schedEngines: any[];
    __schedTimes: any[];
    __currentTime: any;
    __timeout: number;
    /**
     * scheduler (setTimeout) period
     * @type {Number}
     * @name period
     * @memberof SimpleScheduler
     * @instance
     */
    period: number;
    /**
     * scheduler lookahead time (> period)
     * @type {Number}
     * @name lookahead
     * @memberof SimpleScheduler
     * @instance
     */
    lookahead: number;
    _currentTimeToAudioTimeFunction: any;
    __scheduleEngine(engine: any, time: any): void;
    __rescheduleEngine(engine: any, time: any): void;
    __unscheduleEngine(engine: any): void;
    __resetTick(): void;
    __tick(): void;
    /**
     * Scheduler current logical time.
     *
     * @name currentTime
     * @type {Number}
     * @memberof SimpleScheduler
     * @instance
     */
    get currentTime(): number;
    /**
     * Scheduler current audio time according to `currentTime`
     *
     * @name audioTime
     * @type {Number}
     * @memberof SimpleScheduler
     * @instance
     */
    get audioTime(): number;
    get currentPosition(): any;
    /**
     * Defer the execution of a function at a given time.
     *
     * @param {Function} fun - Function to defer
     * @param {Number} [time=this.currentTime] - Schedule time
     */
    defer(fun: Function, time?: number): void;
    /**
     * Add a TimeEngine function to the scheduler at an optionally given time.
     *
     * @param {TimeEngine} engine - Engine to add to the scheduler
     * @param {Number} [time=this.currentTime] - Schedule time
     */
    add(engine: TimeEngine, time?: number): void;
    /**
     * Remove a TimeEngine from the scheduler that has been added to the
     * scheduler using the add method.
     *
     * @param {TimeEngine} engine - Engine to remove from the scheduler
     * @param {Number} [time=this.currentTime] - Schedule time
     */
    remove(engine: TimeEngine): void;
    /**
     * Reschedule a scheduled time engine at a given time.
     *
     * @param {TimeEngine} engine - Engine to reschedule
     * @param {Number} time - Schedule time
     */
    resetEngineTime(engine: TimeEngine, time?: number): void;
    /**
     * Check whether a given engine is scheduled.
     *
     * @param {TimeEngine} engine - Engine to check
     */
    has(engine: TimeEngine): boolean;
    /**
     * Remove all engines from the scheduler.
     */
    clear(): void;
}
import TimeEngine from "../core/TimeEngine.js";
//# sourceMappingURL=SimpleScheduler.d.ts.map