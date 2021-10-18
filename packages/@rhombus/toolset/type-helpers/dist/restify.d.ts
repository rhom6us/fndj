export declare type Restify<T> = T extends void ? [] : T extends null ? [] : T extends undefined ? [] : T extends any[] ? T : [
    T
];
export declare function restify<T>(arg: T): Restify<T>;
export declare type Unrestify<T extends any[]> = T extends [] ? void : T extends [infer R] | [infer Q] | [infer P] | [infer O] ? R | Q | P | O : T extends [infer R] | [infer Q] | [infer P] ? R | Q | P : T extends [infer R] | [infer Q] ? R | Q : T extends [infer R] ? R : T extends any[] ? T : never;
export declare function unrestify<T extends any[]>(arg: T): Unrestify<T>;
