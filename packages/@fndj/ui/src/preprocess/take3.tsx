import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Prep } from '@fndj/core';
import { useAudioBuffer } from '../hooks';
import { Waveform } from '../waves';
import { FlexBox, FlexItem } from "react-styled-flex";
import PropTypes from 'prop-types';
import { Slider } from '../general';
import styled from 'styled-components';
import { invert } from '../react-helpers';
import { useRef } from 'react';
import { analyze, Superpowered } from './services';
import { SuperpoweredBuffer } from '@fndj/superpowered';
interface Props { }

const [R, G, B, A] = [0, 1, 2, 3];

function toJS(buffer: SuperpoweredBuffer<any>, length: number) {
    return new Uint8Array(Superpowered.copyWASMToArrayBuffer(buffer.pointer, length));
    return new Float32Array(Superpowered.linearMemory, buffer.pointer, length / 4);
}

export const PreProcess = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [buffer, bufferLoadProgress] = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');


    useLayoutEffect(() => {
        if (!buffer) return;

        const anal = "anal" as unknown as any;
        // return;

        const analysis = analyze(buffer);
        const rowLength = analysis!.waveformSize;
        const lows = toJS(analysis.spectrum.low, rowLength);
        const mids = toJS(analysis.spectrum.mid, rowLength);
        const highs = toJS(analysis.spectrum.high, rowLength);
        const peaks = toJS(analysis.peakWaveform, rowLength);
        const avg = toJS(analysis.averageWaveform, rowLength);
        console.log({ analysis, lows });
        window[anal] = analysis as any;;

        const ctx = canvasRef.current!.getContext("2d");
        // canvasRef.current!.style.width = rowLength + 'px';

        const imageData = new ImageData(rowLength, 255);
        function drawColumn(index: number, values: ArrayLike<number>, color: (value: number) => [number, number, number]) {
            const value = values[index];
            const col = color(value);
            for (let j = 255; j > (255 - value); j--) {
                const p = rowLength * 4 * j + index * 4;
                imageData.data[p + R] = col[R];//peaks[i];
                imageData.data[p + G] = col[G];// analysis.spectrum.mid[i];
                imageData.data[p + B] = col[B];//analysis.spectrum.high[i];
                imageData.data[p + A] = 120;
            }
        }
        for (let i = 0; i < rowLength; i++) {
            drawColumn(i, lows, p => [p, 0, 0]);
            drawColumn(i, avg, p => [0, p, 0]);
            // const amplitude = peaks[i];// analysis.averageWaveform[i];
            // for (let j = 255; j > (255 - amplitude); j--) {
            //     const p = rowLength * 4 * j + i * 4;
            //     imageData.data[p + R] = 255;//peaks[i];
            //     // imageData.data[p + G] = 0;// analysis.spectrum.mid[i];
            //     // imageData.data[p + B] = 0;//analysis.spectrum.high[i];
            //     imageData.data[p + A] = 255;
            // }

            // const columnBase = i * 4;
            // for (j = columnBase; j < imageData.data.length; j += )



        }


        ctx!.putImageData(imageData, 0, 0);
        console.log(imageData);

    }, [buffer]);

    return (<div style={{ overflowX: 'scroll', backgroundColor: 'gray' }}>
        <canvas id="fncvs" style={{ height: 255, width: CSS.vw(100).toString() }} ref={canvasRef} />
    </div>);
};
