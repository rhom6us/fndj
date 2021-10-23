export function eventTarget<T extends HTMLElement>(fn: (target: T) => any, preventDefault = true) {
    return (e: React.ChangeEvent<T>) => {
        if (preventDefault) {
            e.preventDefault();
        }
        return fn(e.target);
    };
}
type ValuedHTMLElement<T = any> = HTMLElement & { value: T; };
export function eventTargetValue<T extends ValuedHTMLElement>(fn: (value: T['value']) => any, preventDefault = true) {
    return eventTarget<T>(t => fn(t.value), preventDefault);
};

export function asFloat(fn: (value: number) => any) {
    return (value: string) => fn(parseFloat(value));
}
export function eventTargetFloat<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault = true) {
    return eventTargetValue<T>(asFloat(fn), preventDefault);
}
export function asInt(fn: (value: number) => any, radix?: number) {
    return (value: string) => fn(parseInt(value, radix));
}
export function eventTargetInt<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault = true) {
    return eventTargetValue<T>(asInt(fn), preventDefault);
}
export function asParsedDate(fn: (value: number) => any) {
    return (value: string) => fn(Date.parse(value));
}
export function eventTargetParsedDate<T extends ValuedHTMLElement<string>>(fn: (value: number) => any, preventDefault = true) {
    return eventTargetValue<T>(asParsedDate(fn), preventDefault);
}
export function asDate(fn: (value: Date) => any) {
    return (value: string | number) => fn(new Date(value));
}
export function eventTargetDate<T extends ValuedHTMLElement<string>>(fn: (value: Date) => any, preventDefault = true) {
    return eventTargetValue<T>(asDate(fn), preventDefault);
}

export function asFormData(fn: (value: FormData) => any) {
    return (value: HTMLFormElement) => fn(new FormData(value));
};
export function eventTargetFormData<T extends HTMLFormElement>(fn: (value: FormData) => any, preventDefault = true) {
    return eventTarget<T>(asFormData(fn), preventDefault);
}

export function invert(fn: (value: number) => any) {
    return (value: number) => fn(-value);
}
