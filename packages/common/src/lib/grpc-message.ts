/**
 * gRPC message interface
 */
export interface GrpcMessage {
  serializeBinary(): Uint8Array;
  toObject(): any;
  toJSON(): any;
}
