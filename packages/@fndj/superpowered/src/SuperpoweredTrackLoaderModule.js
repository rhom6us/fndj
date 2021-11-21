class SuperpoweredTrackLoader {
    constructor(receiver) {
        this.receiver = (typeof receiver.port !== 'undefined') ? receiver.port : receiver;
        if (typeof receiver.terminate !== 'undefined') receiver.addEventListener('message', this.onmessage); // Worker
    }

    onmessage(message) {
        if (typeof message.data.SuperpoweredLoad !== 'string') return false;
        this.load(message.data.SuperpoweredLoad);
        return true;
    }

    load(url) {
        let trackLoaderWorker = new Worker('./superpowered/SuperpoweredTrackLoaderWorker.js');
        trackLoaderWorker.__url__ = url;

        trackLoaderWorker.ontransfer = function(message) {
            this.transfer(message.transfer, trackLoaderWorker);
        }.bind(this);

        trackLoaderWorker.onmessage = function(message) {
            this.transfer(message.data.__transfer__, trackLoaderWorker);
        }.bind(this);

        trackLoaderWorker.postMessage({ load: trackLoaderWorker.__url__ });
    }

    transfer(arrayBuffer, trackLoaderWorker) {
        if (typeof this.receiver.postMessage === 'function') this.receiver.postMessage({ SuperpoweredLoaded: { buffer: arrayBuffer, url: trackLoaderWorker.__url__ }}, [ arrayBuffer ]);
        else this.receiver({ SuperpoweredLoaded: { buffer: arrayBuffer, url: trackLoaderWorker.__url__ }});
        trackLoaderWorker.terminate();
    }

    static downloadAndDecode(url, obj) {
        if ((typeof obj.onMessageFromMainScope === 'function') && (typeof obj.sendMessageToMainScope === 'function')) obj.sendMessageToMainScope({ SuperpoweredLoad: url });
        else new SuperpoweredTrackLoader(obj).load(url);
    }
}


export { SuperpoweredTrackLoader };
