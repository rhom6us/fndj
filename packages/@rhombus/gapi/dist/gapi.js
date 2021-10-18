function loadScript(src = 'https://apis.google.com/js/api.js') {
    return new Promise((resolve, reject) => {
        const id = 'gapi-script';
        let script = document.getElementById(id);
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
let cache;
export async function getGapi() {
    return cache ??= await loadScript();
}
export async function loadLib(...args) {
    if (args.length === 1) {
        return loadLib(await getGapi(), args[0]);
    }
    const [gapi, lib] = args;
    return new Promise((resolve) => {
        gapi.load(lib, () => resolve(gapi[lib]));
    });
    ;
}
//# sourceMappingURL=gapi.js.map