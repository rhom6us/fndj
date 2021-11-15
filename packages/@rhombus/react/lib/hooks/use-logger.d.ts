import { FC } from 'react';
export declare const useLogger: () => readonly [logger: {
    assert: <Args extends [condition?: boolean | undefined, ...data: any[]]>(...args: Args) => Args extends [...any[], infer Last] ? Last : Console;
    clear: <Args_1 extends []>(...args: Args_1) => Args_1 extends [...any[], infer Last] ? Last : Console;
    count: <Args_2 extends [label?: string | undefined]>(...args: Args_2) => Args_2 extends [...any[], infer Last] ? Last : Console;
    countReset: <Args_3 extends [label?: string | undefined]>(...args: Args_3) => Args_3 extends [...any[], infer Last] ? Last : Console;
    debug: <Args_4 extends any[]>(...args: Args_4) => Args_4 extends [...any[], infer Last] ? Last : Console;
    dir: <Args_5 extends [item?: any, options?: any]>(...args: Args_5) => Args_5 extends [...any[], infer Last] ? Last : Console;
    dirxml: <Args_6 extends any[]>(...args: Args_6) => Args_6 extends [...any[], infer Last] ? Last : Console;
    error: <Args_7 extends any[]>(...args: Args_7) => Args_7 extends [...any[], infer Last] ? Last : Console;
    group: <Args_8 extends any[]>(...args: Args_8) => Args_8 extends [...any[], infer Last] ? Last : Console;
    groupCollapsed: <Args_9 extends any[]>(...args: Args_9) => Args_9 extends [...any[], infer Last] ? Last : Console;
    groupEnd: <Args_10 extends []>(...args: Args_10) => Args_10 extends [...any[], infer Last] ? Last : Console;
    info: <Args_11 extends any[]>(...args: Args_11) => Args_11 extends [...any[], infer Last] ? Last : Console;
    log: <Args_12 extends any[]>(...args: Args_12) => Args_12 extends [...any[], infer Last] ? Last : Console;
    table: <Args_13 extends [tabularData?: any, properties?: string[] | undefined]>(...args: Args_13) => Args_13 extends [...any[], infer Last] ? Last : Console;
    time: <Args_14 extends [label?: string | undefined]>(...args: Args_14) => Args_14 extends [...any[], infer Last] ? Last : Console;
    timeEnd: <Args_15 extends [label?: string | undefined]>(...args: Args_15) => Args_15 extends [...any[], infer Last] ? Last : Console;
    timeLog: <Args_16 extends [label?: string | undefined, ...data: any[]]>(...args: Args_16) => Args_16 extends [...any[], infer Last] ? Last : Console;
    timeStamp: <Args_17 extends [label?: string | undefined]>(...args: Args_17) => Args_17 extends [...any[], infer Last] ? Last : Console;
    trace: <Args_18 extends any[]>(...args: Args_18) => Args_18 extends [...any[], infer Last] ? Last : Console;
    warn: <Args_19 extends any[]>(...args: Args_19) => Args_19 extends [...any[], infer Last] ? Last : Console;
}, enableLogging: import("@rhombus/func").Action<[enable?: boolean]>];
export declare const LoggerProvider: FC;
//# sourceMappingURL=use-logger.d.ts.map