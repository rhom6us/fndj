

function _max(a: number, b: number) {
	return Math.max(a, b);
}
export function max(array: ArrayLike<number>): number {
	if (!('reduce' in array)) {
		return max(Array.from(array));
	}
	return (array as number[]).reduce(_max);
};
export function maxAbs(array: ArrayLike<number>): number {
	if (!('reduce' in array)) {
		return maxAbs(Array.from(array));
	}
	return (array as number[]).map(Math.abs).reduce(_max);
};
;


export const roundTo1Decimal = function (val: number) {
	return (Math.round(val * 10) / 10).toFixed(1);
};
export function absoluteValueToDBFS(value: number){
    return 20 * Math.log10(value);
}
export function getFloatTimeDomainData(node: AnalyserNode):Float32Array {
    const result = new Float32Array(node.frequencyBinCount);
    node.getFloatTimeDomainData(result);
    return result;
}
export type $<T extends keyof HTMLElementTagNameMap | HTMLElement> = T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T;
export const $ = <T extends keyof HTMLElementTagNameMap | HTMLElement>(...args: Parameters<typeof document.querySelector>) => document.querySelector(...args) as $<T>;
export const $$ = <T extends keyof HTMLElementTagNameMap | HTMLElement>(...args: Parameters<typeof document.querySelectorAll>) => document.querySelectorAll(...args) as NodeListOf<$<T>>;
export function using<T extends $<'canvas'>>(canvas: T, contextId: '2d', fn: (context: CanvasRenderingContext2D) => void) {
    const ctx = canvas.getContext(contextId);
    if (!ctx) {
        throw new Error('canvas context not found');
    }
    fn(ctx);
}
