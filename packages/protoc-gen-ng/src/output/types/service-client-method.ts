import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { ServiceMethod } from '../../input/proto-service-method';
import { Services } from '../../services';
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
    Services.Logger.debug(`Start printing service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);

    printer.addDeps(
      ExternalDependencies.GrpcCallType,
      ExternalDependencies.GrpcEvent,
      ExternalDependencies.GrpcMetadata,
      ExternalDependencies.Observable,
      ExternalDependencies.takeMessages,
      ExternalDependencies.throwStatusErrors,
    );

    const serviceUrlPrefix = this.proto.pb_package ? this.proto.pb_package + '.' : '';
    const inputType = this.proto.getRelativeTypeName(this.serviceMethod.inputType, 'thisProto');
    const outputType = this.proto.getRelativeTypeName(this.serviceMethod.outputType, 'thisProto');
    const rpcPath = `/${serviceUrlPrefix}${this.service.name}/${this.serviceMethod.name}`;

    printer.add(`
      /**
       * ${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC for ${rpcPath}
       * ${!!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : ''}
       * @param requestMessage Request message
       * @param requestMetadata Request metadata
       * @returns Observable<${outputType}>
       */
      ${camelizeSafe(this.serviceMethod.name)}(requestData: ${inputType}, requestMetadata = new GrpcMetadata()): Observable<${outputType}> {
        return this.${camelizeSafe(this.serviceMethod.name)}$eventStream(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
      }

      /**
       * ${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC for ${rpcPath}
       * ${!!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : ''}
       * @param requestMessage Request message
       * @param requestMetadata Request metadata
       * @returns Observable<GrpcEvent<${outputType}>>
       */
      ${camelizeSafe(this.serviceMethod.name)}$eventStream(requestData: ${inputType}, requestMetadata = new GrpcMetadata()): Observable<GrpcEvent<${outputType}>> {
        return this.handler.handle({
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

    Services.Logger.debug(`Start printing service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);
  }

}
