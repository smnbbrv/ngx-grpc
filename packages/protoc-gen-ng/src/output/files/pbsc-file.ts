import { basename } from 'path';
import { Proto } from '../../input/proto';
import { Printer } from '../misc/printer';
import { ServiceClient } from '../types/service-client';
import { ServiceClientConfig } from '../types/service-client-config';

export class PbscFile {

  constructor(
    private proto: Proto,
  ) { }

  print(printer: Printer) {
    const serviceClientConfigs: ServiceClientConfig[] = [];
    const serviceClients: ServiceClient[] = [];

    this.proto.serviceList.forEach(service => {
      const serviceClientConfig = new ServiceClientConfig(this.proto, service);
      const serviceClient = new ServiceClient(this.proto, service, serviceClientConfig);

      serviceClientConfigs.push(serviceClientConfig);
      serviceClients.push(serviceClient);
    });

    const fileName = basename(this.proto.getGeneratedFileBaseName());

    printer.addLine(`import * as thisProto from './${fileName}';`);

    printer.add(this.proto.getImportedDependencies());

    if (serviceClientConfigs.length) {
      printer.add(`import {${serviceClientConfigs.map(scc => scc.getTokenName()).join(',')}} from './${fileName}conf';`);
    }

    serviceClients.forEach(serviceClient => serviceClient.print(printer));
  }

}
