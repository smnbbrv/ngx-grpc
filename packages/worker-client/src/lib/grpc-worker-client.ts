import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcClient, GrpcClientFactory, GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcMetadata } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GrpcWorkerGateway } from './grpc-worker-gateway';
import { GRPC_WORKER_CLIENT_DEFAULT_SETTINGS } from './tokens';

/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface GrpcWorkerClientSettings {
  host: string;
  format?: string;
  suppressCorsPreflight?: boolean;
  withCredentials?: boolean;
}

/**
 * GrpcClientFactory implementation based on grpc-web running in worker
 */
@Injectable()
export class GrpcWorkerClientFactory implements GrpcClientFactory<GrpcWorkerClientSettings> {

  constructor(
    @Optional() @Inject(GRPC_WORKER_CLIENT_DEFAULT_SETTINGS) private defaultSettings: GrpcWorkerClientSettings,
    private gateway: GrpcWorkerGateway,
  ) { }

  createClient(serviceId: string, customSettings: GrpcWorkerClientSettings) {
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
export class GrpcWorkerClient implements GrpcClient<GrpcWorkerClientSettings> {

  constructor(
    private serviceId: string,
    private settings: GrpcWorkerClientSettings,
    private gateway: GrpcWorkerGateway,
  ) {
    this.gateway.configureServiceClient(this.serviceId, this.settings);
  }

  getSettings(): GrpcWorkerClientSettings {
    return { ...this.settings };
  }

  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: GrpcMetadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return this.gateway
      .callUnaryFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata?.toObject() ?? {})
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
    metadata: GrpcMetadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return this.gateway
      .callServerStreamFromWorker<Q, S>(this.serviceId, path, req.toObject(), metadata?.toObject() ?? {})
      .pipe(
        tap(res => {
          if (res instanceof GrpcDataEvent) {
            res.data = new resclss(res.data as any);
          }
        }),
      );
  }

}
