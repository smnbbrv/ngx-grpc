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
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import { GRPC_ECHO_SERVICE_CLIENT_SETTINGS } from './echo.pbconf';
/**
 * Service client implementation for echo.EchoService
 */
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
   * Unary RPC for /echo.EchoService/EchoOnce
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.EchoResponse>
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
   * Unary RPC for /echo.EchoService/EchoOnce
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<GrpcEvent<thisProto.EchoResponse>>
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
   * Server streaming RPC for /echo.EchoService/EchoStream
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.EchoResponse>
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
   * Server streaming RPC for /echo.EchoService/EchoStream
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<GrpcEvent<thisProto.EchoResponse>>
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
