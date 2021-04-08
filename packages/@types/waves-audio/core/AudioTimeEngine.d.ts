import { TimeEngine } from 'waves-masters';

/**
 * This is the base class for all audio related time engine components. It is
 * used to handle audio related events such as the playback of a media stream.
 * It extends the TimeEngine class by the standard web audio node methods
 * connect and disconnect.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-audio/master/examples/audio-time-engine/index.html}
 *
 * @extends TimeEngine
 * @example
 * import audio from 'waves-aydui';
 *
 * class MyEngine extends audio.AudioTimeEngine {
 *   constructor() {
 *     super();
 *     // ...
 *   }
 * }
 */
export default class AudioTimeEngine extends TimeEngine {
    constructor(audioContext?: AudioContext);
    /**
     * Audio context used by the TimeEngine, default to the global audioContext
     *
     * @name audioContext
     * @type AudioContext
     * @memberof AudioTimeEngine
     * @see audioContext
     */
    audioContext: AudioContext;
    /**
     * Output audio node. By default the connect method connects a given node
     * to this output node.
     *
     * @name outputNode
     * @type AudioNode
     * @memberof AudioTimeEngine
     * @default null
     */
    outputNode: AudioNode;
    /**
     * Connect to an audio node (e.g. audioContext.destination)
     *
     * @param {AudioNode} target - Target audio node
     */
    connect(target: AudioNode): AudioTimeEngine;
    /**
     * Disconnect from an audio node (e.g. audioContext.destination). If undefined
     * disconnect from all target nodes.
     *
     * @param {AudioNode} target - Target audio node.
     */
    disconnect(connection: AudioNode): AudioTimeEngine;
}
//# sourceMappingURL=AudioTimeEngine.d.ts.map
