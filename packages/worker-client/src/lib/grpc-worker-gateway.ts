import { Inject, Injectable } from '@angular/core';
import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMetadata, GrpcStatusEvent } from '@ngx-grpc/common';
import { GrpcWorkerApi } from '@ngx-grpc/worker';
import { Metadata } from 'grpc-web';
import { Observable, Observer } from 'rxjs';
import { GrpcWorkerClientSettings } from './grpc-worker-client';
import { GRPC_WORKER } from './tokens';

/** @dynamic */
@Injectable()
export class GrpcWorkerGateway {

  private lastId = 0;

  private connections = new Map<number, Observer<any>>();

  constructor(
    @Inject(GRPC_WORKER) private worker: Worker,
  ) {
    worker.onmessage = (event: MessageEvent) => {
      const data = event.data as GrpcWorkerApi.GrpcWorkerMessageRPCResponse<any>;
      const connection = this.connections.get(data.id);

      if (connection && data.type === GrpcWorkerApi.GrpcWorkerMessageType.rpcResponse) {
        switch (data.responseType) {
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error:
            connection.next(new GrpcStatusEvent(data.error.code, data.error.message, (data.error as any).metadata));
            connection.complete();
            this.connections.delete(data.id);
            break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status:
            connection.next(new GrpcStatusEvent(data.status.code, data.status.details, new GrpcMetadata(data.status.metadata)));
            break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data:
            connection.next(new GrpcDataEvent(data.response));
            break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end:
            connection.complete();
            this.connections.delete(data.id);
            break;
        }
      }
    };
  }

  configureServiceClient(serviceId: string, settings: GrpcWorkerClientSettings) {
    this.worker.postMessage({ type: GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig, serviceId, settings } as GrpcWorkerApi.GrpcWorkerMessageServiceClientConfig);
  }

  callUnaryFromWorker<Q extends GrpcMessage, S extends GrpcMessage>(serviceId: string, path: string, request: Q, metadata: Metadata): Observable<GrpcEvent<S>> {
    return new Observable(observer => {
      const id = this.createRequestId();

      this.connections.set(id, observer);

      this.worker.postMessage({
        type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
        id,
        serviceId,
        path,
        request,
        metadata,
      } as GrpcWorkerApi.GrpcWorkerMessageRPCRequest<Q>);

      return () => this.closeConnection(id);
    });
  }

  callServerStreamFromWorker<Q extends GrpcMessage, S extends GrpcMessage>(serviceId: string, path: string, request: Q, metadata: Metadata): Observable<GrpcEvent<S>> {
    return new Observable(observer => {
      const id = this.createRequestId();

      this.connections.set(id, observer);

      this.worker.postMessage({
        type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
        id,
        serviceId,
        path,
        request,
        metadata,
      } as GrpcWorkerApi.GrpcWorkerMessageRPCRequest<Q>);

      return () => this.closeConnection(id);
    });
  }

  closeConnection(id: number) {
    this.worker.postMessage({
      type: GrpcWorkerApi.GrpcWorkerMessageType.rpcCancel,
      id,
    } as GrpcWorkerApi.GrpcWorkerMessageRPCCancel);

    this.connections.delete(id);
  }

  private createRequestId() {
    return this.lastId++;
  }

}
