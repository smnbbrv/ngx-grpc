
/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface GrpcWorkerClientSettings {
  host: string;
  format?: string;
  suppressCorsPreflight?: boolean;
  withCredentials?: boolean;
}
