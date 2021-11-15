export function wrapResponse(response) {
    if (!response.body) {
        throw Error('ReadableStream not yet supported in this browser.');
    }
    if (!response.ok) {
        throw Error(response.status + ' ' + response.statusText);
    }
    // to access headers, server must send CORS header "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
    // server must send custom x-file-size header if gzip or other content-encoding is used
    const contentEncoding = response.headers.get('content-encoding');
    const contentLength = response.headers.get(contentEncoding ? 'x-file-size' : 'content-length');
    if (contentLength === null) {
        // don't evaluate download progress if we can't compare against a total size
        throw Error('Response size header unavailable');
    }
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    const lengthComputable = !!total;
    const emitter = new EventTarget();
    function progress(amount) {
        loaded += amount;
        emitter.dispatchEvent(new ProgressEvent('progress', { lengthComputable, loaded, total }));
    }
    function complete() {
        progress(total - loaded);
        emitter.dispatchEvent(new ProgressEvent('complete', { lengthComputable, loaded, total }));
    }
    const reader = response.body.getReader();
    let cancelled = false;
    const stream = new ReadableStream({
        async start(controller) {
            if (cancelled) {
                controller.close();
                return;
            }
            // void async function pushit() {
            try {
                while (true) { // eslint-disable-line no-constant-condition
                    const { done, value } = await reader.read();
                    if (done) {
                        controller.close();
                        break;
                    }
                    progress(value.byteLength);
                    controller.enqueue(value);
                }
                complete();
            }
            catch (error) {
                controller.error(error);
            }
            // }();
        },
    });
    const result = new Response(stream, response);
    result.progress = emitter;
    result.cancel = () => {
        cancelled = true;
        emitter.dispatchEvent(new ProgressEvent('cancelled', { lengthComputable, loaded, total }));
        return reader?.cancel() ?? Promise.resolve();
    };
    return result;
    // return obj.assignDeep(new Response(stream, response), emitter);
}
export const nativeFetch = globalThis.fetch;
globalThis.fetch = function (...args) {
    return nativeFetch.apply(this, args).then(wrapResponse);
};
//# sourceMappingURL=index.js.map