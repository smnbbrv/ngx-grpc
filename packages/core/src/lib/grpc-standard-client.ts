import { Injectable } from '@angular/core';
import { GrpcClient, GrpcClientFactory, GrpcClientSettings, GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcStatusEvent } from '@ngx-grpc/common';
import { AbstractClientBase, GrpcWebClientBase, Metadata } from 'grpc-web';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrpcStandardClientFactory implements GrpcClientFactory {

  createClient(serviceId: string, settings: GrpcClientSettings) {
    return new GrpcStandardClient({ ...settings });
  }

}

export class GrpcStandardClient implements GrpcClient {

  private client: GrpcWebClientBase;

  constructor(
    private settings: GrpcClientSettings,
  ) {
    this.client = new GrpcWebClientBase(this.settings);
  }

  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return new Observable(obs => {
      const stream = this.client.rpcCall(
        this.settings.host + path,
        req,
        metadata || {},
        new AbstractClientBase.MethodInfo(
          resclss,
          (request: Q) => reqclss.toBinary(request),
          resclss.fromBinary
        ),
        () => null
      );

      // take only status 0 because unary error already includes non-zero statuses
      stream.on('status', status => status.code === 0 ? obs.next(new GrpcStatusEvent(status.code, status.details, status.metadata)) : null);
      stream.on('error', error => {
        obs.next(new GrpcStatusEvent(error.code, error.message, (error as any).metadata));
        obs.complete();
      });
      stream.on('data', data => obs.next(new GrpcDataEvent(data)));
      stream.on('end', () => obs.complete());

      return () => stream.cancel();
    });
  }

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>
  ): Observable<GrpcEvent<S>> {
    return new Observable(obs => {
      const stream = this.client.serverStreaming(
        this.settings.host + path,
        req,
        metadata || {},
        new AbstractClientBase.MethodInfo(resclss, (request: Q) => reqclss.toBinary(request), resclss.fromBinary)
      );

      stream.on('status', status => obs.next(new GrpcStatusEvent(status.code, status.details, status.metadata)));
      stream.on('error', error => {
        obs.next(new GrpcStatusEvent(error.code, error.message, (error as any).metadata));
        obs.complete();
      });
      stream.on('data', data => obs.next(new GrpcDataEvent(data)));
      stream.on('end', () => obs.complete());

      return () => stream.cancel();
    });
  }

}
