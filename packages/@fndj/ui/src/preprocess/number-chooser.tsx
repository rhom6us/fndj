/* eslint-disable react/prop-types */
import { range } from '@fndj/util';
import React, { ChangeEventHandler, HTMLAttributes } from 'react';
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
    function incr(power: number) {
        const inc = getIncrement(power)
        return () => {
            const newValue = Math.min(max, Math.max(min, value + inc));
            onChange(newValue);
        };
    }
    return (
        <number-chooser {...rest}>
            {range(-5, 6).map(i => <button key={i} onClick={incr(i)}>{getIncrement(i).toFixed(-i)}</button>)}
            {/* <button onClick={incr(-5)}>-100</button>
            <button onClick={incr(-4)}>-10</button>
            <button onClick={incr(-3)}>-1</button>
            <button onClick={incr(-2)}>-0.1</button>
            <button onClick={incr(-1)}>-0.01</button>
            <button onClick={incr(-0.1)}>{getIncrement(-0.1)}</button> */}
            <input type="text" value={value.toFixed(Math.abs(Math.floor(Math.log10(step))))} onChange={e => onChange(+e.target.value)} />
            {/* <input type="number" value={value.toFixed(precision)} onChange={e => onChange(+e.target.value)} {...{ step, min, max }} /> */}
            <button onClick={incr(.1)}>&gt;</button>
            <button onClick={incr(1)}>&gt;&gt;</button>
            <button onClick={incr(2)}>&gt;&gt;&gt;</button>
        </number-chooser>
    );
};
