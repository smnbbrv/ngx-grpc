#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { CodeGeneratorRequest, CodeGeneratorResponse, CodeGeneratorResponseError } from 'protoc-plugin';
import { Config } from './config';
import { Proto } from './input/proto';
import { Logger } from './logger';
import { PbFile } from './output/files/pb-file';
import { PbConfFile } from './output/files/pbconf-file';
import { PbscFile } from './output/files/pbsc-file';
import { PbwscFile } from './output/files/pbwsc-file';
import { Printer } from './output/misc/printer';
import { Services } from './services';

function main() {
  CodeGeneratorRequest()
    .then(r => {
      const protocInput = r.toObject();
      const protos: Proto[] = protocInput.protoFileList.map(proto => new Proto(proto));

      Services.Config = Config.fromParameter(protocInput.parameter);
      Services.Logger = new Logger();

      if (Services.Config.debug) {
        mkdirSync('debug', { recursive: true });
        writeFileSync(join('debug', 'protoc-input.json'), JSON.stringify(protocInput, null, 2), 'utf-8');
        writeFileSync(join('debug', 'parsed-protoc-gen-ng.json'), JSON.stringify(protos, null, 2), 'utf-8');
      }

      protos.forEach(p => p.setupDependencies(protos));

      return protos.reduce((res, proto) => {
        Services.Logger.debug(`Start processing proto ${proto.name}`);

        const basename = proto.getGeneratedFileBaseName();
        const files: any[] = [];

        if (proto.serviceList.length) {
          const configPrinter = new Printer();
          const configFile = new PbConfFile(proto);

          configFile.print(configPrinter);

          files.push({ name: basename + 'conf.ts', content: configPrinter.finalize() });

          const pbscPrinter = new Printer();
          const pbscFile = new PbscFile(proto);

          pbscFile.print(pbscPrinter);

          files.push({ name: basename + 'sc.ts', content: pbscPrinter.finalize() });

          if (Services.Config.worker) {
            const pbwscPrinter = new Printer();
            const pbwscFile = new PbwscFile(proto);

            pbwscFile.print(pbwscPrinter);

            files.push({ name: basename + 'wsc.ts', content: pbwscPrinter.finalize() });
          }
        }

        const pbPrinter = new Printer();
        const pbFile = new PbFile(proto);

        pbFile.print(pbPrinter);

        files.push({ name: basename + '.ts', content: pbPrinter.finalize() });

        Services.Logger.debug(`End processing proto ${proto.name}`);

        return [...res, ...files];
      }, [] as any[]);
    })
    .then(CodeGeneratorResponse())
    .catch(err => {
      Services.Logger.debug(err);
      Services.Logger.debug(err.stack);
      return CodeGeneratorResponseError()(err);
    });
}

main();
