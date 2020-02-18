import { GrpcCallType, GrpcClientSettings, GrpcMessage } from '@ngx-grpc/common';
import { AbstractClientBase, Error, GrpcWebClientBase, Status } from 'grpc-web';
import { GrpcWorkerApi } from './api';
import { GrpcWorkerServiceClientDef } from './service-client-def';

export class GrpcWorker {

  private definitions = new Map<string, GrpcWorkerServiceClientDef>();

  private clients = new Map<string, {
    settings: GrpcClientSettings;
    client: GrpcWebClientBase;
  }>();

  private requestCancelHandlers = new Map<number, () => void>();

  register(...defs: GrpcWorkerServiceClientDef[]) {
    defs.forEach(def => this.definitions.set(def.serviceId, def));
  }

  start() {
    addEventListener('message', ({ data }: GrpcWorkerApi.WorkerMessageEvent<GrpcWorkerApi.GrpcWorkerMessage>) => {
      switch (data.type) {
        case GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig: this.configureServiceClient(data as GrpcWorkerApi.GrpcWorkerMessageServiceClientConfig); break;
        case GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest: this.handleRpc(data as GrpcWorkerApi.GrpcWorkerMessageRPCRequest<any>); break;
        case GrpcWorkerApi.GrpcWorkerMessageType.rpcCancel: this.cancelRpc(data as GrpcWorkerApi.GrpcWorkerMessageRPCCancel); break;
        default: throw new Error(`Unknown incoming message type ${data.type}`);
      }
    });
  }

  private configureServiceClient(message: GrpcWorkerApi.GrpcWorkerMessageServiceClientConfig) {
    const def = this.definitions.get(message.serviceId);

    if (!def) {
      throw new Error(`Service client ${message.serviceId} is not registered in Worker`);
    }

    this.clients.set(message.serviceId, { settings: message.settings, client: new GrpcWebClientBase(message.settings) });
  }

  private handleRpc(message: GrpcWorkerApi.GrpcWorkerMessageRPCRequest<any>) {
    const def = this.definitions.get(message.serviceId);

    if (!def) {
      throw new Error(`Service client ${message.serviceId} is not registered in Worker`);
    }

    const service = this.clients.get(message.serviceId);

    if (!service) {
      throw new Error(`Service client ${message.serviceId} is not configured in Worker`);
    }

    const respond = (msg: any) => ((postMessage as any)({
      type: GrpcWorkerApi.GrpcWorkerMessageType.rpcResponse,
      id: message.id,
      ...msg
    }));

    const { type, reqclss, resclss } = def.methods[message.path];
    const request = new reqclss(message.request);
    const url = service.settings.host + message.path;
    const metadata = message.metadata || {};
    const info = new AbstractClientBase.MethodInfo(resclss, (rq: any) => reqclss.toBinary(rq), resclss.fromBinary);

    if (type === GrpcCallType.unary) {
      const stream = service.client.rpcCall(url, request, metadata, info, () => null);

      stream.on('error', (error: Error) => {
        this.requestCancelHandlers.delete(message.id);
        respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error, error });
      });

      // take only status 0 because unary error already includes non-zero statuses
      stream.on('status', (status: Status) => status.code === 0 ? respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status, status }) : null);

      stream.on('data', (response: GrpcMessage) => respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data, response: response.toObject() }));

      stream.on('end', () => {
        this.requestCancelHandlers.delete(message.id);
        respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end });
      });

      this.requestCancelHandlers.set(message.id, () => stream.cancel());
    } else {
      const stream = service.client.serverStreaming(url, request, metadata, info);

      stream.on('error', (error: Error) => {
        this.requestCancelHandlers.delete(message.id);
        respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error, error });
      });

      stream.on('status', (status: Status) => respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status, status }));

      stream.on('data', (response: GrpcMessage) => respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data, response: response.toObject() }));

      stream.on('end', () => {
        this.requestCancelHandlers.delete(message.id);
        respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end });
      });

      this.requestCancelHandlers.set(message.id, () => stream.cancel());
    }
  }

  private cancelRpc(message: GrpcWorkerApi.GrpcWorkerMessageRPCCancel) {
    const cancel = this.requestCancelHandlers.get(message.id);

    if (cancel) {
      cancel();
      this.requestCancelHandlers.delete(message.id);
    }
  }

}
