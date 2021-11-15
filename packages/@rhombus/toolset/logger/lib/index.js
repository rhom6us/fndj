export function createLogger(enabled = false) {
    let _enabled = enabled;
    function enableLogging(enable = true) {
        _enabled = enable;
    }
    const logger = new Proxy(console, {
        get: function (target, prop, receiver) {
            return (...args) => {
                if (_enabled) {
                    target[prop](...args);
                }
                return args.length ? args.slice(-1)[0] : target;
            };
        }
    });
    return [logger, enableLogging];
}
export function createNoopLogger() {
    function enableLogging(enable = true) {
    }
    const logger = new Proxy(console, {
        get: function (target, prop, receiver) {
            return (...args) => {
                return args.length ? args.slice(-1)[0] : target;
            };
        }
    });
    return [logger, enableLogging];
}
export const [logger, enableLogging] = createLogger();
// function keys<T>(obj: T) {
//     return Object.keys(obj) as Array<keyof T>;
// }
// export abstract class LoggerBase implements Logger {
//     // abstract log: (...args: any) => this;
//     // warn = (...args: any) => this.error('This implementation does not support this method');
//     // error = (...args: any) => this.error('This implementation does not support this method');
//     // count = (label?: string) => this.error('This implementation does not support this method');
//     // countReset = (label?: string) => this.error('This implementation does not support this method');
//     // clear = () => this.error('This implementation does not support this method');
//     // assert = (condition?: boolean, ...data: any[]) => this.error('This implementation does not support this method');
//     assert = (condition?: boolean, ...data: any[]) => this.error('This implementation does not support this method');
//     clear = () => this.error('This implementation does not support this method');
//     count = (label?: string) => this.error('This implementation does not support this method');
//     countReset = (label?: string) => this.error('This implementation does not support this method');
//     debug = (...data: any[]) => this.error('This implementation does not support this method');
//     dir = (item?: any, options?: any) => this.error('This implementation does not support this method');
//     dirxml = (...data: any[]) => this.error('This implementation does not support this method');
//     abstract error: (...data: any[]) => this;
//     exception = (message?: string, ...optionalParams: any[]) => this.error('This implementation does not support this method');
//     group = (...data: any[]) => this.error('This implementation does not support this method');
//     groupCollapsed = (...data: any[]) => this.error('This implementation does not support this method');
//     groupEnd = () => this.error('This implementation does not support this method');
//     info = (...data: any[]) => this.error('This implementation does not support this method');
//     abstract log: (...data: any[]) => this;
//     table = (tabularData?: any, properties?: string[]) => this.error('This implementation does not support this method');
//     time = (label?: string) => this.error('This implementation does not support this method');
//     timeEnd = (label?: string) => this.error('This implementation does not support this method');
//     timeLog = (label?: string, ...data: any[]) => this.error('This implementation does not support this method');
//     timeStamp = (label?: string) => this.error('This implementation does not support this method');
//     trace = (...data: any[]) => this.error('This implementation does not support this method');
//     abstract warn: (...data: any[]) => this;
// };
// export class NoopLogger extends LoggerBase {
//     get memory() {
//         return undefined;
//     }
//     set memory(val) {
//     }
//     error = (...data: any[]) => this;
//     log = (...data: any[]) => this;
//     warn = (...data: any[]) => this;
// }
// function makeThisReturn<T extends LoggerBase, K extends keyof Console>(thisArg: T, method: K): (...args: Parameters<Console[K]>) => T {
//     return (...args: Parameters<Console[K]>) => {
//         console[method](...args);
//         return thisArg;
//     };
// }
// export class DynamicLogger implements Logger {
//     constructor(implementation: <K extends keyof Logger>(key: K) => Logger[K]) {
//         for (const key of (Object.keys(console) as Array<keyof Logger>)) {
//             this[key] = implementation(key);
//             return this;
//         }
//     }
//     // assert(condition?: boolean, ...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // clear(): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // count(label?: string): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // countReset(label?: string): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // debug(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // dir(item?: any, options?: any): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // dirxml(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // error(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // exception(message?: string, ...optionalParams: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // group(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // groupCollapsed(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // groupEnd(): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // info(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // log(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // table(tabularData?: any, properties?: string[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // time(label?: string): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // timeEnd(label?: string): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // timeLog(label?: string, ...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // timeStamp(label?: string): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // trace(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
//     // warn(...data: any[]): void {
//     //     throw new Error('Method not implemented.');
//     // }
// }
// export class ConsoleLogger extends LoggerBase {
//     constructor() {
//         super();
//         for (const key of (Object.keys(console) as Array<keyof Console>)) {
//             this[key] = makeThisReturn(this, key);
//             return this;
//         }
//     }
//     get memory() {
//         return console.memory;
//     }
//     set memory(val) {
//         console.memory = val;
//     }
//     error = (...data: any[]) => {
//         console.error(...data);
//         return this;
//     };
//     log = (...data: any[]) => {
//         console.log(...data);
//         return this;
//     };
//     warn = (...data: any[]) => {
//         console.warn(...data);
//         return this;
//     };
// }
//# sourceMappingURL=index.js.map