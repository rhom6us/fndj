/* eslint-disable react/prop-types */
import { logger, range } from '@fndj/util';
import React, { ChangeEventHandler, HTMLAttributes, useCallback } from 'react';
interface Props {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
};


export const NumberChooser: React.FC<Props & Omit<HTMLAttributes<HTMLElement>, keyof Props>> = ({ value, min, max, step, onChange, ...rest }) => {
    function getIncrement(power: number) {
        return Math.sign(power) * step * 10 ** Math.abs(power);
    }
    const update = useCallback((newVal: number) => {
        const newVal2 = Math.min(newVal, max);
        const newVal3 = Math.max(newVal2, min);
        onChange(newVal3);
        logger.log('update', { newVal, newVal2, newVal3, max, min });
    }, [min, max]);
    const incr = useCallback((step: number) => {
        // const inc = getIncrement(power)
        return () => {
            logger.log('incr', { value, step, inc: value + step });

            update(value + step);
        };
    }, [value]);

    function IncrButton({ step, scale, value }: { step: number, scale: number, value: number; }) {
        return (
            <button key={step * scale} onClick={() => update(value + step * scale)} disabled={value + step * scale < min || value + step * scale > max}>{(step * scale).toFixed(2)/*getIncrement(i)/*.toFixed(-i)*/}</button>
        );
    }
    return (
        <number-chooser {...rest}>
            {/* range(-5, 6).map(i => <button key={i} onClick={incr(i)}>{getIncrement(i).toFixed(-i)}</button>)} */}
            <IncrButton scale={-100} {...{ step, value }} />
            <IncrButton scale={-10} {...{ step, value }} />
            <IncrButton scale={-1} {...{ step, value }} />
            <input type="text" value={value} onChange={e => onChange(+e.target.value)} />
            {/* <input type="number" value={value.toFixed(precision)} onChange={e => onChange(+e.target.value)} {...{ step, min, max }} /> */}
            {/* <IncrButton scale={1} {...{ step, value }} />
            <IncrButton scale={10} {...{ step, value }} />
            <IncrButton scale={100} {...{ step, value }} /> */}
            {/* <IncrButton i={step} disabled={value + step * 1 > max} />
            <IncrButton i={step * 10} disabled={value + step * 10 > max} />
            <IncrButton i={step * 100} disabled={value + step * 100 > max} /> */}
            <button onClick={() => update(value + step * 1)} disabled={value + step * 1 > max} >{(step * 1).toFixed(2)}</button>
            <button onClick={() => update(value + step * 10)} disabled={value + step * 10 > max} >{(step * 10).toFixed(2)}</button>
            <button onClick={() => update(value + step * 100)} disabled={value + step * 100 > max} >{(step * 100).toFixed(2)}</button>
        </number-chooser>
    );
};
