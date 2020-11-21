import { Metadata } from 'grpc-web';
import { Observable } from 'rxjs';
import { GrpcEvent } from './grpc-event';
import { GrpcMessage } from './grpc-message';
import { GrpcMessageClass } from './grpc-message-class';

/**
 * This interface describes transport layer client factory, which is important in instantiating GrpcClient
 * because the GrpcClientFactory is bound to the dependency injection (use constructor to inject normal Angular services & config),
 * while GrpcClient has none
 */
export interface GrpcClientFactory {

  /**
   * Create a GrpcClient
   * @param serviceId a service type in proto (passed in by generated service client), e.g.
   * @param settings settings for underlying grpc client implementation
   * @returns new GrpcClient
   */
  createClient(serviceId: string, settings: GrpcClientSettings): GrpcClient;

}

/**
 * A transport layer client implementation interface
 * Instance of GrpcClient is created for every gRPC service client by corresponding GrpcClientFactory
 */
export interface GrpcClient {

  /**
   * Returns a copy of current client settings
   */
  getSettings(): any;

  /**
   * Handle unary RPC
   * @param path gRPC method path (rpc path)
   * @param req request data
   * @param metadata request metadata
   * @param reqclss request message class
   * @param resclss response message class
   */
  unary<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>>;

  /**
   * Handle server stream RPC
   * @param path gRPC method path (rpc path)
   * @param req request data
   * @param metadata request metadata
   * @param reqclss request message class
   * @param resclss response message class
   */
  serverStream<Q extends GrpcMessage, S extends GrpcMessage>(
    path: string,
    req: Q,
    metadata: Metadata,
    reqclss: GrpcMessageClass<Q>,
    resclss: GrpcMessageClass<S>,
  ): Observable<GrpcEvent<S>>;

}

/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface GrpcClientSettings {
  host: string;
  format?: string;
  suppressCorsPreflight?: boolean;
  withCredentials?: boolean;
}

/**
 * Type of the RPC
 */
export enum GrpcCallType {
  unary,
  serverStream,
}

/**
 * This interface describes the internal gRPC request data structure
 */
export interface GrpcRequest<Q extends GrpcMessage, S extends GrpcMessage> {
  path: string;
  client: GrpcClient;
  type: GrpcCallType;
  requestData: Q;
  requestMetadata: Metadata;
  requestClass: GrpcMessageClass<Q>;
  responseClass: GrpcMessageClass<S>;
}
