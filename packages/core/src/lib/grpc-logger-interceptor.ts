import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GrpcHandler } from './grpc-handler';
import { GrpcInterceptor } from './grpc-interceptor';

/**
 * A configuration for GrpcLoggerInterceptor
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useValue: { enabled: true } },
 * ]
 * ```
 *
 * or more complex:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useFactory: () => { enabled: localStorage.getItem('GRPC_LOGGER_SETTINGS') === 'true' || !environment.prod } },
 * ]
 * ```
 */
export const GRPC_LOGGER_SETTINGS = new InjectionToken('GRPC_LOGGER_SETTINGS');


/**
 * A configuration definition for GrpcLoggerInterceptor
 */
export interface GrpcLoggerSettings {
  /**
   * Enables / disables the output, default true
   */
  enabled?: boolean;
  /**
   * Includes client settings into the logs, default true
   */
  logClientSettings?: boolean;
  /**
   * Includes request metadata into the logs, default true
   */
  logMetadata?: boolean;
  /**
   * Logs events with status code OK (0), default false
   */
  logStatusCodeOk?: boolean;
  /**
   * Request mapper function, defines what output is generated for the given message.
   * The default implementation is `(msg) => msg.toObject()`.
   * According to your preferences you might choose e.g. `(msg) => msg.toProtobufJSON()` instead.
   */
  requestMapper?: (msg: GrpcMessage) => any;
  /**
   * Response mapper function, defines what output is generated for the given message.
   * The default implementation is `(msg) => msg.toObject()`.
   * According to your preferences you might choose e.g. `(msg) => msg.toProtobufJSON()` instead.
   */
  responseMapper?: (msg: GrpcMessage) => any;
}

/**
 * Interceptor that implements logging of every request to the browser console
 *
 * Can be enabled / disabled by GRPC_LOGGER_ENABLED injection token
 */
@Injectable()
export class GrpcLoggerInterceptor implements GrpcInterceptor {

  private dataStyle = 'color: #5c7ced;';
  private errorStyle = 'color: red;';
  private statusOkStyle = 'color: #0ffcf5;';

  private settings: GrpcLoggerSettings;

  constructor(@Optional() @Inject(GRPC_LOGGER_SETTINGS) settings: GrpcLoggerSettings = {}) {
    this.settings = {
      enabled: settings.enabled ?? true,
      logClientSettings: settings.logClientSettings ?? true,
      logMetadata: settings.logMetadata ?? true,
      logStatusCodeOk: settings.logStatusCodeOk ?? false,
      requestMapper: settings.requestMapper ?? ((msg: GrpcMessage) => msg.toObject()),
      responseMapper: settings.responseMapper ?? ((msg: GrpcMessage) => msg.toObject()),
    };
  }

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {
    if (this.settings.enabled) {
      const start = Date.now();

      return next.handle(request).pipe(
        tap(event => {
          const style = event instanceof GrpcDataEvent ? this.dataStyle : event.statusCode !== 0 ? this.errorStyle : this.statusOkStyle;
          const openGroup = () => console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, style);
          const printSettings = () => {
            if (this.settings.logClientSettings) {
              console.log('%csc', style, request.client.getSettings());
            }
          };
          const printMetadata = () => {
            if (this.settings.logMetadata) {
              console.log('%c**', style, request.requestMetadata.toObject());
            }
          };
          const printRequest = () => console.log('%c>>', style, this.settings.requestMapper(request.requestData));
          const closeGroup = () => console.groupEnd();

          if (event instanceof GrpcDataEvent) {
            openGroup();
            printSettings();
            printRequest();
            printMetadata();
            console.log('%c<<', style, this.settings.responseMapper(event.data));
            closeGroup();
          } else if (event.statusCode !== 0) {
            openGroup();
            printSettings();
            printRequest();
            printMetadata();
            console.log('%c<<', style, event);
            closeGroup();
          } else if (event.statusCode === 0 && this.settings.logStatusCodeOk) {
            openGroup();
            printSettings();
            printRequest();
            printMetadata();
            console.log('%c<<', style, event);
            closeGroup();
          }
        }),
      );
    }

    return next.handle(request);
  }

}
