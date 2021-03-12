export default SchedulingQueue;
/**
 * @private
 *
 * @class SchedulingQueue
 * @extends TimeEngine
 */
declare class SchedulingQueue extends TimeEngine {
    __queue: PriorityQueue;
    __engines: Set<any>;
    advanceTime(time: any, audioTime: any, dt: any): number;
    defer(fun: any, time?: number): void;
    add(engine: any, time?: number): void;
    remove(engine: any): void;
    resetEngineTime(engine: any, time?: number): void;
    has(engine: any): boolean;
    clear(): void;
}
import TimeEngine from "./TimeEngine.js";
import PriorityQueue from "./PriorityQueue.js";
//# sourceMappingURL=SchedulingQueue.d.ts.map