import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GrpcStandardClientFactory, GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { GRPC_ECHO_SERVICE_CLIENT_SETTINGS } from '../proto/echo.pbconf';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: GRPC_CLIENT_FACTORY, useClass: GrpcStandardClientFactory },
    { provide: GRPC_ECHO_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
