function loadScript(src = 'https://apis.google.com/js/api.js') {
    return new Promise((resolve, reject) => {
        const id = 'gapi-script';
        let script = document.getElementById(id);
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
        script.crossOrigin = 'anonymous';
        script.addEventListener('load', () => resolve(), { once: true });
        document.head.appendChild(script);
    });
}
await loadScript();
export async function loadLib(lib) {
    return new Promise((resolve) => {
        gapi.load(lib, () => resolve(gapi[lib]));
    });
    ;
}
//# sourceMappingURL=gapi.js.map