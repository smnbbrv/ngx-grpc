export interface GrpcMessage<T = unknown> {
  toObject(): T;
  toJSON(): T;
}
