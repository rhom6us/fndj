import { ITimeEngine, Time, Position } from './intrensics';

/**
 * Allows for synchronizing an engine to a position (i.e. media playback time) that can run forward and backward and jump as it is provided by the Transport master.
 */

declare interface ITransported extends ITimeEngine {
    /**
     * called whenever engine has to (re)synchromize the engine's position, for example when the egine:
     * - (re)starts playback
     * - jumps to an arbitraty position
     * - reverses playback direction)
     * @param time
     * @param position
     * @param speed
     * @returns the first event position
     */
    syncPosition(time: Time, position: Position, speed: number): Position;

    /**
     * Called by the master (i.e. Transport) when when the engine's event position is reached (the result of this function or SyncPosition)
     * @param time
     * @param position
     * @param speed
     * @returns the next event position
     */
    advancePosition(time: Time, position: Position, speed: number): Position;

    /**
     * Resets the next event position
     * @param position Optional, defaults to current master time. Pass Infinity to suspend the egine without it being removed from the master
     */
    resetPosition(position?: Position): void;
}
