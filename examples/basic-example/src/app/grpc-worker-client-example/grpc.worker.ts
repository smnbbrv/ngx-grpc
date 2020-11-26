/// <reference lib="webworker" />

import { GrpcWorker } from '@ngx-grpc/worker';
import { GrpcWorkerEchoServiceClientDef } from '../../proto/echo.pbwsc';

const worker = new GrpcWorker();

worker.register(
  // register here all the service clients definitions
  GrpcWorkerEchoServiceClientDef,
);

worker.start();
