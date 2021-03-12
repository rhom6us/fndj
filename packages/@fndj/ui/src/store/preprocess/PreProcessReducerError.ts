import { ReducerError } from '../ReducerError';

export class PreProcessReducerError extends ReducerError {
    constructor(reducer: string, message: string) {
        super("preprocess", reducer, message);
    }
}
