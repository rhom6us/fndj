export default AbstractPlayer;
/**
 * Abstract interface that should be implemented by any `block` player.
 *
 * @param {Object} block - The block instance that instanciate and consume the player
 */
declare class AbstractPlayer {
    constructor(block: any);
    block: any;
    /**
     * Return the current position of the player.
     * @type Number
     * @readonly
     */
     get position(): number;
    /**
     * Return the duration of the audio buffer.
     * @type Number
     * @readonly
     */
     get duration(): number;
    /**
     * Return the duration of the audio buffer.
     * @type Boolean
     * @readonly
     */
     get running(): boolean;
    /**
     * Set the volume of the player
     * @param {Number} gain - volume [0, 1]
     */
    set gain(arg: number);
    get gain(): number;
    /**
     * Set the player's audio buffer.
     * @param {AudioBuffer} buffer - audio buffer to read
     */
    setBuffer(buffer: AudioBuffer): void;
    /**
     * Start the player.
     */
    start(): void;
    /**
     * Pause the player.
     */
    pause(): void;
    /**
     * Stop the player.
     */
    stop(): void;
    /**
     * Seek to the given position in the buffer.
     * @param {Number} position - position in second at which the player should jump
     */
    seek(position: number): void;
    /**
     * Callback executed in the requestAnimationFrame loop that allow to hook
     * and/or override the generic behavior of the player.
     */
    monitorPosition(): void;
}
//# sourceMappingURL=AbstractPlayer.d.ts.map
