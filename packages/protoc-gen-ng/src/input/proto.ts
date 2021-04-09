import { FileDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import { Services } from '../services';
import { dasherize } from '../utils';
import { ProtoEnum } from './proto-enum';
import { ProtoMessage } from './proto-message';
import { ProtoService } from './proto-service';

export interface MessageIndexMeta {
  proto: Proto;
  message?: ProtoMessage;
  enum?: ProtoEnum;
}

export class Proto {

  name: string;
  pb_package: string; // tslint:disable-line
  dependencyList: string[];
  publicDependencyList: number[];
  weakDependencyList: number[];
  messageTypeList: ProtoMessage[];
  enumTypeList: ProtoEnum[];
  serviceList: ProtoService[];
  extensionList: any[];
  syntax: string;

  resolved: {
    dependencies: Proto[];
    publicDependencies: Proto[];
    allDependencies: Proto[];
  } = {} as any;

  messageIndex = new Map<string, MessageIndexMeta>();

  constructor(value: FileDescriptorProto.AsObject) {
    this.name = value.name ?? '';
    this.pb_package = value.pb_package ?? ''; // eslint-disable-line @typescript-eslint/camelcase
    this.dependencyList = value.dependencyList || [];
    this.publicDependencyList = value.publicDependencyList;
    this.weakDependencyList = value.weakDependencyList;
    this.messageTypeList = (value.messageTypeList || []).map(e => new ProtoMessage(e as any));
    this.enumTypeList = value.enumTypeList.map(e => new ProtoEnum(e as any));
    this.serviceList = value.serviceList.map(e => new ProtoService(e as any));
    this.extensionList = value.extensionList;
    this.syntax = value.syntax ?? '';

    this.index();
  }

  private index() {
    const indexEnums = (path: string, enums: ProtoEnum[]) => {
      enums.forEach(oneEnum => {
        this.messageIndex.set(path + '.' + oneEnum.name, { proto: this, enum: oneEnum });
      });
    };

    const indexMessages = (path: string, submessages: ProtoMessage[]) => {
      submessages.forEach(message => {
        const fullname = path + '.' + message.name;

        this.messageIndex.set(fullname, {
          proto: this,
          message,
        });

        indexMessages(fullname, message.nestedTypeList);
        indexEnums(fullname, message.enumTypeList);
      });
    };

    indexMessages(this.pb_package ? '.' + this.pb_package : '', this.messageTypeList);
    indexEnums(this.pb_package ? '.' + this.pb_package : '', this.enumTypeList);
  }

  setupDependencies(protos: Proto[]) {
    this.resolved.dependencies = this.dependencyList.map(d => protos.find(pp => pp.name === d) as Proto);
    this.resolved.publicDependencies = this.resolved.dependencies.filter((_, i) => this.publicDependencyList.includes(i));
  }

  resolveTransitiveDependencies() {
    const getTransitiveDependencies = (protos: Proto[]) => {
      return protos.reduce((res, proto) => {
        return [
          ...res,
          ...proto.resolved.dependencies,
          ...getTransitiveDependencies(proto.resolved.publicDependencies),
        ];
      }, [] as Proto[]);
    };

    this.resolved.allDependencies = [
      ...new Set([
        ...getTransitiveDependencies(this.resolved.dependencies),
        ...this.resolved.dependencies,
      ]),
    ];
  }

  resolveTypeMetadata(pbType: string) {
    let meta = this.messageIndex.get(pbType);

    if (meta) {
      return meta;
    }

    meta = undefined;

    this.resolved.allDependencies.forEach(proto => {
      if (!meta) {
        try {
          meta = proto.resolveTypeMetadata(pbType);
        } catch (ex) {
        }
      }
    });

    if (meta) {
      return meta;
    }

    throw new Error('Error finding ' + pbType);
  }

  getDependencyPackageName(dependency: Proto) {
    const name = dependency.pb_package ? dependency.pb_package.replace(/\.([a-z])/g, v => v.toUpperCase()).replace(/\./g, '') : 'noPackage';
    const index = String(this.resolved.allDependencies.indexOf(dependency)).padStart(3, '0'); // we always need index to avoid accidental collisions, see type.pb.ts

    return name + index;
  }

  getRelativeTypeName(pbType: string, thisProtoPackageName = '') {
    Services.Logger.debug(`Getting relative type "${pbType}" name from package "${thisProtoPackageName}"`);

    const meta = this.resolveTypeMetadata(pbType);
    const [, , /* packageName */, typeName] = pbType.match(/^\.(([a-z0-9._]*)\.)?([A-Za-z0-9._]+$)/) as RegExpMatchArray;

    if (meta.proto === this) {
      return (thisProtoPackageName ? thisProtoPackageName + '.' : '') + typeName;
    }

    return this.getDependencyPackageName(meta.proto) + '.' + typeName;
  }

  getImportedDependencies() {
    const root = Array(this.name.split('/').length - 1).fill('..').join('/');

    return this.resolved.allDependencies.map(pp => {
      const isWKT = pp.pb_package === 'google.protobuf';
      const genwkt = Services.Config.embedWellKnownTypes;
      const path = (genwkt || !genwkt && !isWKT) ? `${root || '.'}/${pp.getGeneratedFileBaseName()}` : '@ngx-grpc/well-known-types';

      return `import * as ${this.getDependencyPackageName(pp)} from '${path}';`;
    }).join('\n');
  }

  getGeneratedFileBaseName() {
    return `${dasherize(this.name.replace(/\.proto$/, ''))}.pb`;
  }

}
