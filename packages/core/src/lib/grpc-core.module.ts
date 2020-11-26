import { ModuleWithProviders, NgModule } from '@angular/core';
import { GrpcHandler } from './grpc-handler';

@NgModule()
export class GrpcCoreModule {

  /**
   * Create GrpcCoreModule for using in AppModule (application root module)
   */
  public static forRoot(): ModuleWithProviders<GrpcCoreModule> {
    return {
      ngModule: GrpcCoreModule,
      providers: [
        GrpcHandler,
      ],
    };
  }

  /**
   * Create GrpcCoreModule for using in children modules (incl. lazy modules)
   */
  public static forChild(): ModuleWithProviders<GrpcCoreModule> {
    return {
      ngModule: GrpcCoreModule,
      providers: [
        GrpcHandler,
      ],
    };
  }

}
