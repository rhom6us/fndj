export interface Action<T = any> {
    type: T;
}
export interface AnyAction extends Action {
    [extraProps: string]: any;
}
export declare type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
