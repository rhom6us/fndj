import { State as PreProcessState, defaultState as defaultPreProcessState } from './preprocess';
export interface FnState {
    preprocess: PreProcessState;
}

export const defaultState: FnState = {
    preprocess: defaultPreProcessState,
};
