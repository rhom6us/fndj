import { useCallback } from 'react';
import audioContext from '../audio-context';
// import { AudioBufferLoader } from 'waves-loaders';
import { usePromise } from './use-promise';

class AudioBufferLoader {
    async load(urls: string[]): Promise<AudioBuffer[]>;
    async load(url: string): Promise<AudioBuffer>;
    async load(url: string | string[]) {
        if (url instanceof Array) {
            return Promise.all(url.map(p => this.load(p)));
        }
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }
}
const loader = new AudioBufferLoader();

export function useAudioBuffer(url: string, defaultValue = undefined): AudioBuffer | typeof defaultValue {

    return usePromise(useCallback(() => loader.load(url), [url]), defaultValue, [url]);


    // const [result, setResult] = useState<AudioBuffer | typeof defaultValue>(defaultValue);
    // useEffect(() => {
    //     loader.load(url).then(setResult);
    // }, [url]);

    // return result;
}

export function useAudioBuffers(url: string[]): AudioBuffer[] {
    return usePromise(() => loader.load(url), [], [url]);
    // const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
    // useEffect(() => {
    //     loader.load(url).then(setBuffers);
    // }, [url]);
    // return buffers;
}
