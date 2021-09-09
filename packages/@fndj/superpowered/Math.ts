export { };
declare global {
    interface Math {

        /**
         * Returns the natural logarithm (base e) of a number.
         * @param x A numeric expression.
         */
        ln: (x: number) => number;
        logb: (base: number, x: number) => number;
    }
}
Math.ln = Math.log;
Math.logb = (base, x) => Math.ln(x) / Math.ln(base);
