import { useCallback } from 'react';
import { AudioBufferLoader } from 'waves-loaders';
import { usePromise } from './use-promise';

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
