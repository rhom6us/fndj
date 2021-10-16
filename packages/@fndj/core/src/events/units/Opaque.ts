export type Opaque<T> = T & { readonly __opaque: unique symbol; };
