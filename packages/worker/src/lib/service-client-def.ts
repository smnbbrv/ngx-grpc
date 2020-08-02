import { GrpcCallType, GrpcMessageClass } from '@ngx-grpc/common';

/**
 * Generated service client method definition
 */
export interface GrpcWorkerRPCDef {
  type: GrpcCallType;
  reqclss: GrpcMessageClass<any>;
  resclss: GrpcMessageClass<any>;
}

/**
 * Generated service client definition
 */
export interface GrpcWorkerServiceClientDef {
  serviceId: string;
  methods: { [path: string]: GrpcWorkerRPCDef; };
}
