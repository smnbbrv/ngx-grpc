import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import { GrpcMessage } from './grpc-message';

/**
 * Describes a gRPC message class
 */
export interface GrpcMessageClass<M extends GrpcMessage> {
  new(m?: any): M; // m is any because AsObject can be passed instead of the instance as well
  id: string;
  deserializeBinary: (bytes: ByteSource) => M;
  deserializeBinaryFromReader: (message: M, reader: BinaryReader) => void;
  serializeBinaryToWriter: (message: M, writer: BinaryWriter) => void;
}
