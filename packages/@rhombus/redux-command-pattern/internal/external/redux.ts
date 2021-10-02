export interface Action<T = any> {
    type: T;
}


export interface AnyAction extends Action {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any;
}


export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S;
