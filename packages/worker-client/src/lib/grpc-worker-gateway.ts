import { Inject, Injectable } from '@angular/core';
import { GrpcClientSettings } from '@ngx-grpc/common';
import { GrpcWorkerApi } from '@ngx-grpc/worker';
import { Metadata, Status } from 'grpc-web';
import { Observable, Observer } from 'rxjs';
import { GRPC_WORKER } from './tokens';

/** @dynamic */
@Injectable({
  providedIn: 'root',
})
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
            connection.error(data.error);
            this.connections.delete(data.id);
            break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status: connection.next(data.status); break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data: connection.next(data.response); break;
          case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end:
            connection.complete();
            this.connections.delete(data.id);
            break;
        }
      }
    };
  }

  configureServiceClient(serviceId: string, settings: GrpcClientSettings) {
    this.worker.postMessage({ type: GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig, serviceId, settings } as GrpcWorkerApi.GrpcWorkerMessageServiceClientConfig);
  }

  callUnaryFromWorker<Q, S>(serviceId: string, path: string, request: Q, metadata: Metadata): Observable<S> {
    return new Observable(observer => {
      const id = this.createRequestId();

      this.connections.set(id, observer);

      this.worker.postMessage({
        type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
        id,
        serviceId,
        path,
        request,
        metadata
      } as GrpcWorkerApi.GrpcWorkerMessageRPCRequest<Q>);

      return () => this.closeConnection(id);
    });
  }

  callServerStreamFromWorker<Q, S>(serviceId: string, path: string, request: Q, metadata: Metadata): Observable<S | Status> {
    return new Observable(observer => {
      const id = this.createRequestId();

      this.connections.set(id, observer);

      this.worker.postMessage({
        type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
        id,
        serviceId,
        path,
        request,
        metadata
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
