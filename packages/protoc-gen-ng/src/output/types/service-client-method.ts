import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { ServiceMethod } from '../../input/proto-service-method';
import { camelizeSafe } from '../../utils';
import { ExternalDependencies } from '../misc/dependencies';
import { Printer } from '../misc/printer';
import { JSDoc } from './js-doc';

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

    const jsdoc = new JSDoc();

    jsdoc.setDescription(`${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC`);
    jsdoc.addParam({ type: inputType, name: 'request', description: 'Request message' });
    jsdoc.addParam({ type: 'Metadata', name: 'metadata', description: 'Additional data' });
    jsdoc.setReturn(`${rpcRefType}<${outputType}>`);
    jsdoc.setDeprecation(!!this.serviceMethod.options && this.serviceMethod.options.deprecated);

    printer.add(`
      ${jsdoc.toString()}
      ${camelizeSafe(this.serviceMethod.name)}(requestData: ${inputType}, requestMetadata: Metadata = {}): ${rpcRefType}<${outputType}> {
        return this.handler.create${rpcRefType}({
          type: GrpcCallType.${this.serviceMethod.serverStreaming ? 'serverStream' : 'unary'},
          client: this.client,
          path: '/${serviceUrlPrefix}${this.service.name}/${this.serviceMethod.name}',
          requestData,
          requestMetadata,
          requestClass: ${inputType},
          responseClass: ${outputType},
        });
      }
    `);
  }

}
