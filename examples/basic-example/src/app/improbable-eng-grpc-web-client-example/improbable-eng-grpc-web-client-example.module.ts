import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { grpc } from '@improbable-eng/grpc-web';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { ImprobableEngGrpcWebClientModule } from '@ngx-grpc/improbable-eng-grpc-web-client';
import { ExamplePageModule } from '../example-page/example-page.module';
import { ExamplePageComponent } from '../example-page/example-page/example-page.component';
import { ImprobableEngGrpcWebClientExampleComponent } from './improbable-eng-grpc-web-client-example.component';

@NgModule({
  declarations: [ImprobableEngGrpcWebClientExampleComponent],
  imports: [
    ExamplePageModule,
    RouterModule.forChild([{ path: '', component: ExamplePageComponent }]),
    GrpcCoreModule.forChild(),
    ImprobableEngGrpcWebClientModule.forChild({
      settings: {
        host: 'http://localhost:8080',
        transport: grpc.CrossBrowserHttpTransport({}),
      },
    }),
  ],
})
export class ImprobableEngGrpcWebClientExampleModule { }
