import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { GrpcWorkerClientFactory, GrpcWorkerClientSettings } from './grpc-worker-client';
import { GrpcWorkerGateway } from './grpc-worker-gateway';
import { GRPC_WORKER, GRPC_WORKER_CLIENT_DEFAULT_SETTINGS } from './tokens';

export interface GrpcWorkerClientRootOptions {
  worker?: Worker;
  settings?: GrpcWorkerClientSettings;
}

export interface GrpcWorkerClientChildOptions {
  worker?: Worker;
  settings?: GrpcWorkerClientSettings;
}

@NgModule()
export class GrpcWorkerClientModule {

  /**
   * Create GrpcWorkerClientModule for using in AppModule (application root module)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forRoot(options?: GrpcWorkerClientRootOptions): ModuleWithProviders<GrpcWorkerClientModule> {
    const providers: Provider[] = [
      GrpcWorkerGateway,
      { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
    ];

    if (options?.worker) {
      providers.push({ provide: GRPC_WORKER, useValue: options.worker });
    }

    if (options?.settings) {
      providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcWorkerClientModule, providers };
  }

  /**
   * Create GrpcWorkerClientModule for using in children modules (incl. lazy modules)
   * You can provide the options here instead of injecting corresponding tokens separately
   */
  public static forChild(options?: GrpcWorkerClientChildOptions): ModuleWithProviders<GrpcWorkerClientModule> {
    const providers: Provider[] = [
      GrpcWorkerGateway,
      { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
    ];

    if (options?.worker) {
      providers.push({ provide: GRPC_WORKER, useValue: options.worker });
    }

    if (options?.settings) {
      providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
    }

    return { ngModule: GrpcWorkerClientModule, providers };
  }

}
