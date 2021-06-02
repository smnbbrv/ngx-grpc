import { ProtoMessageFieldCardinality, ProtoMessageFieldType } from './types';

export class ProtoMessageField {

  name: string;
  number: number;
  label: ProtoMessageFieldCardinality;
  type: ProtoMessageFieldType;
  typeName: string;
  jsonName: string;
  oneofIndex?: number;
  options: {
    ctype: number;
    deprecated: boolean;
    jstype: number;
    lazy: boolean;
    uninterpretedOptionList: any[];
    weak: boolean;
    packed: boolean;
  };
  proto3Optional: boolean;

  constructor(value: ProtoMessageField) {
    this.name = value.name;
    this.number = value.number;
    this.label = value.label;
    this.type = value.type;
    this.typeName = value.typeName;
    this.jsonName = value.jsonName;
    this.oneofIndex = value.oneofIndex;
    this.options = value.options || {};
    this.proto3Optional = value.proto3Optional;
  }

}
