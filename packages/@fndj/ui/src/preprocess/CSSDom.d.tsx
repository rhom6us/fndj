declare class CSSStyleValue {
    toString(): string;
}
type Operator = 'sum' | 'product' | 'max' | 'min';
declare class CSSNumericValue extends CSSStyleValue {
    add(value: CSSUnitValue): CSSMathSum;
    div(value: CSSUnitValue): CSSMathProduct;
    equals(value: CSSUnitValue): boolean;
    max(value: any): CSSMathMax;
    min(value: any): CSSMathMin;
    mul(value: any): CSSMathProduct;
    sub(value: any): CSSMathSum;
    to(value: string): CSSUnitValue;
    toSum(value: any): CSSUnitValue;
    type(value: any): CSSUnitValue;
}
declare class CSSMathValue<TOperator extends Operator> extends CSSNumericValue {
    get operator(): TOperator;
    get values(): CSSNumericArray;
}
declare class CSSMathProduct extends CSSMathValue<'product'> { }
declare class CSSMathSum extends CSSMathValue<'sum'> { }
declare class CSSMathMax extends CSSMathValue<'max'> { }
declare class CSSMathMin extends CSSMathValue<'min'> { }
declare class CSSNumericArray implements ArrayLike<CSSUnitValue> {
    readonly [n: number]: CSSUnitValue;
    length: number;
    readonly entries: Array<CSSUnitValue>['entries'];
    readonly forEach: Array<CSSUnitValue>['forEach'];
    readonly keys: Array<CSSUnitValue>['keys'];
    readonly values: Array<CSSUnitValue>['values'];
}
declare class CSSUnitValue extends CSSNumericValue {
    get value(): number;
    get unit(): string;
}
declare namespace CSS {
    function number(value: number | CSSUnitValue): CSSUnitValue;
    function percent(value: number | CSSUnitValue): CSSUnitValue;

    // <length>
    function em(value: number | CSSUnitValue): CSSUnitValue;
    function ex(value: number | CSSUnitValue): CSSUnitValue;
    function ch(value: number | CSSUnitValue): CSSUnitValue;
    function ic(value: number | CSSUnitValue): CSSUnitValue;
    function rem(value: number | CSSUnitValue): CSSUnitValue;
    function lh(value: number | CSSUnitValue): CSSUnitValue;
    function rlh(value: number | CSSUnitValue): CSSUnitValue;
    function vw(value: number | CSSUnitValue): CSSUnitValue;
    function vh(value: number | CSSUnitValue): CSSUnitValue;
    function vi(value: number | CSSUnitValue): CSSUnitValue;
    function vb(value: number | CSSUnitValue): CSSUnitValue;
    function vmin(value: number | CSSUnitValue): CSSUnitValue;
    function vmax(value: number | CSSUnitValue): CSSUnitValue;
    function cm(value: number | CSSUnitValue): CSSUnitValue;
    function mm(value: number | CSSUnitValue): CSSUnitValue;
    function Q(value: number | CSSUnitValue): CSSUnitValue;
    function _in(value: number | CSSUnitValue): CSSUnitValue;
    function pt(value: number | CSSUnitValue): CSSUnitValue;
    function pc(value: number | CSSUnitValue): CSSUnitValue;
    function px(value: number | CSSUnitValue): CSSUnitValue;

    // <angle>
    function deg(value: number | CSSUnitValue): CSSUnitValue;
    function grad(value: number | CSSUnitValue): CSSUnitValue;
    function rad(value: number | CSSUnitValue): CSSUnitValue;
    function turn(value: number | CSSUnitValue): CSSUnitValue;

    // <time>
    function s(value: number | CSSUnitValue): CSSUnitValue;
    function ms(value: number | CSSUnitValue): CSSUnitValue;

    // <frequency>
    function Hz(value: number | CSSUnitValue): CSSUnitValue;
    function kHz(value: number | CSSUnitValue): CSSUnitValue;

    // <resolution>
    function dpi(value: number | CSSUnitValue): CSSUnitValue;
    function dpcm(value: number | CSSUnitValue): CSSUnitValue;
    function dppx(value: number | CSSUnitValue): CSSUnitValue;

    // <flex>
    function fr(value: number | CSSUnitValue): CSSUnitValue;
}
