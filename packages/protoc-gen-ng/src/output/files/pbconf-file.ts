import { Proto } from '../../input/proto';
import { Printer } from '../misc/printer';
import { ServiceClientConfig } from '../types/service-client-config';

export class PbConfFile {

  constructor(
    private proto: Proto,
  ) { }

  print(printer: Printer) {
    const serviceClientConfigs: ServiceClientConfig[] = [];

    this.proto.serviceList.forEach(service => serviceClientConfigs.push(new ServiceClientConfig(this.proto, service)));

    printer.add(`/*
  To configure the services you need to provide a configuration for each of them.

  E.g. you can create a module where you configure all of them and then import this module into your AppModule:

  const grpcSettings = { host: environment.grpcHost };

  @NgModule({
    providers: [
${ serviceClientConfigs.map(s => `      { provide: ${s.getTokenName()}, useValue: grpcSettings },`).sort().join('\n')}
    ],
  })
  export class GrpcConfigModule { }
*/
`);

    serviceClientConfigs.forEach(serviceClientConfig => serviceClientConfig.print(printer));
  }

}
