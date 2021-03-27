export default Scheduler;
/**
 * The `Scheduler` class implements a master for `TimeEngine` instances
 * that implement the *scheduled* interface. The scheduled interface allows for
 * synchronizing an engine to a monotonous time as it is provided by the given
 * `getTimeFunction`.
 *
 * The class is based on recursive calls to `setTimeout` and uses the time
 * returned by the `getTimeFunction` passed as first argument as a logical time
 * passed to the `advanceTime` methods of the scheduled engines or to the
 * scheduled callback functions.
 * It extends the `SchedulingQueue` class that itself includes a `PriorityQueue`
 * to assure the order of the scheduled engines (see `SimpleScheduler` for a
 * simplified scheduler implementation without `PriorityQueue`).
 *
 * An object implementing the *scheduled* interface MUST implement the
 * `advanceTime` method and CAN implement the `resetTime` method.
 *
 * ###### `advanceTime(time :Number) -> {Number}`
 *
 * The `advanceTime` method has to be implemented by an `TimeEngine` as part of the
 * scheduled interface. The method is called by the master (e.g. the scheduler).
 * It generates an event and to returns the time of the next event (i.e. the next
 * call of advanceTime). The returned time has to be greater than the time
 * received as argument of the method. In case that a TimeEngine has to generate
 * multiple events at the same time, the engine has to implement its own loop
 * while(event.time <= time) and return the time of the next event (if any).
 *
 * ###### `resetTime(time=undefined :Number)`
 *
 * The `resetTime` method is provided by the `TimeEngine` base class. An engine may
 * call this method to reset its next event time (e.g. when a parameter is
 * changed that influences the engine's temporal behavior). When no argument
 * is given, the time is reset to the current master time. When calling the
 * method with Infinity the engine is suspended without being removed from the
 * master.
 *
 * {@link https://rawgit.com/wavesjs/waves-masters/master/examples/scheduler/index.html}
 *
 * @param {Function} getTimeFunction - Function that must return a time in second.
 * @param {Object} [options={}] - default options.
 * @param {Number} [options.period=0.025] - period of the scheduler.
 * @param {Number} [options.lookahead=0.1] - lookahead of the scheduler.
 * @param {Number} [options.currentTimeToAudioTimeFunction=t => t] - convertion function
 *  from `currentTime` to `audioTime`. Defaults to identity function.
 *
 * @see TimeEngine
 *
 * @example
 * import { Scheduler } from 'waves-masters';
 *
 * const getTime = () => new Date().getTime() / 1000;
 * const scheduler = new Scheduler(getTime);
 *
 * const myEngine = {
 *   advanceTime(currentTime) {
 *     console.log(currentTime);
 *     // ask to be called in 1 second
 *     return time + 1;
 *   }
 * }
 *
 * const startTime = Math.ceil(getTime());
 * scheduler.add(myEngine, startTime);
 */
declare class Scheduler extends SchedulingQueue {
    constructor(getTimeFunction: () => Time, { period, lookahead, currentTimeToAudioTimeFunction, }?: {
        period?: number;
        lookahead?: number;
        currentTimeToAudioTimeFunction?: (t: any) => any;
    });
    getTimeFunction: any;
    // __currentTime: number;
    // __nextTime: number;
    // __timeout: number;
    /**
     * scheduler (setTimeout) period
     * @type {Number}
     * @name period
     * @memberof Scheduler
     * @instance
     */
    period: number;
    /**
     * scheduler lookahead time (> period)
     * @type {Number}
     * @name lookahead
     * @memberof Scheduler
     * @instance
     */
    lookahead: number;
    // _currentTimeToAudioTimeFunction: (t: any) => any;
    /**
     * An object implementing the *scheduled* interface (called `engine`) to the
     * scheduler at an optionally given time.
     *
     * The `advanceTime` method of the engine added to a scheduler will be called
     * at the given time and with the given time as argument. The `advanceTime`
     * method can return a new scheduling time (i.e. the next time when it will
     * be called) or it can return Infinity to suspend scheduling without removing
     * the function from the scheduler. A function that does not return a value
     * (or returns null or 0) is removed from the scheduler and cannot be used as
     * argument of the methods `remove` and `resetEngineTime` anymore.
     *
     * @name add
     * @function
     * @memberof Scheduler
     * @instance
     * @param {TimeEngine|Function} engine - Engine to add to the scheduler
     * @param {Number} [time=this.currentTime] - Engine start time
     */
    /**
     * Remove an engine implementing the *scheduled* interface that has been
     * added to the scheduler using the `add` method from the scheduler.
     *
     * @name remove
     * @function
     * @memberof Scheduler
     * @instance
     * @param {TimeEngine} engine - Engine to remove from the scheduler
     * @param {Number} [time=this.currentTime] - Schedule time
     */
    /**
     * Reschedule a scheduled an engine implementing the *scheduled* interface at
     * a given time.
     *
     * @name resetEngineTime
     * @function
     * @memberof Scheduler
     * @instance
     * @param {TimeEngine} engine - Engine to reschedule
     * @param {Number} time - Schedule time
     */
    /**
     * Remove all scheduled engines from the scheduler.
     *
     * @name clear
     * @function
     * @memberof Scheduler
     * @instance
     */
    /** @private */
    // #tick;
}
import { Time } from '../core/intrensics';
import SchedulingQueue from "../core/SchedulingQueue.js";
//# sourceMappingURL=Scheduler.d.ts.map
