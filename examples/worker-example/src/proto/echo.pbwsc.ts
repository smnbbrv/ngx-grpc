/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcCallType } from '@ngx-grpc/common';
import { GrpcWorkerServiceClientDef } from '@ngx-grpc/worker';
import * as thisProto from './echo.pb';

/**
 * Client definition for use in worker
 */
export const GrpcWorkerEchoServiceClientDef: GrpcWorkerServiceClientDef = {
  serviceId: 'echo.EchoService',
  methods: {
    '/echo.EchoService/EchoOnce': {
      type: GrpcCallType.unary,
      reqclss: thisProto.EchoRequest,
      resclss: thisProto.EchoResponse,
    },
    '/echo.EchoService/EchoStream': {
      type: GrpcCallType.serverStream,
      reqclss: thisProto.EchoRequest,
      resclss: thisProto.EchoResponse,
    },
  },
};
