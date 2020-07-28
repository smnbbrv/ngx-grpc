import { Proto } from '../../input/proto';
import { ProtoService } from '../../input/proto-service';
import { pascalize } from '../../utils';
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
    printer.addDeps(ExternalDependencies.GrpcClientSettings, ExternalDependencies.InjectionToken);
    printer.add(`export const ${this.getTokenName()} = new InjectionToken<GrpcClientSettings>('${this.getTokenName()}');`);
    printer.newLine();
  }

}
