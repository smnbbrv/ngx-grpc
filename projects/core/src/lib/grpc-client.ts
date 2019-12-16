import { AbstractClientBase, Error, GrpcWebClientBase, Metadata, Status } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcMessageClass } from './grpc-message-class';

export interface GrpcClientSettings {
  host: string;
  format?: string;
  suppressCorsPreflight?: boolean;
}

export class GrpcClient {

  private client: GrpcWebClientBase;

  constructor(
    private settings: GrpcClientSettings,
  ) {
    this.client = new GrpcWebClientBase(this.settings);
  }

  unary<REQ, RES>(
    path: string,
    req: REQ,
    metadata: Metadata,
    reqclss: GrpcMessageClass<REQ>,
    resclss: GrpcMessageClass<RES>,
  ): Observable<RES> {
    return new Observable(obs => {
      this.client.rpcCall(
        this.settings.host + path,
        req,
        metadata || {},
        new AbstractClientBase.MethodInfo(
          resclss,
          (request: REQ) => reqclss.toBinary(request),
          resclss.fromBinary
        ),
        (err: Error, response: RES) => {
          if (err) {
            obs.error(err);
          } else {
            obs.next(response);
          }

          obs.complete();
        });
    });
  }

  serverStream<REQ, RES>(
    path: string,
    req: REQ,
    metadata: Metadata,
    reqclss: GrpcMessageClass<REQ>,
    resclss: GrpcMessageClass<RES>
  ): Observable<RES | Status> {
    return new Observable(obs => {
      const xhrStream = this.client.serverStreaming(
        this.settings.host + path,
        req,
        metadata || {},
        new AbstractClientBase.MethodInfo(resclss, (request: REQ) => reqclss.toBinary(request), resclss.fromBinary)
      );

      xhrStream.on('status', status => obs.next(status));
      xhrStream.on('data', response => obs.next(response));
      xhrStream.on('end', () => obs.complete());
      xhrStream.on('error', error => obs.error(error));

      return () => xhrStream.cancel();
    });
  }

}
