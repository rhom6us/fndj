export abstract class Loader {
  constructor(responseType: /*'text' | */'arraybuffer' /*| 'blob' | 'document' | 'json'*/);
  private readonly responseType: 'text' | 'arraybuffer' | 'blob' | 'document' | 'json';
  private progressCb?: unknown;
  /**
    * Method for a promise based file loading.
    * Internally switch between loadOne and loadAll.
    * @public
    * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
    * @returns {Promise}
    */
  load(fileURLs: string): Promise<any>;
  load(fileUrls: string[]): Promise<any[]>;

  get progressCallback(): (event: { value: number; loaded: number; total: number; }) => void;
  /**
    * Set the callback function to get the progress of file loading process.
    * This is only for the file loading progress as decodeAudioData doesn't
    * expose a decode progress value.
    * @type {function} callback - The callback that handles the response.
    */
  set progressCallback(callback);

  /**
    * Alternative API to set the progress callback.
    * @type {function} callback - The callback that handles the response.
    */
  onProgress(callback: Loader['progressCallback']): void;

}

export class AudioBufferLoader extends Loader {
  constructor();

  /**
    * Allow to set the audio context that should be used in order to decode
    * the file and create the AudioBuffer.
    * @param {BaseAudioContext} audioContext
    */
  setAudioContext(audioContext: BaseAudioContext): void;

  /**
* Method for promise audio file loading and decoding.
* @param {(string|string[])} fileURLs - The URL(s) of the audio files to load.
*  Accepts a URL pointing to the file location or an array of URLs.
* @param {{wrapAroundExtension: number}} [options] - Object with a
*  wrapAroundExtension key which set the length, in seconds to be copied from
*  the begining at the end of the returned AudioBuffer
* @returns {Promise}
*/
  load(fileURLs: string, options?: { wrapAroundExtension: number; }): Promise<AudioBuffer>;
  load(fileURLs: string[], options?: { wrapAroundExtension: number; }): Promise<AudioBuffer[]>;



}
/**
 * SuperLoader
 * Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
 */
export class SuperLoader extends AudioBufferLoader {
  /**
   * Use composition to setup appropriate file loaders
   */
  constructor();
}
