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
    .then((r: any) => {
      const protocInput = r.toObject();

      Services.Config = Config.fromParameter(protocInput.parameter);
      Services.Logger = new Logger(Services.Config.debug);

      const protos: Proto[] = protocInput.protoFileList.map(proto => new Proto(proto));

      if (Services.Config.debug) {
        mkdirSync('debug', { recursive: true });
        writeFileSync(join('debug', 'config.json'), JSON.stringify(Services.Config, null, 2), 'utf-8');
        writeFileSync(join('debug', 'protoc-input.json'), JSON.stringify(protocInput, null, 2), 'utf-8');
        writeFileSync(join('debug', 'parsed-protoc-gen-ng.json'), JSON.stringify(protos, null, 2), 'utf-8');
      }

      protos.forEach(p => p.setupDependencies(protos));
      protos.forEach(p => p.resolveTransitiveDependencies());

      const genwkt = Services.Config.embedWellKnownTypes;

      return protos
        .filter(p => genwkt || !genwkt && p.pb_package !== 'google.protobuf')
        .reduce((res, proto) => {
          Services.Logger.debug(`Start processing proto ${proto.name}`);

          const basename = proto.getGeneratedFileBaseName();
          const files: any[] = [];

          if (proto.serviceList.length) {
            if (Services.Config.files.pbconf.generate) {
              const configPrinter = new Printer();
              const configFile = new PbConfFile(proto);

              configFile.print(configPrinter);

              files.push({ name: basename + 'conf.ts', content: configPrinter.finalize() });
            }

            if (Services.Config.files.pbsc.generate) {
              const pbscPrinter = new Printer();
              const pbscFile = new PbscFile(proto);

              pbscFile.print(pbscPrinter);

              files.push({ name: basename + 'sc.ts', content: pbscPrinter.finalize() });
            }

            if (Services.Config.files.pbwsc.generate) {
              const pbwscPrinter = new Printer();
              const pbwscFile = new PbwscFile(proto);

              pbwscFile.print(pbwscPrinter);

              files.push({ name: basename + 'wsc.ts', content: pbwscPrinter.finalize() });
            }
          }

          if (Services.Config.files.pb.generate) {
            const pbPrinter = new Printer();
            const pbFile = new PbFile(proto);

            pbFile.print(pbPrinter);

            files.push({ name: basename + '.ts', content: pbPrinter.finalize() });
          }
          Services.Logger.debug(`End processing proto ${proto.name}`);

          return [...res, ...files];
        }, [] as any[]);
    })
    .then(CodeGeneratorResponse())
    .catch((err: any) => {
      Services.Logger?.debug(err);
      Services.Logger?.debug(err.stack);
      return CodeGeneratorResponseError()(err);
    });
}

main();
