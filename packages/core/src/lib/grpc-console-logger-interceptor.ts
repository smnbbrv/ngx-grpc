import { Inject, Injectable, InjectionToken } from '@angular/core';
import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GrpcHandler } from './grpc-handler';
import { GrpcInterceptor } from './grpc-interceptor';

/**
 * A configuration for GrpcConsoleLoggerInterceptor to turn it on or off
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_CONSOLE_LOGGER_ENABLED, useValue: true },
 * ]
 * ```
 *
 * or more complex:
 *
 * ```
 * providers: [
 *   { provide: GRPC_CONSOLE_LOGGER_ENABLED, useFactory: () => localStorage.getItem('GRPC_CONSOLE_LOGGER_ENABLED') === 'true' || !environment.prod },
 * ]
 * ```
 */
export const GRPC_CONSOLE_LOGGER_ENABLED = new InjectionToken('GRPC_CONSOLE_LOGGER_ENABLED');

/**
 * Interceptor that implements logging of every request to the browser console
 *
 * Can be enabled / disabled by GRPC_CONSOLE_LOGGER_ENABLED injection token
 */
@Injectable()
export class GrpcConsoleLoggerInterceptor implements GrpcInterceptor {

  private dataStyle = 'color: #5c7ced;';
  private errorStyle = 'color: red;';

  constructor(@Inject(GRPC_CONSOLE_LOGGER_ENABLED) private enabled: boolean) { }

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {
    if (this.enabled) {
      const start = Date.now();

      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof GrpcDataEvent) {
            console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, this.dataStyle);
            console.log('%csc', this.dataStyle, request.client.getSettings());
            console.log('%c>>', this.dataStyle, request.requestData.toObject());
            console.log('%c**', this.dataStyle, request.requestMetadata);
            console.log('%c<<', this.dataStyle, event.data.toObject());
            console.groupEnd();
          } else if (event.code !== 0) {
            console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, this.errorStyle);
            console.log('%csc', this.dataStyle, request.client.getSettings());
            console.log('%c>>', this.errorStyle, request.requestData.toObject());
            console.log('%c**', this.errorStyle, request.requestMetadata);
            console.error('%c<<', this.errorStyle, event);
            console.groupEnd();
          }
        }),
      );
    }

    return next.handle(request);
  }

}
