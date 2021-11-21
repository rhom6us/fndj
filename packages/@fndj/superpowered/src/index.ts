
import { SuperpoweredGlue } from './SuperpoweredGlue';
import { wasmUrl } from './superpowered_wasm';
export * from './mods';
export * from './Pointer';
export * from './SuperpoweredBuffer';
export * from './SuperpoweredGlue';
// // // export * from './SuperpoweredGlueModule';
export * from './SuperpoweredTrackLoader';
export * from './SuperpoweredWebAudio';
let cache: WeakRef<SuperpoweredGlue> | undefined;
export async function initialize(...args: Parameters<SuperpoweredGlue['Initialize']>) {
    const cachedVal = cache?.deref();
    if (cachedVal) {
        return cachedVal;
    }
    // const { default: dataurl } = await import('../superpowered.wasm');
    const glue = await SuperpoweredGlue.fetch(wasmUrl);
    glue.Initialize(...args);
    cache = new WeakRef(glue);
    return glue;
}   