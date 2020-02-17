import { Injectable } from '@angular/core';
import { GrpcClient, GrpcClientFactory, GrpcClientSettings, GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMessageClass } from '@ngx-grpc/common';
import { Metadata } from 'grpc-web';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GrpcWorkerGateway } from './grpc-worker-gateway';

@Injectable({
  providedIn: 'root'
})
export class GrpcWorkerClientFactory implements GrpcClientFactory {

  constructor(
    private gateway: GrpcWorkerGateway
  ) { }

  createClient(serviceId: string, settings: GrpcClientSettings) {
    return new GrpcWorkerClient(
      serviceId,
      { ...settings },
      this.gateway,
    );
  }

}

export class GrpcWorkerClient implements GrpcClient {

  constructor(
    private serviceId: string,
    private settings: GrpcClientSettings,
    private gateway: GrpcWorkerGateway,
  ) {
    this.gateway.configureServiceClient(this.serviceId, this.settings);
  }

  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return this.gateway
      .callUnaryFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata)
      .pipe(
        tap(res => {
          if (res instanceof GrpcDataEvent) {
            res.data = new resclss(res.data as any);
          }
        })
      );
  }

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>
  ): Observable<GrpcEvent<S>> {
    return this.gateway
      .callServerStreamFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata)
      .pipe(
        tap(res => {
          if (res instanceof GrpcDataEvent) {
            res.data = new resclss(res.data as any);
          }
        })
      );
  }

}
