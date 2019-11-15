import { ByteSource } from 'google-protobuf';

export interface GrpcMessageClass<M> {
  new(): M;
  fromBinary: (bytes: ByteSource) => M;
  toBinary: (instance: M) => ByteSource;
}
