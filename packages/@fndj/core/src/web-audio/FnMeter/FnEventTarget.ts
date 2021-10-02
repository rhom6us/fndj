/* eslint-disable @typescript-eslint/ban-types */
export class FnEventTarget implements EventTarget {
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: any, callback: any, options?: any): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set<Function>());
    }
    this.listeners.get(type)!.add(callback);
  }
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: any, callback: any, options?: any): void {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type)!.delete(callback);

  }
  listeners = new Map<string, Set<Function>>();


  // addEventListener(type: string, callback: Function) {
  //   if (!this.listeners.has(type)) {
  //     this.listeners.set(type, new Set<Function>());
  //   }
  //   this.listeners.get(type)!.add(callback);
  // }

  // removeEventListener(type: string, callback: Function) {
  //   if (!this.listeners.has(type)) {
  //     return;
  //   }
  //   this.listeners.get(type)!.delete(callback);

  // };

  dispatchEvent(event: Event) {
    if (!this.listeners.has(event.type)) {
      return true;
    }
    this.listeners.get(event.type)!.forEach(fn => fn.call(this, event));

    return !event.defaultPrevented;
  };
}
