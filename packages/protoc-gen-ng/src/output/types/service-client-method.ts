import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { ServiceMethod } from '../../input/proto-service-method';
import { Services } from '../../services';
import { camelizeSafe } from '../../utils';
import { ExternalDependencies } from '../misc/dependencies';
import { Printer } from '../misc/printer';

export class ServiceClientMethod {

  private serviceUrlPrefix: string;
  private inputType: string;
  private outputType: string;
  private rpcPath: string;

  constructor(
    private proto: Proto,
    private service: ProtoService,
    private serviceMethod: ServiceMethod,
  ) {
    this.serviceUrlPrefix = this.proto.pb_package ? this.proto.pb_package + '.' : '';
    this.inputType = this.proto.getRelativeTypeName(this.serviceMethod.inputType, 'thisProto');
    this.outputType = this.proto.getRelativeTypeName(this.serviceMethod.outputType, 'thisProto');
    this.rpcPath = `/${this.serviceUrlPrefix}${this.service.name}/${this.serviceMethod.name}`;
  }

  printMethod(printer: Printer) {
    Services.Logger.debug(`Start printing service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);

    printer.addDeps(
      ExternalDependencies.GrpcMetadata,
      ExternalDependencies.Observable,
      ExternalDependencies.takeMessages,
      ExternalDependencies.throwStatusErrors,
    );

    printer.add(`
      /**
       * ${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC for ${this.rpcPath}
       * ${!!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : ''}
       * @param requestMessage Request message
       * @param requestMetadata Request metadata
       * @returns Observable<${this.outputType}>
       */
      ${camelizeSafe(this.serviceMethod.name)}(requestData: ${this.inputType}, requestMetadata = new GrpcMetadata()): Observable<${this.outputType}> {
        return this.$raw.${camelizeSafe(this.serviceMethod.name)}(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());
      }
    `);

    Services.Logger.debug(`End printing service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);
  }

  printRawMethod(printer: Printer) {
    Services.Logger.debug(`Start printing $raw service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);

    printer.addDeps(
      ExternalDependencies.GrpcCallType,
      ExternalDependencies.GrpcEvent,
      ExternalDependencies.GrpcMetadata,
      ExternalDependencies.Observable,
    );

    printer.add(`
      /**
       * ${this.serviceMethod.serverStreaming ? 'Server streaming' : 'Unary'} RPC for ${this.rpcPath}
       * ${!!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : ''}
       * @param requestMessage Request message
       * @param requestMetadata Request metadata
       * @returns Observable<GrpcEvent<${this.outputType}>>
       */
      ${camelizeSafe(this.serviceMethod.name)}: (requestData: ${this.inputType}, requestMetadata = new GrpcMetadata()): Observable<GrpcEvent<${this.outputType}>> => {
        return this.handler.handle({
          type: GrpcCallType.${this.serviceMethod.serverStreaming ? 'serverStream' : 'unary'},
          client: this.client,
          path: '${this.rpcPath}',
          requestData,
          requestMetadata,
          requestClass: ${this.inputType},
          responseClass: ${this.outputType},
        });
      }
    `);

    Services.Logger.debug(`End printing $raw service client method ${this.serviceMethod.name} @ ${this.service.name} in proto ${this.proto.name}`);
  }

}
