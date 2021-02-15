
const PROCESSOR_NAME = 'phase-vocoder-processor';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function initializeWorklet(context: BaseAudioContext) {
    const url = new URL('./phase-vocoder.worklet.ts', import.meta.url);
    await context.audioWorklet.addModule(url.href);
    return class extends AudioWorkletNode {
        constructor() {
            super(context, PROCESSOR_NAME);
            }
        };
    }
