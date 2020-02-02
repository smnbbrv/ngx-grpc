import { Metadata, Status } from 'grpc-web';
import { Observable } from 'rxjs';
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
  ): Observable<S>;

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>
  ): Observable<S | Status>;

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

export interface GrpcRequest<REQ extends GrpcMessage, RES extends GrpcMessage> {
  path: string;
  client: GrpcClient;
  type: GrpcCallType;
  requestData: REQ;
  requestMetadata: Metadata;
  requestClass: GrpcMessageClass<REQ>;
  responseClass: GrpcMessageClass<RES>;
}
