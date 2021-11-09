export class CheapRingBuffer<T> extends Array<T> {
  #position = 0;
  override push(value: T) {
    super.shift();
    return super.push(value);
  }
}
