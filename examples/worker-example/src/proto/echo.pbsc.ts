/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcClientSettings,
  GrpcEvent,
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors,
} from '@ngx-grpc/core';
import { Metadata } from 'grpc-web';
import { Observable } from 'rxjs';
import * as thisProto from './echo.pb';
import { GRPC_ECHO_SERVICE_CLIENT_SETTINGS } from './echo.pbconf';
@Injectable({
  providedIn: 'root',
})
export class EchoServiceClient {
  private client: GrpcClient;

  constructor(
    @Optional()
    @Inject(GRPC_ECHO_SERVICE_CLIENT_SETTINGS)
    settings: GrpcClientSettings,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('echo.EchoService', settings);
  }

  /**
   * Unary RPC. Emits messages and throws errors on non-zero status codes
   * @param thisProto.EchoRequest request
   * @param Metadata metadata
   * @return Observable<thisProto.EchoResponse>
   */
  echoOnce(
    requestData: thisProto.EchoRequest,
    requestMetadata: Metadata = {}
  ): Observable<thisProto.EchoResponse> {
    return this.echoOnce$eventStream(requestData, requestMetadata).pipe(
      throwStatusErrors(),
      takeMessages()
    );
  }

  /**
   * Unary RPC. Emits data and status events; does not throw errors by design
   * @param thisProto.EchoRequest request
   * @param Metadata metadata
   * @return Observable<GrpcEvent<thisProto.EchoResponse>>
   */
  echoOnce$eventStream(
    requestData: thisProto.EchoRequest,
    requestMetadata: Metadata = {}
  ): Observable<GrpcEvent<thisProto.EchoResponse>> {
    return this.handler.handle({
      type: GrpcCallType.unary,
      client: this.client,
      path: '/echo.EchoService/EchoOnce',
      requestData,
      requestMetadata,
      requestClass: thisProto.EchoRequest,
      responseClass: thisProto.EchoResponse,
    });
  }

  /**
   * Server streaming RPC. Emits messages and throws errors on non-zero status codes
   * @param thisProto.EchoRequest request
   * @param Metadata metadata
   * @return Observable<thisProto.EchoResponse>
   */
  echoStream(
    requestData: thisProto.EchoRequest,
    requestMetadata: Metadata = {}
  ): Observable<thisProto.EchoResponse> {
    return this.echoStream$eventStream(requestData, requestMetadata).pipe(
      throwStatusErrors(),
      takeMessages()
    );
  }

  /**
   * Server streaming RPC. Emits data and status events; does not throw errors by design
   * @param thisProto.EchoRequest request
   * @param Metadata metadata
   * @return Observable<GrpcEvent<thisProto.EchoResponse>>
   */
  echoStream$eventStream(
    requestData: thisProto.EchoRequest,
    requestMetadata: Metadata = {}
  ): Observable<GrpcEvent<thisProto.EchoResponse>> {
    return this.handler.handle({
      type: GrpcCallType.serverStream,
      client: this.client,
      path: '/echo.EchoService/EchoStream',
      requestData,
      requestMetadata,
      requestClass: thisProto.EchoRequest,
      responseClass: thisProto.EchoResponse,
    });
  }
}
