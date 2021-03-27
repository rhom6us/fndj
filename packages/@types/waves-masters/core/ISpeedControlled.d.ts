import type { ITimeEngine, Time, Position } from './intrensics';

/**
 * Allows fotr syncrhronizing an engine that is neither driven through the scheduled nor the transported interface.
 * Allows in particular to synchromize engines that assure their own scheduling to the event-based scheduled and transported engines (.e.g audio player, ascillator).
 */
declare interface ISpeedControlled extends ITimeEngine {
    /**
     * Called by the master whenever the playback speed changes or the position jumps arbitarily (i.e. on a seek)
     * @param time
     * @param position
     * @param speed
     * @param seek
     */
    syncSpeed(time: Time, position: Position, speed: number, seek?: boolean): void;
}
