// import { setImmediate, clearImmediate } from "@rhombus/set-immediate";
// type WrapRest<T> = T extends any[] ? T : [T];
// type UnwrapRest<T extends any[]> = T extends [infer U] ? U : T;
// function unwrapRest<T extends any[]>(value: T): UnwrapRest<T>  {
//   if (Array.isArray(value) && value.length === 1) {
//     return value[0];
//   }
//   return value as any;
// }
// export { setImmediate, setImmediateAsync, clearImmediate, setTimeoutAsync };
// const setImmediateAsync = <TArgs extends any[] = []>(...args: TArgs) => new Promise<UnwrapRest<TArgs>>(resolve => {
//   setImmediate(((...args: TArgs) => resolve(unwrapRest(args))) as any, ...args);
// });
// const setTimeoutAsync = <TArgs extends any[] = []>(timeout: number, ...args: TArgs) => new Promise<UnwrapRest<TArgs>>(resolve => {
//   setTimeout(((...args:TArgs) => resolve(unwrapRest(args))) as any, timeout, ...args);
// });

// // let nextHandle = 1;
// // type Task<U extends ((...args: any[]) => void)> = { callback: U, args: Parameters<U>; };
// // const tasksByHandle: Record<number, Task<any>> = {};

// // function setImmediate(callback: (...p: any[]) => void, ...p: Parameters<typeof callback>): number {
// //   type U = typeof callback;

// //   // Callback can either be a function or a string
// //   if (typeof callback !== "function") {
// //     callback = new Function("" + callback) as any;
// //   }

// //   // Store and register the task
// //   const task: Task<U> = { callback: callback, args: p };
// //   tasksByHandle[nextHandle] = task;
// //   registerImmediate(nextHandle);
// //   return nextHandle++;
// // }

// // function clearImmediate(handle: number) {
// //   delete tasksByHandle[handle];
// // }

// // function run<U extends (...args: any[]) => void>({ callback, args }: { callback: U, args: Parameters<U>; }): void {
// //   return callback(...args);
// // }
// // let currentlyRunningATask = false;
// // function runIfPresent(handle: number) {
// //   // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
// //   // So if we're currently running a task, we'll need to delay this invocation.
// //   if (currentlyRunningATask) {
// //     // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
// //     // "too much recursion" error.
// //     setTimeout(runIfPresent, 0, handle);
// //   } else {
// //     const task = tasksByHandle[handle];
// //     if (task) {
// //       currentlyRunningATask = true;
// //       try {
// //         run(task);
// //       } finally {
// //         clearImmediate(handle);
// //         currentlyRunningATask = false;
// //       }
// //     }
// //   }
// // }

// // // function installNextTickImplementation() {
// // //     registerImmediate = function(handle) {
// // //         process.nextTick(function () { runIfPresent(handle); });
// // //     };
// // // }

// // // function canUsePostMessage() {
// // //     // The test against `importScripts` prevents this implementation from being installed inside a web worker,
// // //     // where `global.postMessage` means something completely different and can't be used for this purpose.
// // //     if (global.postMessage && !global.importScripts) {
// // //         let postMessageIsAsynchronous = true;
// // //         const oldOnMessage = global.onmessage;
// // //         global.onmessage = function() {
// // //             postMessageIsAsynchronous = false;
// // //         };
// // //         global.postMessage("", "*");
// // //         global.onmessage = oldOnMessage;
// // //         return postMessageIsAsynchronous;
// // //     }
// // // }

// // // function installPostMessageImplementation() {
// // // Installs an event handler on `global` for the `message` event: see
// // // * https://developer.mozilla.org/en/DOM/window.postMessage
// // // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

// // const messagePrefix = "setImmediate$" + Math.random() + "$";
// // const onGlobalMessage = function (event: MessageEvent<any>) {
// //   if (event.source === window &&
// //     typeof event.data === "string" &&
// //     event.data.indexOf(messagePrefix) === 0) {
// //     runIfPresent(+event.data.slice(messagePrefix.length));
// //   }
// // };


// // window.addEventListener("message", onGlobalMessage, false);


// // function registerImmediate(handle: number) {
// //   window.postMessage(messagePrefix + handle, "*");
// // };
// //     // }

// //     // function installMessageChannelImplementation() {
// //     //     const channel = new MessageChannel();
// //     //     channel.port1.onmessage = function(event) {
// //     //         const handle = event.data;
// //     //         runIfPresent(handle);
// //     //     };

// //     //     registerImmediate = function(handle) {
// //     //         channel.port2.postMessage(handle);
// //     //     };
// //     // }

// //     // function installReadyStateChangeImplementation() {
// //     //     const html = document.documentElement;
// //     //     registerImmediate = function(handle) {
// //     //         // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
// //     //         // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
// //     //         let script = document.createElement("script");
// //     //         script..onreadystatechange = function () {
// //     //             runIfPresent(handle);
// //     //             script.onreadystatechange = null;
// //     //             html.removeChild(script);
// //     //             script = null;
// //     //         };
// //     //         html.appendChild(script);
// //     //     };
// //     // }

// //     // function installSetTimeoutImplementation() {
// //     //     registerImmediate = function(handle) {
// //     //         setTimeout(runIfPresent, 0, handle);
// //     //     };
// //     // }

// //     // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
// //     // let attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
// //     // attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

// //     // // Don't get fooled by e.g. browserify environments.
// //     // if ({}.toString.call(global.process) === "[object process]") {
// //     //     // For Node.js before 0.9
// //     //     installNextTickImplementation();

// //     // } else if (canUsePostMessage()) {
// //     //     // For non-IE10 modern browsers
// //     //     installPostMessageImplementation();

// //     // } else if (global.MessageChannel) {
// //     //     // For web workers, where supported
// //     //     installMessageChannelImplementation();

// //     // } else if (doc && "onreadystatechange" in doc.createElement("script")) {
// //     //     // For IE 6–8
// //     //     installReadyStateChangeImplementation();

// //     // } else {
// //     //     // For older browsers
// //     //     installSetTimeoutImplementation();
// //     // }

// //     // attachTo.setImmediate = setImmediate;
// //     // attachTo.clearImmediate = clearImmediate;
