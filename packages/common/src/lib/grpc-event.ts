import { Status } from 'grpc-web';
import { GrpcMessage } from './grpc-message';

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
export class GrpcStatusEvent implements Status {
  constructor(
    public code: number,
    public details: string,
    public metadata: { [prop: string]: string; },
  ) { }
}

/**
 * GrpcEvent can be either data or status event
 */
export type GrpcEvent<T extends GrpcMessage> = GrpcDataEvent<T> | GrpcStatusEvent;
