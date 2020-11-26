import { Inject, Injectable, Optional } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { Metadata } from '@improbable-eng/grpc-web/dist/typings/metadata';
import { TransportFactory } from '@improbable-eng/grpc-web/dist/typings/transports/Transport';
import { GrpcClient, GrpcClientFactory, GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcMetadata, GrpcStatusEvent } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS } from './tokens';

/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface ImprobableEngGrpcWebClientSettings {
  host: string;
  transport: TransportFactory;
  debug?: boolean;
}

/**
 * GrpcClientFactory implementation based on @improbable-eng/grpc-web
 */
@Injectable()
export class ImprobableEngGrpcWebClientFactory implements GrpcClientFactory<ImprobableEngGrpcWebClientSettings> {

  constructor(
    @Optional() @Inject(IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS) private defaultSettings: ImprobableEngGrpcWebClientSettings,
  ) { }

  createClient(serviceId: string, customSettings: ImprobableEngGrpcWebClientSettings) {
    const settings = customSettings || this.defaultSettings;

    if (!settings) {
      throw new Error(`grpc-web client factory: no settings provided for ${serviceId}`);
    }

    return new ImprobableEngGrpcWebClient(serviceId, { ...settings });
  }

}

/**
 * GrpcClient implementation based on grpc-web
 */
export class ImprobableEngGrpcWebClient implements GrpcClient<ImprobableEngGrpcWebClientSettings> {

  private client: any;

  constructor(
    private serviceId: string,
    private settings: ImprobableEngGrpcWebClientSettings,
  ) {
    // implementation is based on https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web-react-example/ts/_proto/examplecom/library/book_service_pb_service.js
    this.client = (() => {
      function Client() { }
      Client.serviceName = this.serviceId;
      return Client;
    })();
  }

  getSettings(): ImprobableEngGrpcWebClientSettings {
    return { ...this.settings };
  }

  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    request: Q,
    metadata: GrpcMetadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    return new Observable(obs => {
      const methodName = path.split('/')[2];

      const methodDescriptor = {
        methodName,
        service: this.client,
        requestStream: false,
        responseStream: false,
        requestType: reqclss,
        responseType: resclss,
      };

      const client = grpc.unary(methodDescriptor as any, {
        request,
        host: this.settings.host,
        metadata: new grpc.Metadata(metadata?.toObject() ?? {}),
        transport: this.settings.transport,
        debug: this.settings.debug,
        onEnd: (response) => {
          obs.next(new GrpcStatusEvent(response.status, response.statusMessage, this.castResponseMetadata(response.trailers)));

          if (response.status !== grpc.Code.OK) {
            obs.complete();
          } else {
            obs.next(new GrpcDataEvent<S>(response.message as S));
            obs.complete();
          }
        },
      });

      return () => client.close();
    });

  }

  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: GrpcMetadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>> {
    const methodName = path.split('/')[2];

    const methodDescriptor = {
      methodName,
      service: this.client,
      requestStream: false,
      responseStream: true,
      requestType: reqclss,
      responseType: resclss,
    };

    return new Observable(obs => {
      const client = grpc.invoke(methodDescriptor, {
        request: req,
        host: this.settings.host,
        metadata: new grpc.Metadata(metadata?.toObject() ?? {}),
        transport: this.settings.transport,
        debug: this.settings.debug,
        onMessage: (data) => {
          obs.next(new GrpcDataEvent(data as any));
        },
        onEnd: (status, statusMessage, trailers) => {
          obs.next(new GrpcStatusEvent(status, statusMessage, this.castResponseMetadata(trailers)));
          obs.complete();
        },
      });

      return () => client.close();
    });
  }

  private castResponseMetadata({ headersMap }: Metadata) {
    return new GrpcMetadata(Object.keys(headersMap).reduce((r, k) => ({ ...r, [k]: headersMap[k][0] }), {}));
  }

}
