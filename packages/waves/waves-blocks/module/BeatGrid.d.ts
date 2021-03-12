export default BeatGrid;
declare class BeatGrid extends AbstractModule {
    constructor(options?: {
        downbeatColor?: string,
        upbeatColor?: string;
    });
    _beats: any;
    setTrack(_: any, metadata: { beats: Array<{ time: number; measure: boolean; }>; }): void;
    /**
     * shift the beats with certain dt
     */
    shift(dt: number): void;
}
import AbstractModule from "../core/AbstractModule";
//# sourceMappingURL=BeatGrid.d.ts.map
