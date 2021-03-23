/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useAudioBuffer } from '../hooks/use-audio-buffer';
import metadata from './metadata.json';
import { RenderElement } from './render-element';


export const PreProcess: React.FC = () => {
    // const [trackIndex] = useState(0);
    const buffer = useAudioBuffer('https://raw.githubusercontent.com/wavesjs/waves-blocks/master/examples/simple-audio-player/assets/audio/hendrix.wav');
    const el = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const w = el.current?.getBoundingClientRect().width;
        console.log('setting width', w);
        if (!w)
            return;
        setWidth(w);
    }, [el]);
    const data = useMemo(() => buffer?.getChannelData(0) || [], [buffer]);
    const leftChannel = useMemo(() => Array.from(data).filter((_, i) => i % Math.floor(data.length / width) == 0) || [], [data, width]);
    useEffect(() => {
        console.log('lc len', leftChannel.length);
        console.log('w len', width);
        console.log('data len', data.length);
        const ratio = Math.floor(data.length / width);
        console.log('ratio', ratio);
        console.log('mod len', Array.from(data).filter((_, i) => i % ratio == 0).length);
    }, [buffer, leftChannel, data, width]);
    // console.log(buffer?.length, buffer?.getChannelData(0).length, buffer?.getChannelData(0).buffer.byteLength);


    const style = {
        backgroundColor: 'gray'
    };
    const linetos = useMemo(() => Array.from(leftChannel).map((y, x) => `L${x},${y}`).join(''), [leftChannel]);
    const path = useMemo(() => `M0,0${linetos}`, [linetos]);
    const [offset, setOffset] = useState(0);
    // requestAnimationFrame(function shift() {
    //     setOffset(p => p + 1);
    //     requestAnimationFrame(shift);
    // })
    return (
        <article>
            <h1>{offset}</h1>
            <svg ref={el} style={style} width={CSS.vw(100).toString()} height="400px" viewBox={`${offset},-1,${width/1},2`} preserveAspectRatio="none">
                <path stroke="black" fill="gray" strokeWidth={.5} strokeLinecap="round" strokeLinejoin="round" d={path} />

            </svg>
        </article>
    );
};
