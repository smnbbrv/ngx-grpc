import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GrpcMessage } from '@ngx-grpc/common';
import { GrpcLoggerModule } from '@ngx-grpc/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'grpc-web-client',
      },
      {
        path: 'grpc-web-client',
        loadChildren: () => import('./grpc-web-client-example/grpc-web-client-example.module').then(m => m.GrpcWebClientExampleModule),
      },
      {
        path: 'grpc-worker-client',
        loadChildren: () => import('./grpc-worker-client-example/grpc-worker-client-example.module').then(m => m.GrpcWorkerClientExampleModule),
      },
      {
        path: 'improbable-eng-grpc-web-client',
        loadChildren: () => import('./improbable-eng-grpc-web-client-example/improbable-eng-grpc-web-client-example.module').then(m => m.ImprobableEngGrpcWebClientExampleModule),
      },
    ]),
    GrpcLoggerModule.forRoot({
      settings: {
        requestMapper: (msg: GrpcMessage) => msg.toProtobufJSON(),
        responseMapper: (msg: GrpcMessage) => msg.toProtobufJSON(),
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
