import { Inject, Injectable, InjectionToken } from '@angular/core';
import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { GrpcHandler, GrpcInterceptor } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const GRPC_CONSOLE_LOGGER_ENABLED = new InjectionToken('GRPC_CONSOLE_LOGGER_ENABLED');

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
            console.log('%c>>', this.dataStyle, request.requestData.toObject());
            console.log('%c**', this.dataStyle, request.requestMetadata);
            console.log('%c<<', this.dataStyle, event.data.toObject());
            console.groupEnd();
          } else if (event.code !== 0) {
            console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, this.errorStyle);
            console.log('%c>>', this.errorStyle, request.requestData.toObject());
            console.error('%c<<', this.errorStyle, event);
            console.groupEnd();
          }
        }),
      );
    }

    return next.handle(request);
  }

}
