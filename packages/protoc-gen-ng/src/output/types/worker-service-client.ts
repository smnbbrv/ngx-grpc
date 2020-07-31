import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { ExternalDependencies } from '../misc/dependencies';
import { Printer } from '../misc/printer';

export class WorkerServiceClient {

  constructor(
    private proto: Proto,
    private service: ProtoService,
  ) { }

  print(printer: Printer) {
    printer.addDeps(
      ExternalDependencies.GrpcCallType,
      ExternalDependencies.GrpcWorkerServiceClientDef,
    );

    const serviceName = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.service.name;
    const serviceId = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.service.name;

    const methods = this.service.methodList.map(method => {
      const callType = method.serverStreaming ? 'serverStream' : 'unary';
      const inputType = this.proto.getRelativeTypeName(method.inputType, 'thisProto');
      const outputType = this.proto.getRelativeTypeName(method.outputType, 'thisProto');

      return `'/${serviceName}/${method.name}': { type: GrpcCallType.${callType}, reqclss: ${inputType}, resclss: ${outputType} }`;
    });

    printer.add(`
      /**
       * Client definition for use in worker
       */
      export const GrpcWorker${this.service.name}ClientDef: GrpcWorkerServiceClientDef = {
        serviceId: '${serviceId}',
        methods: {
          ${methods.join(',\n')}
        },
      };
    `);
  }

}
