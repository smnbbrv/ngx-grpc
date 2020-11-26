import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { GrpcWebClientFactory, GrpcWebClientSettings } from './grpc-web-client';
import { GRPC_WEB_CLIENT_DEFAULT_SETTINGS } from './tokens';

export interface GrpcWebClientRootOptions {
  settings?: GrpcWebClientSettings;
}

export interface GrpcWebClientChildOptions {
  settings?: GrpcWebClientSettings;
}

@NgModule()
export class GrpcWebClientModule {

  /**
   * Create GrpcWebClientModule for using in AppModule (application root module)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forRoot(options?: GrpcWebClientRootOptions): ModuleWithProviders<GrpcWebClientModule> {
    const providers: Provider[] = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];

    if (options?.settings) {
      providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcWebClientModule, providers };
  }

  /**
   * Create GrpcWebClientModule for using in children modules (incl. lazy modules)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forChild(options?: GrpcWebClientChildOptions): ModuleWithProviders<GrpcWebClientModule> {
    const providers: Provider[] = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];

    if (options?.settings) {
      providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcWebClientModule, providers };
  }

}
