// import * as asdf from 'redux-command-pattern';
// import { ReducerFn } from 'redux-command-pattern';

// export type PreProcessState = {
//     playbackTime: number;
//     playbackPosition: number;
//     playbackOffst: number;
// };
// export type RootState = {
//     preprocess: PreProcessState;
// };

// export const defaultState: PreProcessState = {
//     playbackPosition: 0,
//     playbackOffst: 0,
//     playbackTime: 0,
// };

// type FnReducer<T = void> = ReducerFn<RootState, T>;


// export const positionAdvanced: FnReducer<number> = (state, payload) => ({
//     ...state,
//     preprocess: {
//         ...state.preprocess,
//         playbackPosition: payload
//     },
// });
// export const timeAdvanced: FnReducer<number> = (state, payload) => ({
//     ...state,
//     preprocess: {
//         ...state.preprocess,
//         playbackTime: payload
//     },
// });

// export const offsetUpdated: FnReducer<number> = (state, payload) => ({
//     ...state,
//     preprocess: {
//         ...state.preprocess,
//         playbackOffst: payload
//     },
// });
