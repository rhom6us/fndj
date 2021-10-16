
export function isUrl(url: any): url is URL {
    return url instanceof URL;
}

export function isNotDefined<T>(p: T | null | undefined): p is undefined | null {
    return p === undefined || p === null;
}

export function isDefined<T>(p: T | null | undefined): p is T {
    return p !== undefined && p !== null;
}
