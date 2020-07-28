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
      ExternalDependencies.GrpcEvent,
      ExternalDependencies.Metadata,
      ExternalDependencies.Observable,
      ExternalDependencies.takeMessages,
      ExternalDependencies.throwStatusErrors,
    );

    const serviceUrlPrefix = this.proto.pb_package ? this.proto.pb_package + '.' : '';
    const inputType = this.proto.getRelativeTypeName(this.serviceMethod.inputType, 'thisProto');
    const outputType = this.proto.getRelativeTypeName(this.serviceMethod.outputType, 'thisProto');

    const jsdocMessagesOnly = new JSDoc();

    jsdocMessagesOnly.setDescription(`${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC. Emits messages and throws errors on non-zero status codes`);
    jsdocMessagesOnly.addParam({ type: inputType, name: 'request', description: 'Request message' });
    jsdocMessagesOnly.addParam({ type: 'Metadata', name: 'metadata', description: 'Additional data' });
    jsdocMessagesOnly.setReturn(`Observable<${outputType}>`);
    jsdocMessagesOnly.setDeprecation(!!this.serviceMethod.options && this.serviceMethod.options.deprecated);

    const jsdocEvents = new JSDoc();

    jsdocEvents.setDescription(`${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC. Emits data and status events; does not throw errors by design`);
    jsdocEvents.addParam({ type: inputType, name: 'request', description: 'Request message' });
    jsdocEvents.addParam({ type: 'Metadata', name: 'metadata', description: 'Additional data' });
    jsdocEvents.setReturn(`Observable<GrpcEvent<${outputType}>>`);
    jsdocEvents.setDeprecation(!!this.serviceMethod.options && this.serviceMethod.options.deprecated);

    printer.add(`
      ${jsdocMessagesOnly.toString()}
      ${camelizeSafe(this.serviceMethod.name)}(requestData: ${inputType}, requestMetadata: Metadata = {}): Observable<${outputType}> {
        return this.${camelizeSafe(this.serviceMethod.name)}$eventStream(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
      }

      ${jsdocEvents.toString()}
      ${camelizeSafe(this.serviceMethod.name)}$eventStream(requestData: ${inputType}, requestMetadata: Metadata = {}): Observable<GrpcEvent<${outputType}>> {
        return this.handler.handle({
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
