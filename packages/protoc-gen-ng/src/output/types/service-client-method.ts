import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { ServiceMethod } from '../../input/proto-service-method';
import { camelizeSafe } from '../../utils';
import { ExternalDependencies } from '../misc/dependencies';
import { Printer } from '../misc/printer';

export class ServiceClientMethod {

  constructor(
    private proto: Proto,
    private service: ProtoService,
    private serviceMethod: ServiceMethod,
  ) { }

  print(printer: Printer) {
    printer.addDeps(
      ExternalDependencies.GrpcCallType,
      ExternalDependencies.UnaryRpcRef,
      ExternalDependencies.ServerStreamRpcRef,
      ExternalDependencies.Metadata,
    );

    const serviceUrlPrefix = this.proto.pb_package ? this.proto.pb_package + '.' : '';
    const inputType = this.proto.getRelativeTypeName(this.serviceMethod.inputType, 'thisProto');
    const outputType = this.proto.getRelativeTypeName(this.serviceMethod.outputType, 'thisProto');
    const rpcRefType = this.serviceMethod.serverStreaming ? 'ServerStreamRpcRef' : 'UnaryRpcRef';
    const rpcPath = `/${serviceUrlPrefix}${this.service.name}/${this.serviceMethod.name}`;

    printer.add(`
      /**
       * ${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC for ${rpcPath}
       * ${!!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : ''}
       * @param requestMessage Request message
       * @param requestMetadata Request metadata
       * @returns ${rpcRefType}
       */
      ${camelizeSafe(this.serviceMethod.name)}(requestData: ${inputType}, requestMetadata: Metadata = {}): ${rpcRefType}<${outputType}> {
        return this.handler.create${rpcRefType}({
          type: GrpcCallType.${this.serviceMethod.serverStreaming ? 'serverStream' : 'unary'},
          client: this.client,
          path: '${rpcPath}',
          requestData,
          requestMetadata,
          requestClass: ${inputType},
          responseClass: ${outputType},
        });
      }
    `);
  }

}
