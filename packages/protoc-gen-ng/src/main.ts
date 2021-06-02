#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'fs';
import { CodeGeneratorRequest, CodeGeneratorResponse } from 'google-protobuf/google/protobuf/compiler/plugin_pb';
import { join } from 'path';
import { Config } from './config';
import { Proto } from './input/proto';
import { Logger } from './logger';
import { PbFile } from './output/files/pb-file';
import { PbConfFile } from './output/files/pbconf-file';
import { PbscFile } from './output/files/pbsc-file';
import { PbwscFile } from './output/files/pbwsc-file';
import { Printer } from './output/misc/printer';
import { Services } from './services';

// credits to https://stackoverflow.com/a/54565854/1990451
async function readStream(stream: NodeJS.ReadStream) {
  const chunks: any[] = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

async function main() {
  const inputBuff = await readStream(process.stdin);

  try {
    const request = CodeGeneratorRequest.deserializeBinary(inputBuff);
    const response = new CodeGeneratorResponse();
    response.setSupportedFeatures(CodeGeneratorResponse.Feature.FEATURE_PROTO3_OPTIONAL);

    const parameter = request.getParameter();

    Services.Config = Config.fromParameter(parameter ?? '');
    Services.Logger = new Logger(Services.Config.debug);

    const protos: Proto[] = request.getProtoFileList().map(d => new Proto(d.toObject()));

    if (Services.Config.debug) {
      mkdirSync('debug', { recursive: true });
      writeFileSync(join('debug', 'config.json'), JSON.stringify(Services.Config, null, 2), 'utf-8');
      // writeFileSync(join('debug', 'protoc-input.json'), JSON.stringify(protocInput, null, 2), 'utf-8');
      writeFileSync(join('debug', 'parsed-protoc-gen-ng.json'), JSON.stringify(protos, null, 2), 'utf-8');
    }

    protos.forEach(p => p.setupDependencies(protos));
    protos.forEach(p => p.resolveTransitiveDependencies());

    const genwkt = Services.Config.embedWellKnownTypes;

    protos
      .filter(p => genwkt || !genwkt && p.pb_package !== 'google.protobuf')
      .forEach(proto => {
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

        files.forEach(f => response.addFile(new CodeGeneratorResponse.File().setName(f.name).setContent(f.content)));
      });

    process.stdout.write(Buffer.from(response.serializeBinary().buffer));
  } catch (err) {
    Services.Logger?.debug(err);
    Services.Logger?.debug(err.stack);

    console.error('protoc-gen-ng error: ' + err.stack + '\n');
    process.exit(1);
  }
}

main();
