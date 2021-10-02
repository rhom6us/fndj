export class AggregateError extends Error {
    constructor(public readonly errors: unknown[]) {
        super();
    }
}
