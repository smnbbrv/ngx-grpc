import { Metadata, Status } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcClient } from './grpc-client';
import { GrpcHandler } from './grpc-handler';
import { GrpcMessage } from './grpc-message';
import { GrpcMessageClass } from './grpc-message-class';

export enum GrpcCallType {
  unary,
  serverStream,
}

export interface GrpcRequest<REQ extends GrpcMessage, RES extends GrpcMessage> {
  client: GrpcClient;
  type: GrpcCallType;
  requestData: REQ;
  requestMetadata: Metadata;
  path: string;
  requestClass: GrpcMessageClass<REQ>;
  responseClass: GrpcMessageClass<RES>;
}

export interface GrpcInterceptor {
  intercept<REQ extends GrpcMessage, RES extends GrpcMessage>(request: GrpcRequest<REQ, RES>, next: GrpcHandler): Observable<RES | Status>;
}
