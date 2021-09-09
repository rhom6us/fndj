export class ExecutionContext {
    static runInternal(context: ExecutionContext, fn: (state: any) => void, state: any) {
        return context.runInternal(fn, state);
    }
    private runInternal(fn: (state: any) => void, state: any) {
        return fn(state);
    }
}
