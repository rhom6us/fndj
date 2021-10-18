import { useAsyncMemo } from '@rhombus/react';
import { isArray } from '@rhombus/type-guards';
import { useEffect, useMemo, useState } from 'react';
import { AudioBufferLoader, LoaderProgressEvent, ProgressCallback } from 'waves-loaders';
import audioContext from '../audio-context';
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

export function useAudioBuffer(url: string[]): readonly [AudioBuffer[], LoaderProgressEvent];
export function useAudioBuffer(url: string): readonly [undefined|AudioBuffer, LoaderProgressEvent];
export function useAudioBuffer(url: any): readonly [undefined|AudioBuffer|AudioBuffer[], LoaderProgressEvent] {

    const [progress, setProgress] = useState<Parameters<ProgressCallback>[0]>({ loaded: 0, value: 0, total: Infinity });

    const loader = useAudioBufferLoader(setProgress);

    const defaultValue = isArray(url) ? ([] as AudioBuffer[]) : undefined;
    // we don't need a new promise if only the loader changed... it would return an equivalent promise. only recompute if url changes.
    return [
        useAsyncMemo(() => loader.load(url), defaultValue, [url]),
        progress
    ] as const;


    // const [result, setResult] = useState<AudioBuffer | typeof defaultValue>(defaultValue);
    // useEffect(() => {
    //     loader.load(url).then(setResult);
    // }, [url]);

    // return result;
};
