import { ReducerFn } from 'redux-command-pattern';
import { FnState } from '../state';
import { Reducer } from 'redux';
type FnReducer<T extends any> = ReducerFn<FnState, T>;
export const trackSet: FnReducer<[buffer: AudioBuffer, sampleRate: number]> = (state, buffer, sampleRate) => ({
    ...state,
    preprocess: {
        ...state.preprocess,
        track: {
            buffer,
            sampleRate
        }
    },
});
export const trackInfoUpdated: FnReducer<Partial<{ seek: number; trim: number; bpm: number; }>> = (state, payload) => {
    return {
        ...state,
        preprocess: {
            ...state.preprocess,
            ...payload
        }
    };
};
