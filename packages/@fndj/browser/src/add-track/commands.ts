import { ThunkDispatch } from '@rhombus/redux-command-pattern/src/utils';
import { events, State, WaveformState } from './reducers';
import { analyze } from './services/analyze';
import { download, search } from './services/youtube';
const ctx = new AudioContext();

export const commandImplementation = {
    addTrack: {
        async *search(state: State, term: string) {
            yield events.search.started(term);
            const result = await search(term);
            yield events.search.completed(term, result ?? []);
        },
        selectResult(state: State, videoId: string) {
            return events.search.resultSelected(videoId);
        },
        goBack(state: State) {
            if ('download' in state && state.download?.state !== 'complete') {
                state.download.ctrl.abort();
            }
            return events.search.wentBack();
        },
        async *download(state: State, id: string) {
            const ctrl = new AbortController();
            yield events.download.started(ctrl);

            const response = await download(id);

            ctrl.signal.addEventListener('abort', () => {
                response.cancel();
            });
            yield (dispatch: ThunkDispatch) => {
                let wait = false;
                response.progress.addEventListener('progress', e => {
                    if (!wait && e.loaded < (e.total ?? Infinity)) {
                        dispatch(events.download.progress(e.loaded, e.total));
                        wait = true;
                        setTimeout(() => wait = false, 1000);
                    }
                }, { signal: ctrl.signal, capture: false, passive: true });
            };
            const buffer = await response.arrayBuffer();
            ctrl.abort();
            yield events.download.complete(buffer);
        },
        async *analyze(state: State) {
            if (!('download' in state) || state.download?.state !== 'complete') {
                throw 'wtf mate?';
            }
            yield events.analyze.decodingStarted();
            const audioBuffer = await ctx.decodeAudioData(state.download.buffer);
            yield events.analyze.analysisStarted();
            const results = analyze(audioBuffer);
            yield events.analyze.analysisCompleted(results);
        },
        generateWaveform(state:State, waveFormData: WaveformState['waveFormData']) {
            return events.analyze.waveformsStarted(waveFormData);
        }
    }
};
