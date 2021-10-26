const slope: number[] = new Proxy({} as any, {
    get(target, prop: string) {
        const amount = +prop;
        if (isNaN(amount)) {
            throw new TypeError('Invalid argument in makeSquareRootCurve');
        }
        return target[prop] ??= 1 / ((amount - 1) / 2);
    }
});
export const squareRootCurves:Float32Array[] = new Proxy({} as any, {
    get(target, prop: string) {
        const amount = +prop;
        if (isNaN(amount)) {
            throw new TypeError('Invalid argument in makeSquareRootCurve');
        }
        return target[prop] ??= new Float32Array(amount).map((_, i) => i > (amount / 2) ? Math.sqrt(slope[amount]! * i - 1) : 0);
    }
});
