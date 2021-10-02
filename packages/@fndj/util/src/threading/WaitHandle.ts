import { defer } from '..';
import './navigator.locks';


function getWaitHandle(name: string) {
    const def = defer();
    const lockPromise = navigator.locks.request("wait_handle", lock => def.promise);
    return {
        async wait() {
            await lockPromise;
        },
        signal() {
            def.resolve();
        }
    };

}
