/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useClientRect } from '../hooks';
import { useAudioBuffer } from '../hooks/use-audio-buffer';
import metadata from './metadata.json';
import { NumberChooser } from './number-chooser';
import { RenderElement } from './render-element';
import { WaveForm } from './Waveform';


export const PreProcess: React.FC = () => {
    // const [trackIndex] = useState(0);
    const buffer = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');
    const [{ height, width }, el] = useClientRect();

    useEffect(() => {
        console.log({ height, width });
    }, [height, width]);

    // useEffect(() => {
    //     if (!el.current) {
    //         console.info('no el, bailing.');
    //         return;
    //     }
    //     console.info('el ready');
    //     const widthText = getComputedStyle(el.current!).width;
    //     const widthObj = CSSUnitValue.parse(widthText);
    //     if (widthObj.unit !== 'px') {
    //         throw 'oh shit';
    //     }
    //     const px = widthObj.value;
    //     // const w = el.current?.getBoundingClientRect().width;
    //     console.log('setting width', px);
    //     if (!px)
    //         return;
    //     setWidth(px);
    // }, [el.current]);

    // const leftChannel = useMemo(() => Array.from(data).filter((_, i) => i % Math.floor(data.length / width) == 0) || [], [data, width]);
    // useEffect(() => {
    //     console.log('lc len', leftChannel.length);
    //     console.log('w len', width);
    //     console.log('data len', data.length);
    //     const ratio = Math.floor(data.length / width);
    //     console.log('ratio', ratio);
    //     console.log('mod len', Array.from(data).filter((_, i) => i % ratio == 0).length);
    // }, [buffer, leftChannel, data, width]);
    // // console.log(buffer?.length, buffer?.getChannelData(0).length, buffer?.getChannelData(0).buffer.byteLength);


    // const style = {
    //     backgroundColor: 'gray'
    // };
    // const linetos = useMemo(() => Array.from(leftChannel).map((y, x) => `L${x},${y}`).join(''), [leftChannel]);
    // const path = useMemo(() => `M0,0${linetos}`, [linetos]);

    // requestAnimationFrame(function shift() {
    //     setOffset(p => p + 1);
    //     requestAnimationFrame(shift);
    // })
    const data = useMemo(() => buffer?.getChannelData(0) || new Float32Array(0), [buffer]);
    const effectiveSampleRate = useMemo(() => (buffer?.sampleRate ?? 0) / (buffer?.numberOfChannels ?? 1), [buffer]);
    console.log({ effectiveSampleRate });
    const trackDuration = useMemo(() => data.length / effectiveSampleRate, [data.length, effectiveSampleRate]);
    const [duration, setDuration] = useState(trackDuration);
    const [offset, setOffset] = useState(0);
    const offsetStep = useMemo(() => duration / width, [duration, width]);
    useEffect(() => setDuration(trackDuration), [trackDuration]);
    console.log({ trackDuration, duration });

    const blockStyle = {
        display: 'block'
    };
    return (
        <div ref={el} style={{ width: CSS.vw(100).toString() }}>
            {!buffer && <i>loading...</i> || <>

                {width && <WaveForm buffer={data} duration={duration} offset={offset} width={width} sampleRate={effectiveSampleRate} />}

                <NumberChooser style={blockStyle} min={.001} max={trackDuration} step={.001} value={duration} onChange={setDuration} />
                <NumberChooser style={blockStyle} min={0} max={trackDuration - duration} step={offsetStep} value={offset} onChange={setOffset} />
                <i>offsetStep {offsetStep}</i>
            </>
            }
        </div>
    );
};
