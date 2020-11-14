import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrpcConsoleLoggerInterceptor, GRPC_CLIENT_FACTORY, GRPC_CONSOLE_LOGGER_ENABLED, GRPC_INTERCEPTORS } from '@ngx-grpc/core';
import { GrpcWebClientFactory } from '@ngx-grpc/grpc-web-client';
import { environment } from '../environments/environment';
import { GRPC_ECHO_SERVICE_CLIENT_SETTINGS } from '../proto/echo.pbconf';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory },
    { provide: GRPC_ECHO_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080' } },
    { provide: GRPC_CONSOLE_LOGGER_ENABLED, useFactory: () => localStorage.getItem('GRPC_CONSOLE_LOGGER_ENABLED') === 'true' || !environment.production },
    { provide: GRPC_INTERCEPTORS, useClass: GrpcConsoleLoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
