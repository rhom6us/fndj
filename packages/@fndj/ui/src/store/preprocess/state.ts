
export interface TrackInfo {
    buffer: AudioBuffer;
    sampleRate: number;
}
export interface State {
    track?: TrackInfo;
    seek: number;
    trim: number;
    bpm: number;
}
export const defaultState: State = {
    seek: 0,
    trim: 0,
    bpm: 128,
};
