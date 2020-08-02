import { ProtoEnum } from './proto-enum';
import { ProtoMessageField } from './proto-message-field';
import { ProtoOneof } from './proto-oneof';

export class ProtoMessage {

  name: string;
  fieldList: ProtoMessageField[];
  extensionList: [];
  nestedTypeList: ProtoMessage[];
  enumTypeList: ProtoEnum[];
  extensionRangeList: [];
  oneofDeclList: ProtoOneof[];
  reservedRangeList: [];
  reservedNameList: [];
  options: {
    messageSetWireFormat: boolean;
    noStandardDescriptorAccessor: boolean;
    deprecated: boolean;
    mapEntry: boolean;
    uninterpretedOptionList: any[];
  };

  constructor(value: ProtoMessage) {
    this.name = value.name;
    this.fieldList = (value.fieldList || []).map(mf => new ProtoMessageField(mf || {}));
    this.extensionList = value.extensionList;
    this.nestedTypeList = value.nestedTypeList.map(t => new ProtoMessage(t));
    this.enumTypeList = value.enumTypeList.map(e => new ProtoEnum(e));
    this.extensionRangeList = value.extensionRangeList;
    this.oneofDeclList = (value.oneofDeclList || []).map(d => new ProtoOneof(d));
    this.reservedRangeList = value.reservedRangeList;
    this.reservedNameList = value.reservedNameList;
    this.options = value.options || {};
  }

}
