import { Error, Metadata, Status } from 'grpc-web';
import { GrpcWorkerClientSettings } from './client-settings';

/* tslint:disable no-namespace */
export namespace GrpcWorkerApi {
  export enum GrpcWorkerMessageType {
    serviceClientConfig,
    rpcRequest,
    rpcCancel,
    rpcResponse,
  }

  export interface GrpcWorkerMessage {
    type: GrpcWorkerMessageType;
  }

  export interface GrpcWorkerMessageServiceClientConfig extends GrpcWorkerMessage {
    type: GrpcWorkerMessageType.serviceClientConfig;
    serviceId: string;
    settings: GrpcWorkerClientSettings;
  }

  export interface GrpcWorkerMessageRPCRequest<Q> extends GrpcWorkerMessage {
    type: GrpcWorkerMessageType.rpcRequest;
    id: number;
    serviceId: string;
    path: string;
    request: Q;
    metadata: Metadata;
  }

  export interface GrpcWorkerMessageRPCCancel extends GrpcWorkerMessage {
    type: GrpcWorkerMessageType.rpcCancel;
    id: number;
  }

  export enum GrpcWorkerMessageRPCResponseType {
    error,
    status,
    data,
    end,
  }

  export interface GrpcWorkerMessageRPCResponse<S> extends GrpcWorkerMessage {
    type: GrpcWorkerMessageType.rpcResponse;
    responseType: GrpcWorkerMessageRPCResponseType;
    id: number;
    error?: Error;
    status?: Status;
    response?: S;
  }

  export interface WorkerMessageEvent<D> extends Event {
    data: D;
  }
}
