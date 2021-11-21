/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
/// <reference types="gapi.client" />
/// <reference types="@maxim_mazurok/gapi.client.youtube" />
/** @internal */
export declare const loaded: Promise<void>;
/** @internal */
export declare type gapi = typeof gapi;
/** @internal */
export declare function loadLib<K extends keyof gapi>(lib: K): Promise<gapi[K]>;
//# sourceMappingURL=gapi.d.ts.map