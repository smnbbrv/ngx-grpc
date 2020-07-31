/**
 * gRPC message interface
 */
export interface GrpcMessage {
  toObject(): any;
  toJSON(): any;
}
