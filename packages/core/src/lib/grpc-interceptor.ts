import { GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Status } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcHandler } from './grpc-handler';

export interface GrpcInterceptor {
  intercept<REQ extends GrpcMessage, RES extends GrpcMessage>(request: GrpcRequest<REQ, RES>, next: GrpcHandler): Observable<RES | Status>;
}
