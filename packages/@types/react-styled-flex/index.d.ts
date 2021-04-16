import { FC, CSSProperties, Component } from 'react';
import { Globals, Property as CSS } from 'csstype';

export interface FlexBoxProps extends Pick<CSSProperties, 'height' | 'width' | 'margin' | 'padding' | 'border' | 'gap' | 'columnGap' | 'rowGap' | 'justifyContent' | 'alignItems' | 'alignContent'> {
    is: string | Component | FC;
    inline: boolean;
    column: boolean;
    reverse: boolean;
    wrap: boolean;
    wrapReverse: boolean;
    center: boolean;

}
export interface FlexItemProps extends Pick<CSSProperties, 'flex' | 'order' | 'alignSelf'> {
    is: string | Component | FC;
    grow: CSS.FlexGrow;
    shrink: CSS.FlexShrink;
    basis: CSS.FlexBasis;
    box: boolean;

}

type P = string | number | bigint | boolean | null | undefined;

type D = '锿嫁亂綾ψЩﬖ฿ع';
type d = D;
// export type isEqual<A, B, T = true, F = false> =
//     A extends B ? T : F;
// type Cast<Value, Type> = Value extends Type ? Value : Type;
// type _Filter<Items extends any[], Predicate, Filtered extends any[]> =
//     Items extends [] ? Filtered :
//     Items extends [infer X, ...infer Rest] ? _Filter<Rest, Predicate, isEqual<X, Predicate, Filtered, [...Filtered, X]>> :
//     never;
// export type Filter<Items extends P[], Predicate> = _Filter<Items, Predicate, []>;

// type _Join<Items extends P[], Separator extends P = ' '> =
//     Items extends [] ? `` :
//     Items extends [infer TSingleItem] ? `${Cast<TSingleItem, P>}` :
//     Items extends [infer X, ...infer Y] ? `${Cast<X, P>}${Separator}${_Join<Cast<Y, P[]>, Separator>}`
//     : never;
// export type Join<Items extends P[], Separator extends P = ' '> = _Join<Items, Separator>;
// export type J<Separator extends P, A extends P = d, B extends P = d, C extends P = d, D extends P = d, E extends P = d, F extends P = d, G extends P = d, H extends P = d, I extends P = d, J extends P = d, K extends P = d, L extends P = d, M extends P = d, N extends P = d, O extends P = d, PP extends P = d, Q extends P = d, R extends P = d, S extends P = d, T extends P = d, U extends P = d, V extends P = d, W extends P = d, X extends P = d, Y extends P = d, Z extends P = d> =
//     Join<Filter<[A, B, C, D, E, F, G, H, I, J, K/*, L, M, N, O, PP, Q, R, S, T, U, V, W, X, Y, Z*/], d>, Separator>;

type MultiProp<T extends P, U extends P = d, V extends P = d> =
    U extends D ? `${T}` :
    V extends D ? `${T} ${U}` | MultiProp<T> :
    `${T} ${U} ${V}` | MultiProp<T, U>;
type Units = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh';
type UnittedNumber = `${number}${Units}`;
export type Flex//<A extends NN<CSS.FlexGrow> = NN<CSS.FlexGrow>, B extends NN<CSS.FlexShrink> | D = d, C extends NS<CSS.FlexBasis> | D = d> = MultiProp<A, B, C>;
    // = Join<[number, number, NS<CSS.FlexBasis>]>;
    // = NS<CSS.FlexBasis>;
    // = , NN<CSS.FlexShrink>, NS<CSS.FlexBasis>>;
    = MultiProp<number, number, UnittedNumber | 'auto' | 'max-content' | 'min-content' | 'fit-content'>;
export type FlexFlow//<T extends CSS.FlexDirection, U extends CSS.FlexWrap> = `${T} ${U}`;
    = MultiProp<CSS.FlexDirection, CSS.FlexWrap>;
// = Join<[number, CSS.FlexDirection, CSS.FlexWrap]>;


export const FlexBox: FC<Partial<FlexBoxProps>>;
export const FlexItem: FC<Partial<FlexItemProps>>;



// declare const react_styled_flex: {
//     FlexBox: {
//         $$typeof: any;
//         attrs: any[];
//         componentStyle: {
//             baseHash: number;
//             baseStyle: any;
//             componentId: string;
//             generateAndInjectStyles: any;
//             isStatic: boolean;
//             rules: any[];
//             staticRulesId: string;
//         };
//         defaultProps: any;
//         displayName: string;
//         foldedComponentIds: any[];
//         render: any;
//         shouldForwardProp: any;
//         styledComponentId: string;
//         target: {
//             $$typeof: any;
//             displayName: string;
//             render: any;
//         };
//         toString: any;
//         warnTooManyClasses: any;
//         withComponent: any;
//     };
//     FlexItem: {
//         $$typeof: any;
//         attrs: any[];
//         componentStyle: {
//             baseHash: number;
//             baseStyle: any;
//             componentId: string;
//             generateAndInjectStyles: any;
//             isStatic: boolean;
//             rules: any[];
//             staticRulesId: string;
//         };
//         defaultProps: any;
//         displayName: string;
//         foldedComponentIds: any[];
//         render: any;
//         shouldForwardProp: any;
//         styledComponentId: string;
//         target: {
//             $$typeof: any;
//             displayName: string;
//             render: any;
//         };
//         toString: any;
//         warnTooManyClasses: any;
//         withComponent: any;
//     };
// };
