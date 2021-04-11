import { useCallback, useEffect, useMemo, useState } from 'react';
import audioContext from '../audio-context';
// import { AudioBufferLoader } from 'waves-loaders';
import { usePromise } from './use-promise';
import { AudioBufferLoader, ProgressCallback, LoaderProgressEvent } from 'waves-loaders';
// class AudioBufferLoader {
//     async load(urls: string[]): Promise<AudioBuffer[]>;
//     async load(url: string): Promise<AudioBuffer>;
//     async load(url: string | string[]) {
//         if (url instanceof Array) {
//             return Promise.all(url.map(p => this.load(p)));
//         }
//         const response = await fetch(url);
//         const arrayBuffer = await response.arrayBuffer();
//         const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
//         return audioBuffer;
//     }

// }
// const loader = new AudioBufferLoader();
// const callbacks = new Set<ProgressCallback>();
// loader.onProgress(e => {
//     for (const cb of callbacks) {
//         cb(e);
//     }
// });
export function useAudioBufferLoader(onProgress?: ProgressCallback): AudioBufferLoader {
    const loader = useMemo(() => {
        const loader = new AudioBufferLoader();
        loader.setAudioContext(audioContext);
        return loader;
    }, []);

    useEffect(() => {
        loader.progressCallback = onProgress;
        return () => {
            loader.progressCallback = undefined;
        };
    }, [loader, onProgress]);

    return loader;
}
interface A {
    (url: string[]): [AudioBuffer[], LoaderProgressEvent];
    (url: string): [AudioBuffer | undefined, LoaderProgressEvent];
}
// export function useAudioBuffer(url: string[]): [AudioBuffer[], LoaderProgressEvent];
// export function useAudioBuffer(url: string): [AudioBuffer | undefined, LoaderProgressEvent];
export const useAudioBuffer: A = function (url: any): [(undefined | AudioBuffer) | AudioBuffer[], LoaderProgressEvent] {

    const [progress, setProgress] = useState<Parameters<ProgressCallback>[0]>({ loaded: 0, value: 0, total: Infinity });

    const loader = useAudioBufferLoader(setProgress);

    // const [result, setResult] = useState<AudioBuffer>();
    // useEffect(() => {
    //     loader.load(url).then(setResult);
    // }, [url]); // eslint-disable-line react-hooks/exhaustive-deps -- we don't want to reload the buffer just if we got a new loader instance... it would load the same buffer. Only rerun the effect if the url changes

    // return result;

    const promise = useMemo(() => loader.load(url), [url]);  // eslint-disable-line react-hooks/exhaustive-deps -- we don't need a new promise if only the loader changed... it would return an equivalent promise. only recompute if url changes.
    return [usePromise(promise, Array.isArray(url) ? [] : undefined), progress];// as const;


    // const [result, setResult] = useState<AudioBuffer | typeof defaultValue>(defaultValue);
    // useEffect(() => {
    //     loader.load(url).then(setResult);
    // }, [url]);

    // return result;
} as any
