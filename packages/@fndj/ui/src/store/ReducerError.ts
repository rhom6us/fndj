export class ReducerError extends Error {
    constructor(public readonly module: string, public readonly reducer: string, message: string) {
        super(message);
    }
}
