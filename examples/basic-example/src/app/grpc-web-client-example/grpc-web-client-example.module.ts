import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';
import { ExamplePageModule } from '../example-page/example-page.module';
import { ExamplePageComponent } from '../example-page/example-page/example-page.component';
import { GrpcWebClientExampleComponent } from './grpc-web-client-example.component';

@NgModule({
  declarations: [GrpcWebClientExampleComponent],
  imports: [
    ExamplePageModule,
    RouterModule.forChild([{ path: '', component: ExamplePageComponent }]),
    GrpcCoreModule.forChild(),
    GrpcWebClientModule.forChild({
      settings: { host: 'http://localhost:8080' },
    }),
  ],
})
export class GrpcWebClientExampleModule { }
