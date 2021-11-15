export declare function eventTarget<T extends HTMLElement>(fn: (target: T) => any, preventDefault?: boolean): (e: React.ChangeEvent<T>) => any;
declare type ValuedHTMLElement<T = any> = HTMLElement & {
    value: T;
};
export declare function eventTargetValue<T extends ValuedHTMLElement>(fn: (value: T['value']) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function asFloat(fn: (value: number) => any): (value: string) => any;
export declare function eventTargetFloat<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function asInt(fn: (value: number) => any, radix?: number): (value: string) => any;
export declare function eventTargetInt<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function asParsedDate(fn: (value: number) => any): (value: string) => any;
export declare function eventTargetParsedDate<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function asDate(fn: (value: Date) => any): (value: string | number) => any;
export declare function eventTargetDate<T extends ValuedHTMLElement<string>>(fn: (value: Date) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function asFormData(fn: (value: FormData) => any): (value: HTMLFormElement) => any;
export declare function eventTargetFormData<T extends HTMLFormElement>(fn: (value: FormData) => any, preventDefault?: boolean): (e: import("react").ChangeEvent<T>) => any;
export declare function invert(fn: (value: number) => any): (value: number) => any;
export {};
//# sourceMappingURL=event-handlers.d.ts.map