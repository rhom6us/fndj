
// import { audioContext as context } from './audio-context';

// import { logger, enableLogging } from '@fndj/util';

// declare global {
//     interface Window {
//         fnctx?: AudioContext;
//         go(): void;
//     }
// }

// function setupUI() {
//     logger.clear();
//     function makeEl<TContainer extends HTMLElement>(container: TContainer): HTMLDivElement;
//     function makeEl<TContainer extends HTMLElement, TTagName extends keyof HTMLElementTagNameMap>(container: TContainer, tagName: TTagName): HTMLElementTagNameMap[TTagName];
//     function makeEl(container: HTMLElement, tagName?: string) {
//         return container.appendChild(document.createElement(tagName ?? 'div'));
//     }
//     function createBar<TContainer extends HTMLElement>(color: string, container: TContainer) {
//         const div = makeEl(container);
//         div.style.height = CSS.px(100);
//         div.style.backgroundColor = color;
//         return width => div.style.width = CSS.percent(100 * width);
//     }
//     function createBarPair([color1, color2], position) {
//         const wrapper = makeEl(document.body);
//         const peakRow = makeEl(wrapper);
//         const [left, right] = [color1, color2].map(p => createBar(p, peakRow));;
//         return ([l, r]) => {
//             return [left(l), right(r)];
//         };
//     }
//     const [peakFn, rmsFn] = [['red', 'orange'], ['green', 'blue']].map(colors => createBarPair(colors));
//     function draw() {
//         if (fnmeter.current) {
//             peakFn(fnmeter.current.map(p => p.peak));
//             rmsFn(fnmeter.current.map(p => p.rms));

//         }
//         requestAnimationFrame(draw);
//     }
//     window.go = function () {
//         draw();
//         fnctx.resume();
//     };
//     console.log('type go() in the console to begin');
// }
// export { };
