import { AsyncAction } from '@rhombus/func';
import { CommandResult } from '../create-command-handler';
import { StandardEventAny } from '../standard-event';
export declare type ThunkDispatch<T = CommandResult<any, StandardEventAny>> = AsyncAction<[T]>;
export declare type Thunk<T = CommandResult<any, StandardEventAny>> = (handle: ThunkDispatch<T>) => void;
export declare function isThunk(value: any): value is Thunk<any>;
//# sourceMappingURL=thunk.d.ts.map