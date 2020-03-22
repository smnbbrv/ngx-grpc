import { ByteSource } from 'google-protobuf';
import { GrpcMessage } from './grpc-message';
import { RecursivePartial } from './recursive-partial';

export interface GrpcMessageClass<M extends GrpcMessage<TMessage>, TMessage = unknown> {
  new(m?: RecursivePartial<M>): M;
  fromBinary: (bytes: ByteSource) => M;
  toBinary: (instance: M) => ByteSource;
}
