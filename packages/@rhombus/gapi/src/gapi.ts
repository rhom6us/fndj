function loadScript(src = 'https://apis.google.com/js/api.js') {
    return new Promise<void>((resolve, reject) => {
        const id = 'gapi-script';
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
await loadScript();

export type Gapi = typeof gapi;


export async function loadLib<K extends keyof Gapi>(lib: K): Promise<Gapi[K]>{
    return new Promise<Gapi[K]>((resolve) => {

        gapi.load(lib, () => resolve(gapi[lib]));
    });;
}
