export declare type Thunk<TEvent> = (dispatch: (event: TEvent) => void) => void;
export declare function isThunk(value: any): value is Thunk<any>;
