import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWorkerClientModule } from '@ngx-grpc/worker-client';
import { ExamplePageModule } from '../example-page/example-page.module';
import { ExamplePageComponent } from '../example-page/example-page/example-page.component';
import { GrpcWorkerClientExampleComponent } from './grpc-worker-client-example.component';

@NgModule({
  declarations: [GrpcWorkerClientExampleComponent],
  imports: [
    ExamplePageModule,
    RouterModule.forChild([{ path: '', component: ExamplePageComponent }]),
    GrpcCoreModule.forChild(),
    GrpcWorkerClientModule.forChild({
      worker: new Worker('./grpc.worker', { type: 'module' }),
      settings: { host: 'http://localhost:8080' },
    }),
  ],
})
export class GrpcWorkerClientExampleModule { }
