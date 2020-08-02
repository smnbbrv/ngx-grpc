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
  weakDependencyList: [];
  messageTypeList: ProtoMessage[];
  enumTypeList: ProtoEnum[];
  serviceList: ProtoService[];
  extensionList: any[];

  resolved: {
    dependencies: Proto[];
    publicDependencies: Proto[];
    weakDependencies: Proto[];
  } = {} as any;

  messageIndex = new Map<string, MessageIndexMeta>();

  constructor(value: Proto) {
    this.name = value.name;
    this.pb_package = value.pb_package; // eslint-disable-line @typescript-eslint/camelcase
    this.dependencyList = value.dependencyList || [];
    this.publicDependencyList = value.publicDependencyList;
    this.weakDependencyList = value.weakDependencyList;
    this.messageTypeList = (value.messageTypeList || []).map(e => new ProtoMessage(e));
    this.enumTypeList = value.enumTypeList.map(e => new ProtoEnum(e));
    this.serviceList = value.serviceList.map(e => new ProtoService(e));
    this.extensionList = value.extensionList;

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

  resolveTypeMetadata(pbType: string) {
    let meta = this.messageIndex.get(pbType);

    if (meta) {
      return meta;
    }

    meta = undefined;

    this.resolved.dependencies.forEach(proto => {
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

    Services.Logger.debug(`Cannot find type ${pbType} in proto ${this.name}`);
    throw new Error('Error finding ' + pbType);
  }

  getDependencyPackageName(proto: Proto) {
    const name = proto.pb_package ? proto.pb_package.replace(/\.([a-z])/g, v => v.toUpperCase()).replace(/\./g, '') : 'noPackage';
    const index = String(this.resolved.dependencies.indexOf(proto)).padStart(3, '0'); // we always need index to avoid accidental collisions, see type.pb.ts

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

    return this.resolved.dependencies.map(pp => `import * as ${this.getDependencyPackageName(pp)} from '${root || '.'}/${pp.getGeneratedFileBaseName()}';`).join('\n');
  }

  getGeneratedFileBaseName() {
    return `${dasherize(this.name.replace(/\.proto$/, ''))}.pb`;
  }

}
