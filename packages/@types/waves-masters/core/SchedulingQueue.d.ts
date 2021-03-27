export default SchedulingQueue;
/**
 * @private
 *
 * @class SchedulingQueue
 * @extends TimeEngine
 */
declare class SchedulingQueue extends TimeEngine implements IScheduled {
    private __queue: PriorityQueue;
    private __engines: Set<IScheduled>;
    advanceTime(time: Time): Time;
    advanceTime(time: Time, audioTime: Time, dt: any): Time;
    defer(fun: any, time?: Time): void;
    add(callback: (time: Time) => Time, time?: Time): void;
    add(engine: IScheduled, time?: Time): void;
    remove(engine: IScheduled): void;
    resetEngineTime(engine: IScheduled, time?: Time): void;
    has(engine: IScheduled): boolean;
    clear(): void;
}
import TimeEngine from "./TimeEngine.js";
import PriorityQueue from "./PriorityQueue.js";
import { Time } from './intrensics';
import { IScheduled } from './IScheduled';
//# sourceMappingURL=SchedulingQueue.d.ts.map
