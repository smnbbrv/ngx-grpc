import { Proto } from '../../input/proto';
import { Services } from '../../services';
import { Printer } from '../misc/printer';
import { ServiceClientConfig } from '../types/service-client-config';

export class PbConfFile {

  constructor(
    private proto: Proto,
  ) { }

  print(printer: Printer) {
    Services.Logger.debug(`Start printing pbconf for ${this.proto.name}`);

    const serviceClientConfigs: ServiceClientConfig[] = [];

    this.proto.serviceList.forEach(service => serviceClientConfigs.push(new ServiceClientConfig(this.proto, service)));

    serviceClientConfigs.forEach(serviceClientConfig => serviceClientConfig.print(printer));

    Services.Logger.debug(`End printing pbconf for ${this.proto.name}`);
  }

}
