import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { classify, pascalize } from '../../utils';
import { ExternalDependencies } from '../misc/dependencies';
import { Printer } from '../misc/printer';

export class ServiceClientConfig {

  constructor(
    private proto: Proto,
    private service: ProtoService,
  ) { }

  getTokenName() {
    return `GRPC_${pascalize(this.service.name)}_CLIENT_SETTINGS`;
  }

  print(printer: Printer) {
    printer.addDeps(ExternalDependencies.InjectionToken);

    printer.addLine(`
      /**
       * Specific GrpcClientSettings for ${classify(this.service.name)}.
       * Use it only if your default settings are not set or the service requires other settings.
       */
      export const ${this.getTokenName()} = new InjectionToken<any>('${this.getTokenName()}');
    `);
  }

}
