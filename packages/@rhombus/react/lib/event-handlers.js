export function eventTarget(fn, preventDefault = true) {
    return (e) => {
        if (preventDefault) {
            e.preventDefault();
        }
        return fn(e.target);
    };
}
export function eventTargetValue(fn, preventDefault = true) {
    return eventTarget(t => fn(t.value), preventDefault);
}
;
export function asFloat(fn) {
    return (value) => fn(parseFloat(value));
}
export function eventTargetFloat(fn, preventDefault = true) {
    return eventTargetValue(asFloat(fn), preventDefault);
}
export function asInt(fn, radix) {
    return (value) => fn(parseInt(value, radix));
}
export function eventTargetInt(fn, preventDefault = true) {
    return eventTargetValue(asInt(fn), preventDefault);
}
export function asParsedDate(fn) {
    return (value) => fn(Date.parse(value));
}
export function eventTargetParsedDate(fn, preventDefault = true) {
    return eventTargetValue(asParsedDate(fn), preventDefault);
}
export function asDate(fn) {
    return (value) => fn(new Date(value));
}
export function eventTargetDate(fn, preventDefault = true) {
    return eventTargetValue(asDate(fn), preventDefault);
}
export function asFormData(fn) {
    return (value) => fn(new FormData(value));
}
;
export function eventTargetFormData(fn, preventDefault = true) {
    return eventTarget(asFormData(fn), preventDefault);
}
export function invert(fn) {
    return (value) => fn(-value);
}
//# sourceMappingURL=event-handlers.js.map