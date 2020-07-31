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

    serviceClientConfigs.forEach(serviceClientConfig => serviceClientConfig.print(printer));
  }

}
