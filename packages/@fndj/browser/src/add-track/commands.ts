import { audioContext as ctx } from '@rhombus/audio-context';
import { Sub } from "@rhombus/func";
import { CommandResult, ThunkDispatch } from "@rhombus/redux-command-pattern";
import { AnalysisState, DrawingState, events, State } from "./reducers";
import { analyze } from "./services/analyze";
import { download, search } from "./services/youtube";

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
      if ("download" in state && state.download?.state !== "complete") {
        state.download.ctrl.abort();
      }
      return events.search.wentBack();
    },
    async *download(state: State, id: string) {
      const ctrl = new AbortController();
      yield events.download.started(ctrl);

      const response = await download(id);

      ctrl.signal.addEventListener("abort", () => {
        response.cancel();
      });

      yield thunk((dispatch) => {
        let wait = false;
        response.progress.addEventListener(
          "progress",
          (e) => {
            if (!wait && e.loaded < (e.total ?? Infinity)) {
              dispatch(events.download.progress(e.loaded, e.total));
              wait = true;
              setTimeout(() => void (wait = false), 250);
            }
          },
          { signal: ctrl.signal, capture: false, passive: true }
        );
      });

      const buffer = await response.arrayBuffer();
      ctrl.abort();
      yield events.download.complete(buffer);
    },
    async *analyze(state: State) {
      if (!("download" in state) || state.download?.state !== "complete") {
        throw "wtf mate?";
      }
      yield events.analyze.decodingStarted();
      const audioBuffer = await ctx.decodeAudioData(state.download.buffer.slice(0));
      yield events.analyze.analysisStarted();
      const results = analyze(audioBuffer);
      yield events.analyze.analysisCompleted(results);
    },
    startWaveform(state: AnalysisState): CommandResult<State> {
      return thunk(async (dispatch) => {
        dispatch(events.analyze.waveformsStarted());
        worker.addEventListener("message", ({ data }) => {
          dispatch(events.analyze.waveformComputed({ waveformImageData: data }));
        });
        const buffer = await new AudioContext({sampleRate: 12000}).decodeAudioData(state.download.buffer.slice(0));
        const message = { audioBuffer: buffer.getChannelData(0).slice(0).buffer};
        worker.postMessage(message, [message.audioBuffer]);
      });
    },
    updateWaveform(state: DrawingState, samplesPerPixel: number) {
      worker.postMessage({ samplesPerPixel });
    },
  },
};
const worker = new Worker(new URL("./services/waveform.worker.js", import.meta.url), { type: "module" });
function thunk(fn: Sub<[ThunkDispatch]>) {
  return fn;
}
