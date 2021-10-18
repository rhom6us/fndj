export function defer<T>() {
    let resolve!: (p: T) => void;
    let reject!: (reason: any) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { resolve, reject, promise };
}
