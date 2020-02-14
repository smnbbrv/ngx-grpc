import { Injectable } from '@angular/core';
import { GrpcClient, GrpcClientFactory, GrpcClientSettings, GrpcMessage, GrpcMessageClass } from '@ngx-grpc/common';
import { Metadata, Status } from 'grpc-web';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  ): Observable<S> {
    return this.gateway
      .callUnaryFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata)
      .pipe(
        map(res => new resclss(res as any))
      );
  }

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>
  ): Observable<S | Status> {
    return this.gateway
      .callServerStreamFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata)
      .pipe(
        map(res => {
          // todo check if status
          return new resclss(res as any);
        })
      );
  }

}
