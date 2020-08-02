import { basename } from 'path';
import { Proto } from '../../input/proto';
import { Services } from '../../services';
import { Printer } from '../misc/printer';
import { WorkerServiceClient } from '../types/worker-service-client';

export class PbwscFile {

  constructor(
    private proto: Proto,
  ) { }

  print(printer: Printer) {
    Services.Logger.debug(`Start printing pbwsc for ${this.proto.name}`);

    const fileName = basename(this.proto.getGeneratedFileBaseName());

    printer.addLine(`import * as thisProto from './${fileName}';`);
    printer.add(this.proto.getImportedDependencies());

    this.proto.serviceList.forEach(service => new WorkerServiceClient(this.proto, service).print(printer));

    Services.Logger.debug(`End printing pbwsc for ${this.proto.name}`);
  }

}
