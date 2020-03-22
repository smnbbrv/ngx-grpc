import { Status } from 'grpc-web';
import { GrpcMessage } from './grpc-message';

export class GrpcDataEvent<T extends GrpcMessage<TMessage>, TMessage = unknown> {
  constructor(
    public data: T
  ) { }
}

export class GrpcStatusEvent implements Status {
  constructor(
    public code: number,
    public details: string,
    public metadata: { [prop: string]: string; },
  ) { }
}

export type GrpcEvent<T extends GrpcMessage<TMessage>, TMessage = unknown> = GrpcDataEvent<T, TMessage> | GrpcStatusEvent;
