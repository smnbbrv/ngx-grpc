import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { ImprobableEngGrpcWebClientFactory, ImprobableEngGrpcWebClientSettings } from './improbable-eng-grpc-web-client';
import { IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS } from './tokens';

export interface ImprobableEngGrpcWebClientRootOptions {
  settings?: ImprobableEngGrpcWebClientSettings;
}

export interface ImprobableEngGrpcWebClientChildOptions {
  settings?: ImprobableEngGrpcWebClientSettings;
}

@NgModule()
export class ImprobableEngGrpcWebClientModule {

  /**
   * Create ImprobableEngGrpcWebClientModule for using in AppModule (application root module)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forRoot(options?: ImprobableEngGrpcWebClientRootOptions): ModuleWithProviders<ImprobableEngGrpcWebClientModule> {
    const providers: Provider[] = [{ provide: GRPC_CLIENT_FACTORY, useClass: ImprobableEngGrpcWebClientFactory }];

    if (options?.settings) {
      providers.push({ provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: ImprobableEngGrpcWebClientModule, providers };
  }

  /**
   * Create ImprobableEngGrpcWebClientModule for using in children modules (incl. lazy modules)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forChild(options?: ImprobableEngGrpcWebClientChildOptions): ModuleWithProviders<ImprobableEngGrpcWebClientModule> {
    const providers: Provider[] = [{ provide: GRPC_CLIENT_FACTORY, useClass: ImprobableEngGrpcWebClientFactory }];

    if (options?.settings) {
      providers.push({ provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: ImprobableEngGrpcWebClientModule, providers };
  }

}
