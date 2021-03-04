export default PlayControl;
/**
 * Extends Time Engine to provide playback control of a Time Engine instance.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-audio/master/examples/play-control/index.html}
 *
 * @extends TimeEngine
 * @param {TimeEngine} engine - engine to control
 *
 * @example
 * import * as audio from 'waves-masters';
 * const playerEngine = audio.PlayerEngine();
 * const playControl = new audio.PlayControl(playerEngine);
 *
 * playControl.start();
 */
import { PlayControl as PlayControlMaster } from 'waves-masters';
declare class PlayControl extends PlayControlMaster {
    constructor(engine: any, options?: undefined);
    audioContext: any;
}
//# sourceMappingURL=PlayControl.d.ts.map
