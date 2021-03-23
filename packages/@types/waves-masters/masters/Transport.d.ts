export default Transport;
/**
 * Provides position-based scheduling of TimeEngine instances.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-masters/master/examples/transport/index.html}
 *
 *
 * @param {Object} scheduler - instance of Scheduler
 *
 * @example
 * import masters from 'waves-masters';
 *
 * const getTimeFunction = () => {
 *   const now = process.hrtime();
 *   return now[0] + now[1] * 1e-9;
 * }
 * const scheduler = new masters.Scheduler(getTimeFunction);
 * const transport = new masters.Transport(scheduler);
 * const playControl = new masters.PlayControl(scheduler, transport);
 * const myEngine = new MyEngine();
 * const yourEngine = new yourEngine();
 *
 * transport.add(myEngine);
 * transport.add(yourEngine);
 *
 * playControl.start();
 */
declare class Transport extends TimeEngine {
    constructor(scheduler: any, options?: undefined);
    __engines: any[];
    __transported: any[];
    __scheduler: any;
    __schedulerHook: TransportSchedulerHook;
    __transportedQueue: PriorityQueue;
    __schedulingQueue: TransportSchedulingQueue;
    __time: number;
    __position: number;
    __speed: number;
    __getTimeAtPosition(position: any): number;
    __getPositionAtTime(time: any): number;
    __syncTransportedPosition(time: any, position: any, speed: any): number;
    __syncTransportedSpeed(time: any, position: any, speed: any): void;
    /**
     * Implementation of the transported time engine interface.
     *
     * @param {Number} time
     * @param {Number} position
     * @param {Number} speed
     */
    syncPosition(time: number, position: number, speed: number): number;
    /**
     * Implementation of the transported time engine interface.
     *
     * @param {Number} time
     * @param {Number} position
     * @param {Number} speed
     */
    advancePosition(time: number, position: number, speed: number): number;
    /**
     * Implementation of the transported time engine interface.
     *
     * @param {Number} time
     * @param {Number} position
     * @param {Number} speed
     * @param {Boolean} [seek=false]
     */
    syncSpeed(time: number, position: number, speed: number, seek?: boolean): void;
    /**
     * Add a time engine to the transport.
     *
     * @param {Object} engine - engine to be added to the transport
     * @param {Number} position - start position
     */
    add(engine: TimeEngine, startPosition?: number, endPosition?: number, offsetPosition?: number): TransportedTransported | TransportedSpeedControlled | TransportedScheduled;
    /**
     * Remove a time engine from the transport.
     *
     * @param {object} engineOrTransported - engine or transported to be removed from the transport
     */
    remove(engineOrTransported: TimeEngine | Transported): void;
    /**
     * Reset position of the given engine.
     *
     * @param {TimeEngine} transported - Engine to reset
     * @param {Number} position - New position
     */
    resetEnginePosition(transported: Transported, position?: number): void;
    /**
     * Remove all time engines from the transport.
     */
    clear(): void;
}
import TimeEngine from "../core/TimeEngine.js";
declare class TransportSchedulerHook extends TimeEngine {
    constructor(transport: any);
    __transport: any;
    __nextPosition: number;
    __nextTime: number;
    advanceTime(time: any): any;
    destroy(): void;
}
import PriorityQueue from "../core/PriorityQueue.js";
declare class TransportSchedulingQueue extends SchedulingQueue {
    constructor(transport: any);
    __transport: any;
    destroy(): void;
}
declare class TransportedTransported extends Transported {
    constructor(transport: any, engine: any, startPosition: any, endPosition: any, offsetPosition: any);
    resetEnginePosition(engine: any, position?: any): void;
}
declare class TransportedSpeedControlled extends Transported {
    constructor(transport: any, engine: any, startPosition: any, endPosition: any, offsetPosition: any);
}
declare class TransportedScheduled extends Transported {
    constructor(transport: any, engine: any, startPosition: any, endPosition: any, offsetPosition: any);
}
import SchedulingQueue from "../core/SchedulingQueue.js";
declare class Transported extends TimeEngine {
    constructor(transport: any, engine: any, start: any, duration: any, offset: any, stretch?: number);
    __engine: any;
    __startPosition: any;
    __endPosition: any;
    __offsetPosition: any;
    __stretchPosition: number;
    __isRunning: boolean;
    setBoundaries(start: any, duration: any, offset?: number, stretch?: number): void;
    start(time: any, position: any, speed: any): void;
    stop(time: any, position: any): void;
    syncPosition(time: any, position: any, speed: any): any;
    advancePosition(time: any, position: any, speed: any): any;
    syncSpeed(time: any, position: any, speed: any): void;
    destroy(): void;
}
//# sourceMappingURL=Transport.d.ts.map
