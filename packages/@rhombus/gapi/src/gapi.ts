function loadScript(src = 'https://apis.google.com/js/api.js') {
    return new Promise<typeof window.gapi>((resolve, reject) => {
        const id = 'gapi-script';
        let script = document.getElementById(id) as HTMLScriptElement | null;
        if (script) {
            if (!window.gapi) {
                reject(`script was already loaded but "gapi" global couldn't be found`);
                return;
            }
            resolve(window.gapi);
            return;
        }
        script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.addEventListener('load', () => resolve(window.gapi), { once: true });

        document.head.appendChild(script);
    });
}
export type Gapi = typeof gapi;
let cache: Gapi;
export async function getGapi(): Promise<Gapi> {
    return cache ??= await loadScript();
}


export async function loadLib<K extends keyof Gapi>(lib: K): Promise<Gapi[K]>;
export async function loadLib<K extends keyof Gapi>(gapi: Gapi, lib: K): Promise<Gapi[K]>;
export async function loadLib<K extends keyof Gapi>(...args: [K] | [Gapi, K]): Promise<Gapi[K]> {
    if (args.length === 1) {
        return loadLib(await getGapi(), args[0]);
    }
    const [gapi, lib] = args;
    return new Promise<Gapi[K]>((resolve) => {
        gapi.load(lib, () => resolve(gapi[lib]));
    });;
}
