import { ByteSource } from 'google-protobuf';
import { GrpcMessage } from './grpc-message';
import { RecursivePartial } from './recursive-partial';

export interface GrpcMessageClass<M extends GrpcMessage> {
  new(m?: RecursivePartial<M>): M;
  fromBinary: (bytes: ByteSource) => M;
  toBinary: (instance: M) => ByteSource;
}
