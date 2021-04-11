

export interface Scale {
    (value: number): number;
    invert(value: number): number;
    domain(arr: [min: number, max: number]): Scale;
    range(arr: [min: number, max: number]): Scale;
}
declare namespace _default {
    /**
     * A linear scale interpolating values between a `domain` and a `range`.
     * @return {Function}
     */
    export function linear(): Scale;


}
export default _default;
//# sourceMappingURL=scales.d.ts.map
