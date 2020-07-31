import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcCallType, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcInterceptor } from './grpc-interceptor';
import { GRPC_INTERCEPTORS } from './injection-tokens';
import { ServerStreamRpcRef, UnaryRpcRef } from './rpc-ref';

/**
 * Core gRPC transport class. Implements creation and binding of RPCs to the clients.
 * There is a root GrpcHandler that handles all initial requests;
 * however for every interception a new instance of GrpcHandler is created and passed to the interceptor
 */
@Injectable({
  providedIn: 'root'
})
export class GrpcHandler {

  constructor(
    @Optional() @Inject(GRPC_INTERCEPTORS) private interceptors: GrpcInterceptor[],
  ) {
    this.interceptors = interceptors || [];
  }

  /**
   * Create a UnaryRpcRef
   * @param request request to create RPC call from
   */
  createUnaryRpcRef<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>) {
    return new UnaryRpcRef(this.handle(request));
  }

  /**
   * Create a ServerStreamRpcRef
   * @param request request to create RPC call from
   */
  createServerStreamRpcRef<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>) {
    return new ServerStreamRpcRef(this.handle(request));
  }

  /**
   * Handles the gRPC request passing it through the interceptors array
   * Recursively calls all interceptors with a new instance of the GrpcHandler
   * @param request a GrpcRequest to execute
   * @returns Observable of events returned by the GrpcClient implementation
   */
  handle<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>): Observable<GrpcEvent<S>> {
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
