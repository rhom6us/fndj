const id = 'gapi-script';
function loadScript(src = 'https://apis.google.com/js/api.js') {
    return new Promise<void>((resolve, reject) => {
        let script = document.getElementById(id) as HTMLScriptElement | null;
        if (script) {
            if (!window.gapi) {
                reject(`script was already loaded but "gapi" global couldn't be found`);
                return;
            }
            resolve();
            return;
        }
        script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.crossOrigin = 'anonymous'
        script.addEventListener('load', () => resolve(), { once: true });

        document.head.appendChild(script);
    });
}
/** @internal */
export const loaded = loadScript();


/** @internal */
export type gapi = typeof gapi;

/** @internal */
export async function loadLib<K extends keyof gapi>(lib: K): Promise<gapi[K]> {
    await loaded;
    return new Promise<gapi[K]>((resolve) => {
        gapi.load(lib, () => resolve(gapi[lib]));
    });
}
