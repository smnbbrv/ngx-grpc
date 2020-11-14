import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcClient, GrpcClientFactory, GrpcClientSettings, GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMessageClass } from '@ngx-grpc/common';
import { Metadata } from 'grpc-web';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GrpcWorkerGateway } from './grpc-worker-gateway';
import { GRPC_WORKER_CLIENT_DEFAULT_SETTINGS } from './tokens';

/**
 * GrpcClientFactory implementation based on grpc-web running in worker
 */
@Injectable({
  providedIn: 'root',
})
export class GrpcWorkerClientFactory implements GrpcClientFactory {

  constructor(
    @Optional() @Inject(GRPC_WORKER_CLIENT_DEFAULT_SETTINGS) private defaultSettings: GrpcClientSettings,
    private gateway: GrpcWorkerGateway,
  ) { }

  createClient(serviceId: string, customSettings: GrpcClientSettings) {
    const settings = customSettings || this.defaultSettings;

    if (!settings) {
      throw new Error(`Worker client factory: no settings provided for ${serviceId}`);
    }

    return new GrpcWorkerClient(
      serviceId,
      { ...settings },
      this.gateway,
    );
  }

}

/**
 * GrpcClient implementation based on grpc-web running in worker
 */
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
        }),
      );
  }

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return this.gateway
      .callServerStreamFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata)
      .pipe(
        tap(res => {
          if (res instanceof GrpcDataEvent) {
            res.data = new resclss(res.data as any);
          }
        }),
      );
  }

}
