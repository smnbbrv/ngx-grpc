import { GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcHandler } from './grpc-handler';

/**
 * Interceptor interface which should be implemented for custom interceptors
 */
export interface GrpcInterceptor {

  /**
   * Interceptor entry point
   *
   * Example:
   *
   * ```
   *  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {
   *    // here do something before request, e.g. patch messages, metadata, etc
   *
   *    return next.handle(request).pipe(
   *      // here handle all messages, status codes, metadata, errors, retries etc
   *    );
   *  }
   * ```
   *
   * @param request intercepted request
   * @param next current GrpcHandler to pass the messages through
   */
  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>>;

}
