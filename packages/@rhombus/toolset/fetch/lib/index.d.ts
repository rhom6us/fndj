export interface FetchEventMap {
    "progress": ProgressEvent;
    "complete": ProgressEvent;
}
export interface ProgressEventTarget extends EventTarget {
    addEventListener<K extends keyof FetchEventMap>(type: K, listener: (this: ProgressEventTarget, ev: FetchEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof FetchEventMap>(type: K, listener: (this: ProgressEventTarget, ev: FetchEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export declare function wrapResponse(response: Response): Response;
declare global {
    interface Response {
        progress: ProgressEventTarget;
        cancel(): Promise<void>;
    }
}
export declare const nativeFetch: typeof fetch;
//# sourceMappingURL=index.d.ts.map