/* eslint-disable no-console */
import { logger } from '@fndj/util';
import { range } from '@fndj/util/src/array';
import React, { memo, SVGAttributes, useMemo } from 'react';

interface Props extends SVGAttributes<SVGElement> {
    buffer: Float32Array;
    duration: number;
    sampleRate: number;
    width: number;
    offset: number;
}

export const WaveForm: React.FC<Props> = ({ buffer, duration, offset, sampleRate, width, ...rest }: Props) => {
    const source = useMemo(() => {
        const startSample = Math.round(offset * sampleRate);
        const result = buffer.subarray(startSample, startSample + Math.round(duration * sampleRate));
        // logger.log('duration', { offset, secs: duration, samples: result.length });
        return result;
    }, [buffer, duration, offset, sampleRate]);
    const samplesPerPixel = useMemo(() => {
        const samplesPerPixel = (source.length / width);
        // logger.log('width', { px: width, samplesPerPixel });
        return samplesPerPixel;
    }, [source.length, width]);
    const path = useMemo(() => {
        logger.log('updating path...');
        const path = '' + range(width)
            .map(px => {
                const startSample = Math.floor(px * samplesPerPixel);
                const minX = startSample;// + 10 * sampleRate;
                const maxX = minX + samplesPerPixel;
                // get one pixel worth of samples
                const extract = source.subarray(minX, maxX);
                // logger.log({ ex: extract.length, buf: buffer.length });
                if (!extract.length) {
                    return { px, min: 0, max: 0 };
                }
                const min = extract.reduce((a, b) => Math.min(a, b));
                const max = extract.reduce((a, b) => Math.max(a, b));

                // if (!min) {
                //     min = max;
                // }

                const result = { px, min, max };
                // logger.log(result);
                return result;
            })
            .filter(p => p.min || p.max)
            .map(p => `L${p.px},${(p.min)}L${p.px},${(p.max)}`)
            .concat(`L${width},0L0,0`)
            .join()
            .replace(/^L/, 'M');
        logger.log('done');
        return path;
    }, [width, samplesPerPixel, source]);

    const style = {
        backgroundColor: 'gray'
    };
    return (
        <article>
            <h1>hi</h1>
            <svg {...rest} style={style} width={CSS.vw(100).toString()} height={CSS.px(400).toString()} viewBox={`2.0,-2.0,${width},4`} preserveAspectRatio="none">
                {!isNaN(duration) && <path fill="yellow" shapeRendering="crispEdges" d={path} />}
            </svg>
        </article>
    );
};

// export const WaveForm = memo(WF);
