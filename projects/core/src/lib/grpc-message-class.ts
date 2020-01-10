import { ByteSource } from 'google-protobuf';
import { GrpcMessage } from './grpc-message';

export interface GrpcMessageClass<M extends GrpcMessage> {
  new(): M;
  fromBinary: (bytes: ByteSource) => M;
  toBinary: (instance: M) => ByteSource;
}
