/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { InjectionToken } from '@angular/core';
import { GrpcClientSettings } from '@ngx-grpc/common';
/*
  To configure the services you need to provide a configuration for each of them.

  E.g. you can create a module where you configure all of them and then import this module into your AppModule:

  const grpcSettings = { host: environment.grpcHost };

  @NgModule({
    providers: [
      { provide: GRPC_ECHO_SERVICE_CLIENT_SETTINGS, useValue: grpcSettings },
    ],
  })
  export class GrpcConfigModule { }
*/
export const GRPC_ECHO_SERVICE_CLIENT_SETTINGS = new InjectionToken<
  GrpcClientSettings
>('GRPC_ECHO_SERVICE_CLIENT_SETTINGS');
