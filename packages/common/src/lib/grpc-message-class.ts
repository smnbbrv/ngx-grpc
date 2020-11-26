import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import { GrpcMessage } from './grpc-message';
import { RecursivePartial } from './recursive-partial';

/**
 * Describes a gRPC message class
 */
export interface GrpcMessageClass<M extends GrpcMessage> {
  new(m?: RecursivePartial<M>): M;
  id: string;
  deserializeBinary: (bytes: ByteSource) => M;
  deserializeBinaryFromReader: (message: M, reader: BinaryReader) => void;
  serializeBinaryToWriter: (message: M, writer: BinaryWriter) => void;
}
