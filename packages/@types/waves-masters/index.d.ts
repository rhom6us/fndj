
import _TimeEngine from "./core/TimeEngine.js";
import _PriorityQueue from "./core/PriorityQueue.js";
import _SchedulingQueue from "./core/SchedulingQueue.js";
import _PlayControl from "./masters/PlayControl.js";
import _Transport from "./masters/Transport.js";
import _Scheduler from "./masters/Scheduler.js";
import _SimpleScheduler from "./masters/SimpleScheduler.js";

declare module "waves-masters" {
    namespace _default {
        export { _TimeEngine as TimeEngine };
        export { _PriorityQueue as PriorityQueue };
        export { _SchedulingQueue as SchedulingQueue };
        export { _PlayControl as PlayControl };
        export { _Transport as Transport };
        export { _Scheduler as Scheduler };
        export { _SimpleScheduler as SimpleScheduler };
    }
    export const TimeEngine: typeof _TimeEngine;
    export const PriorityQueue: typeof _PriorityQueue;
    export const SchedulingQueue: typeof _SchedulingQueue;
    export const PlayControl: typeof _PlayControl;
    export const Transport: typeof _Transport;
    export const Scheduler: typeof _Scheduler;
    export const SimpleScheduler: typeof _SimpleScheduler;
    //# sourceMappingURL=index.d.ts.map

}
