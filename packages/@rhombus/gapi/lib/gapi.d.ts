/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
/// <reference types="gapi.client" />
/// <reference types="@maxim_mazurok/gapi.client.youtube" />
export declare type Gapi = typeof gapi;
export declare function loadLib<K extends keyof Gapi>(lib: K): Promise<Gapi[K]>;
//# sourceMappingURL=gapi.d.ts.map