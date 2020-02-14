import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcCallType, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Status } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcInterceptor } from './grpc-interceptor';
import { GRPC_INTERCEPTORS } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class GrpcHandler {

  constructor(
    @Optional() @Inject(GRPC_INTERCEPTORS) private interceptors: GrpcInterceptor[],
  ) {
    this.interceptors = interceptors || [];
  }

  handleUnary<REQ extends GrpcMessage, RES extends GrpcMessage>(request: GrpcRequest<REQ, RES>): Observable<RES> {
    return this.handle(request) as Observable<RES>;
  }

  handleServerStream<REQ extends GrpcMessage, RES extends GrpcMessage>(request: GrpcRequest<REQ, RES>): Observable<RES | Status> {
    return this.handle(request) as Observable<RES | Status>;
  }

  handle<REQ extends GrpcMessage, RES extends GrpcMessage>(request: GrpcRequest<REQ, RES>): Observable<RES | Status> {
    const interceptors = (this.interceptors || []).slice();
    const interceptor = interceptors.shift();

    if (interceptor) {
      return interceptor.intercept(request, new GrpcHandler(interceptors));
    }

    if (request.type === GrpcCallType.unary) {
      return request.client.unary(
        request.path,
        request.requestData,
        request.requestMetadata,
        request.requestClass,
        request.responseClass,
      );
    }

    return request.client.serverStream(
      request.path,
      request.requestData,
      request.requestMetadata,
      request.requestClass,
      request.responseClass,
    );
  }

}
