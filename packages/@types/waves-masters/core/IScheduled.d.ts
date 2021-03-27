import type { ITimeEngine, Time } from './intrensics';

/**
 * Allows for synchromizing an engine to a monotonous time as it is provided by the Scheduler master
 */

declare interface IScheduled extends ITimeEngine {
    /**
     * Called by the master (i.e. Scheduler) when when the engine's event time is reached (the result of this function or SyncTime)
     * @param time
     */
    advanceTime(time: Time): Time;

    /**
     * An engine may call this method to reset its next ervent time (e.g. when a paramter is changed that influences the engine's temporal behavior) that can run forward and backward and jump as it
     * @param time Optional, defaults to current master time. Pass Infinity to suspend the egine without it being removed from the master
     */
    resetTime(time?: Time): void;
}
