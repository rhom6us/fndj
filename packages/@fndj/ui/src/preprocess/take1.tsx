/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useClientRect } from '../hooks';
import { useAudioBuffer } from '../hooks/use-audio-buffer';
import metadata from './metadata.json';
import { NumberChooser } from './number-chooser';
import { RenderElement } from './render-element';
import { WaveForm } from './Waveform';

import { Prep } from '@fndj/core';
export const PreProcess: React.FC = () => {
    return (<div>noop</div>);
    // // const [trackIndex] = useState(0);
    // const buffer = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');
    // const [{ height, width }, el] = useClientRect();
    // const prep = useMemo(() => new Prep('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3'), []);
    // const [tempo, setTempo] = useState(prep.tempo);
    // useEffect(() => {
    //     logger.log({ height, width });
    // }, [height, width]);
    // useEffect(() => {
    //     prep.tempo = ((tempo));
    // }, [prep, tempo]);
    // useEffect(() => {
    //     if (buffer) {
    //         prep.buffer = buffer;
    //     }
    // }, [buffer, prep]);

    // const data = useMemo(() => buffer?.getChannelData(0) || new Float32Array(0), [buffer]);
    // const effectiveSampleRate = useMemo(() => (buffer?.sampleRate ?? 0) / (buffer?.numberOfChannels ?? 1), [buffer]);
    // logger.log({ effectiveSampleRate });
    // const trackDuration = useMemo(() => buffer?.duration ?? 0, [buffer]);// data.length / effectiveSampleRate, [data.length, effectiveSampleRate]);
    // const [duration, setDuration] = useState(100);
    // const [offset, setOffset] = useState(0);
    // const [phase, setPhase] = useState(0);
    // useEffect(() => {
    //     prep.metronomeOffset = phase;
    // }, [prep, phase]);
    // const offsetStep = useMemo(() => trackDuration * duration / 10000, [duration, width]);
    // // useEffect(() => setDuration(trackDuration), [trackDuration]);
    // logger.log({ trackDuration, duration });

    // const blockStyle = {
    //     display: 'block'
    // };
    // const togglePlayback = useCallback(() => {
    //     if (prep.isPlaying) {
    //         prep.pause();
    //     } else {
    //         prep.seek(61);
    //         prep.play();
    //     }
    // }, [prep, prep.isPlaying]);
    // const toggleText = useMemo(() => prep.isPlaying ? 'pause' : 'play', [prep, prep.isPlaying]);
    // return (
    //     <div ref={el} style={{ width: CSS.vw(100).toString() }}>
    //         <input type="number" value={tempo} onChange={e => setTempo(+e.target.value ?? 128)} />
    //         {!buffer && <i>loading...</i> || <>
    //             <label>viewing: {(trackDuration * duration / 100).toFixed(2)}s ({offset.toFixed(2)}-{(offset + trackDuration * duration / 100).toFixed(2)})
    //                 {width && <WaveForm buffer={data} duration={trackDuration * duration / 100} offset={offset} width={width} sampleRate={buffer!.sampleRate} />}
    //             </label>
    //             <NumberChooser style={blockStyle} min={1} max={100} step={.1} value={duration} onChange={setDuration} />
    //             <label>offset
    //             <NumberChooser style={blockStyle} min={0} max={trackDuration * (1 - duration / 100)} step={offsetStep} value={offset} onChange={setOffset} />
    //             </label>
    //             <i>offsetMax {trackDuration * (1 - duration / 100)}</i>
    //             <div>
    //                 <button onClick={() => togglePlayback()}>{toggleText}</button>
    //                 <NumberChooser style={blockStyle} min={0} max={1} step={.001} value={phase} onChange={setPhase} />
    //             </div>
    //         </>
    //         }
    //     </div>
    // );
};
