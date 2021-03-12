import { useState, useEffect, useMemo } from 'react';
import { SuperLoader } from 'waves-loaders';
import { usePromise } from './use-promise';

const loader = new SuperLoader();

export function useAudioBuffer(url: string, defaultValue = undefined): AudioBuffer | typeof defaultValue {
    const [result, setResult] = useState<AudioBuffer | typeof defaultValue>(defaultValue);
    useEffect(() => {
        loader.load(url).then(setResult);
    }, [url]);

    return result;
}

export function useAudioBuffers(url: string[]): AudioBuffer[] {
    const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
    useEffect(() => {
        loader.load(url).then(setBuffers);
    }, [url]);
    return buffers;
}
