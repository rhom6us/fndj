export function intDiv(value: number, quotient: number) {
    const resultF = value / quotient;
    const wholePart = Math.trunc(resultF);
    // const remainder = (resultF - wholePart) * quotient;
    const remainder = value - (wholePart * quotient); //better precision this way I think
    return [wholePart, remainder] as const;
}
