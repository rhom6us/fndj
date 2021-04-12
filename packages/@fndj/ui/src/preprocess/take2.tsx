import React, { useEffect, useMemo, useState } from 'react';
import { Prep } from '@fndj/core';
import { useAudioBuffer } from '../hooks';
import { Waveform } from '../waves';
import { useLayoutEffect } from 'react';
import { logger, enableLogging } from '@fndj/util';

interface Props { }

export const PreProcess = () => {
    const [buffer, bufferLoadProgress] = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');
    const prep = useMemo(() => new Prep(), []);
    const [tempo, setTempo] = useState(prep.tempo);
    const [trackStart, setTrackStart] = useState(0 * (60 / tempo) * 4);

    useEffect(() => {
        prep.tempo = ((tempo));
    }, [prep, tempo]);
    useEffect(() => {
        if (buffer) {
            prep.buffer = buffer;
        }
    }, [buffer, prep]);

    return (
        <article>
            {!buffer && <span>loading...</span>}
            {buffer && <div>
                <h1>we made it</h1>
                {isFinite(bufferLoadProgress.total) && (<strong>{bufferLoadProgress.loaded}/{ bufferLoadProgress.total} ({ bufferLoadProgress.value})</strong>)}
                <Waveform buffer={buffer} bpm={tempo} trackStart={trackStart} trackStartChanged={setTrackStart} />
            </div>}
        </article>
    );
};
