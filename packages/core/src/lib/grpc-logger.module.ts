import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GrpcLoggerInterceptor, GrpcLoggerSettings, GRPC_LOGGER_SETTINGS } from './grpc-logger-interceptor';
import { GRPC_INTERCEPTORS } from './injection-tokens';

export interface GrpcLoggerRootOptions {
  settings: GrpcLoggerSettings;
}

export interface GrpcLoggerChildOptions {
  settings: GrpcLoggerSettings;
}

@NgModule()
export class GrpcLoggerModule {

  /**
   * Create GrpcLoggerModule for using in AppModule (application root module)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forRoot(options?: GrpcLoggerRootOptions): ModuleWithProviders<GrpcLoggerModule> {
    const providers: Provider[] = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];

    if (options?.settings) {
      providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcLoggerModule, providers };
  }

  /**
   * Create GrpcCoreModule for using in children modules (incl. lazy modules)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forChild(options?: GrpcLoggerChildOptions): ModuleWithProviders<GrpcLoggerModule> {
    const providers: Provider[] = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];

    if (options?.settings) {
      providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcLoggerModule, providers };
  }

}
