/* eslint-disable @typescript-eslint/ban-types */
export default Block;

type Options = {
    container: string | Element;
    player: typeof AbstractPlayer;
} & ({
    sizing: 'auto';
} | {
    sizing: 'manual';
    width: number;
    height: number;
});

/**
 * Base audio-visual player to be decorated with additionnal modules.
 *
 * @param {Object} options - Override default configuration (no options for now)
 * @param {String|Element} [options.container] - Css Selector or DOM Element that will
 *  host the player and additionnal modules
 * @param {AbstractPlayer} - The player to be used by the block.
 * @param {'auto'|'manual'} [options.sizing='auto'] - How the size of the block
 *  should be defined. If 'auto', the block adjusts to the size of the container.
 *  If 'manual', use `width` and `height` parameters.
 * @param {Number} [options.width=null] - Width of the block if size is 'manual'.
 * @param {Number} [options.height=null] - Height of the block if size is 'manual'.
 *
 * @example
 * ```
 * const $container = document.querySelector('#container');
 * const defaultWidth = 1000;
 * const defaultHeight = 1000;
 * const block = new blocks.core.Block({
 *   player: abc.player.SeekPlayer,
 *   container: $container,
 *   sizing: 'manual', // if 'auto', adjust to fill $container size
 *   width: defaultWidth,
 *   height: defaultHeight,
 * });
 *
 * const waveformModule = new blocks.module.WaveformModule();
 * const cursorModule = new blocks.module.CursorModule();
 *
 * block.add(simpleWaveformModule);
 * block.add(cursorModule);
 * ```
 */
declare class Block {
    constructor(options: Options);
    params: Readonly<Options>;
    EVENTS: {
        START: string;
        PAUSE: string;
        STOP: string;
        SEEK: string;
        ENDED: string;
        CURRENT_POSITION: string;
        UPDATE: string;
    };
    // _trackData: any;
    // _trackMetadata: any;
    // _listeners: Map<any, any>;
    // _modules: any[];
    // _isPlaying: boolean;
    ui: UI;
    player: AbstractPlayer;
    // _history: History;
    /**
     * Watch the current position of the player in a request animation frame loop.
     * @private
     */
    private _monitorPosition;
    /**
     * Main event listener of the waves-ui timeline.
     * @private
     */
    private _onEvent;
    /**
     * Add a listener to a specific channel of the player.
     * Available events are:
     * - `'start'`: triggered when the player starts
     * - `'pause'`: triggered when the player is paused
     * - `'stop'` : triggered when the player is stopped (pause() + seek(0))
     * - `'seek'` : triggered when the player seek to a new position
     * - `'ended'`: triggered when the player stops at the end of the file (or at
     *              the end of the last segment). The callback is executed with the
     *              stop position.
     * - `'position'`: triggered at each request animation frame with the current
     *              position and duration of the audio file. Trigger only when
     *              the player is playing.
     *
     * @param {String} channel - Name of the channel
     * @param {Function} callback - Function to execute
     */
    addListener(channel: string, callback: Function): void;
    /**
     * Remove a listener from a channel.
     *
     * @param {String} channel - Name of the channel
     * @param {Function} callback - Function to remove
     */
    removeListener(channel: string, callback: Function): void;
    /**
     * Remove all subscibers from a channel.
     *
     * @param {String} channel - Name of the channel.
     */
    removeAllListeners(channel: string): void;
    /**
     * Execute all subscribers of a event with given arguments.
     * @private
     */
    private emit;
    /**
     * Add a module to the player. A module is defined as a specific set
     * of functionnality and visualizations on top of the player.
     * Module can implement features such as waveform, moving cursor, etc.
     *
     * @param {AbstractModule} module - Module to add
     * @param {Number} zIndex - zIndex of the added module
     */
    add(module: any, zIndex?: number): void;
    /**
     * Remove a module from the player.
     *
     * @param {AbstractModule} module - Module to remove
     */
    remove(module: any): void;
    /**
     * Execute a command on each module that implements the method. The command
     * are executed in the order in which modules were added to the player.
     * @private
     */
    private _executeCommandForward;
    /**
     * Execute a command on each module that implements the method. The command
     * are executed in the reverse order in which modules were added to the player.
     * @private
     */
    private _executeCommandBackward;
    /**
     * Set or change the track of the player. A track is a JSON object that must
     * follow the convention defined ??
     *
     * @param {Object} data - data buffer (i.e. AudioBuffer)
     * @param {Object} metadata - metadata object
     */
    setTrack(data: any, metadata: any): void;
    /**
     * Set or change the track of the player. A track is a JSON object that must
     * follow the convention defined ??
     * @private
     *
     * @param {Object} data - data buffer (i.e. AudioBuffer)
     * @param {Object} metadata - metadata object
     * @param {Boolean} resetHistory - reset history
     */
    private _setTrack;
    /**
     * @todo - review all history algorithm
     */
    /**
     * Create a snapshot of the data after modifications. Should be used in
     * modules after each significant operation, in order to allow `undo` and
     * `redo` operations.
     */
    snap(): void;
    /**
     * Go to previous snapshot.
     */
    undo(): void;
    /**
     * Go to next snapshot.
     */
    redo(): void;
    /**
     * @todo - define if it's really the proper way to go...
     */
    get metadata(): any;
    /**
     * Width of the player. Defaults to the width of the given container.
     *
     * @name width
     * @type {Number}
     * @instance
     */
    set width(arg: any);
    get width(): any;
    /**
     * Height of the player. Defaults to the height of the given container.
     *
     * @name height
     * @type {Number}
     * @instance
     */
    set height(arg: any);
    get height(): any;
    /**
     * Does this make sens ?
     * @private
     */
    render(): void;
    update(): void;
    /**
     * Position of the head in the audio file.
     *
     * @name position
     * @type {Number}
     * @instance
     * @readonly
     */
    get position(): number;
    /**
     * Duration of the current audio file.
     *
     * @name duration
     * @type {Number}
     * @instance
     * @readonly
     */
    get duration(): number;
    /**
     * Volume of the audio (in dB).
     *
     * @param {Number} db - volume of the player in decibels
     */
    volume(db: number): void;
    /**
     * Start the player.
     */
    start(): void;
    // _monitorPositionRafId: number;
    /**
     * Stop the player (shortcut for `pause` and `seek` to 0).
     */
    stop(): void;
    /**
     * Pause the player.
     */
    pause(): void;
    /**
     * Seek to a new position in the audio file.
     *
     * @param {Number} position - New position.
     */
    seek(position: number): void;
    /**
     * Emit the current position.
     * Shortcut for `this.emit('position', position, duration)`
     */
    emitPosition(position: any): void;
    /**
   * Emit the `ended` event.
   */
    ended(position: any): void;
}
declare class UI {
    constructor($container: HTMLElement, sizing: any, width: any, height: any);
    $container: HTMLElement;
    _width: any;
    _height: any;
    timeline: any;
    track: any;
    timeContext: any;
    set height(arg: any);
    get height(): any;
    set width(arg: any);
    get width(): any;
}
import type AbstractPlayer from './AbstractPlayer';
import History from "../utils/History";
//# sourceMappingURL=Block.d.ts.map
