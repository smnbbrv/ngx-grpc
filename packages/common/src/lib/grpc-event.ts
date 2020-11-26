import { GrpcMessage } from './grpc-message';
import { GrpcMetadata } from './grpc-metadata';

/**
 * Data event. This event is emitted when the new message arrives from the server
 */
export class GrpcDataEvent<T extends GrpcMessage> {
  constructor(
    public data: T,
  ) { }
}

/**
 * Status event. This event is emitted when the new status and metadata arrives from the server
 */
export class GrpcStatusEvent {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public metadata: GrpcMetadata,
  ) { }
}

/**
 * GrpcEvent can be either data or status event
 */
export type GrpcEvent<T extends GrpcMessage> = GrpcDataEvent<T> | GrpcStatusEvent;
