"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invert = exports.eventTargetFormData = exports.asFormData = exports.eventTargetDate = exports.asDate = exports.eventTargetParsedDate = exports.asParsedDate = exports.eventTargetInt = exports.asInt = exports.eventTargetFloat = exports.asFloat = exports.eventTargetValue = exports.eventTarget = void 0;
function eventTarget(fn, preventDefault = true) {
    return (e) => {
        if (preventDefault) {
            e.preventDefault();
        }
        return fn(e.target);
    };
}
exports.eventTarget = eventTarget;
function eventTargetValue(fn, preventDefault = true) {
    return eventTarget(t => fn(t.value), preventDefault);
}
exports.eventTargetValue = eventTargetValue;
;
function asFloat(fn) {
    return (value) => fn(parseFloat(value));
}
exports.asFloat = asFloat;
function eventTargetFloat(fn, preventDefault = true) {
    return eventTargetValue(asFloat(fn), preventDefault);
}
exports.eventTargetFloat = eventTargetFloat;
function asInt(fn, radix) {
    return (value) => fn(parseInt(value, radix));
}
exports.asInt = asInt;
function eventTargetInt(fn, preventDefault = true) {
    return eventTargetValue(asInt(fn), preventDefault);
}
exports.eventTargetInt = eventTargetInt;
function asParsedDate(fn) {
    return (value) => fn(Date.parse(value));
}
exports.asParsedDate = asParsedDate;
function eventTargetParsedDate(fn, preventDefault = true) {
    return eventTargetValue(asParsedDate(fn), preventDefault);
}
exports.eventTargetParsedDate = eventTargetParsedDate;
function asDate(fn) {
    return (value) => fn(new Date(value));
}
exports.asDate = asDate;
function eventTargetDate(fn, preventDefault = true) {
    return eventTargetValue(asDate(fn), preventDefault);
}
exports.eventTargetDate = eventTargetDate;
function asFormData(fn) {
    return (value) => fn(new FormData(value));
}
exports.asFormData = asFormData;
;
function eventTargetFormData(fn, preventDefault = true) {
    return eventTarget(asFormData(fn), preventDefault);
}
exports.eventTargetFormData = eventTargetFormData;
function invert(fn) {
    return (value) => fn(-value);
}
exports.invert = invert;
//# sourceMappingURL=event-handlers.js.map