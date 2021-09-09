import { Lazy } from '@fndj/util';

export const audioContext = new Lazy(() => new AudioContext());



const initializedContextsWithThisWorklet = new Map<BaseAudioContext, Promise<void>>();


export function getWorkletInitializer<T extends new (...args: any[]) => AudioWorkletNode>(cls: T, url: string) {
    return async function create(context: BaseAudioContext): Promise<T> {
        if (!initializedContextsWithThisWorklet.has(context)) {
            initializedContextsWithThisWorklet.set(context, context.audioWorklet.addModule(url));
        }
        await initializedContextsWithThisWorklet.get(context);
        return cls;
    };
}
