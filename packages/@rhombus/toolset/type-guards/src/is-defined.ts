
export function isDefined<T>(p: T | null | undefined): p is T {
  return p !== undefined && p !== null;
}

export function isNotDefined<T>(p: T | null | undefined): p is undefined | null {
    return p === undefined || p === null;
  }
