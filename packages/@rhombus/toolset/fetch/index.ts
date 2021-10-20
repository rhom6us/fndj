import { obj } from '@rhombus/type-helpers';

class FetchProgressEvent extends Event {
  constructor(public readonly completed: number, public readonly total: number|undefined, eventInitDict?: EventInit) {
    super('progress', eventInitDict);
  }
}
class FetchCompleteEvent extends Event {
  constructor(public readonly completed: number, public readonly total: number|undefined, eventInitDict?: EventInit) {
    super('complete', eventInitDict);
  }
}
interface ProgressEventMap {
  "progress": FetchProgressEvent;
  "complete": FetchCompleteEvent;
}
interface ProgressEventTarget extends EventTarget {
  addEventListener<K extends keyof ProgressEventMap>(type: K, listener: (this: ProgressEventTarget, ev: ProgressEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof ProgressEventMap>(type: K, listener: (this: ProgressEventTarget, ev: ProgressEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
function wrapResponse(response: Response) {

  const reader = response.body!.getReader();
  const emitter: ProgressEventTarget = new EventTarget();

  const contentLengthText = response.headers.get('content-length');
  const contentLength = contentLengthText !== null ? +contentLengthText : undefined;
  let completed = 0;

  function progress(amount: number) {
    completed += amount;
    emitter.dispatchEvent(new FetchProgressEvent(completed, contentLength));
  }
  function complete(amount?: number) {
    if(amount)
      completed += amount;
    emitter.dispatchEvent(new FetchCompleteEvent(completed, contentLength));
  }
  const stream = new ReadableStream({
    start(controller) {
      void async function pushit() {

        while(true) { // eslint-disable-line no-constant-condition
          const { done, value } = await reader.read();
          if (value) {
            progress(value.length);
          }
          controller.enqueue(value);
          if (done) {
            break;
          }
        }
        complete();
        // if (done) {
        //   complete(value?.length);
        //   controller.close();
        //   return;
        // }
        // if (value) {
        //   progress(value.length);
        // }
        // controller.enqueue(value);
        // pushit();
      }();

    },
  });
  return obj.assign(new Response(stream, response), emitter);

}


declare global {
  interface Response extends ProgressEventTarget { }
}
const nativeFetch = globalThis.fetch;
globalThis.fetch = function (...args: Parameters<typeof fetch>) {
  return nativeFetch.apply(this, args).then(wrapResponse);
}
