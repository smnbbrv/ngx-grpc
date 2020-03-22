import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcCallType, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
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

  handle<Q extends GrpcMessage<QMessage>, S extends GrpcMessage<SMessage>, QMessage = unknown, SMessage = unknown>(request: GrpcRequest<Q, S>): Observable<GrpcEvent<S>> {
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
