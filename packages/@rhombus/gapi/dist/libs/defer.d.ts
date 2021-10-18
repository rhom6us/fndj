export declare function defer<T>(): {
    resolve: (p: T) => void;
    reject: (reason: any) => void;
    promise: Promise<T>;
};
