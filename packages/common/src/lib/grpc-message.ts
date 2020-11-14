import { GrpcMessagePool } from './grpc-message-pool';

/**
 * gRPC message interface
 */
export interface GrpcMessage {
  serializeBinary(): Uint8Array;
  toObject(): any;
  toJSON(): any;
  toProtobufJSON(options?: ToProtobufJSONOptions): any;
}

/**
 * Options to pass to `toProtobufJSON(options)`
 */
export interface ToProtobufJSONOptions {

  /**
   * Message pool to unpack google.protobuf.Any. If you do not expect the message or any of its descendants to be google.protobuf.Any this option should be omitted.
   */
  messagePool?: GrpcMessagePool;

}
