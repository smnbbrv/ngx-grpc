import { Metadata } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcEvent } from './grpc-event';
import { GrpcMessage } from './grpc-message';
import { GrpcMessageClass } from './grpc-message-class';

export interface GrpcClientFactory {
  createClient(serviceId: string, settings: GrpcClientSettings): GrpcClient;
}

export interface GrpcClient {

  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>>;

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>
  ): Observable<GrpcEvent<S>>;

}

export interface GrpcClientSettings {
  host: string;
  format?: string;
  suppressCorsPreflight?: boolean;
}

export enum GrpcCallType {
  unary,
  serverStream,
}

export interface GrpcRequest<Q extends GrpcMessage, S extends GrpcMessage> {
  path: string;
  client: GrpcClient;
  type: GrpcCallType;
  requestData: Q;
  requestMetadata: Metadata;
  requestClass: GrpcMessageClass<Q>;
  responseClass: GrpcMessageClass<S>;
}
