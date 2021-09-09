import { Pointer } from './Pointer';

export interface SuperpoweredBufferConstructor<T extends ArrayBufferLike = Float32Array> {
    prototype: SuperpoweredBuffer<T>;


    new(length: number): SuperpoweredBuffer<T>;
}
export interface SuperpoweredBuffer<T extends ArrayBufferLike = Float32Array> {
    __arraybuffer__: ArrayBuffer;
    pointer: Pointer;
    length: number;
    array: T;
    free(): void;
}
