import type { ActionCreator } from 'redux';

export interface DispatcherProps {
    actionCreators: Record<string, ActionCreator<any>>;
}
declare const Dispatcher: React.FC<DispatcherProps>;
export default Dispatcher;
