import { GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcHandler } from './grpc-handler';

export interface GrpcInterceptor {
  intercept<Q extends GrpcMessage<QMessage>, S extends GrpcMessage<SMessage>, QMessage = unknown, SMessage = unknown>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>>;
}
