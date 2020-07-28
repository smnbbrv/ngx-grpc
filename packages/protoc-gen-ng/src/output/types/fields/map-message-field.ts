import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldType } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType, getMapKeyValueFields } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';
import { Number64MessageField } from './number64-message-field';

export class MapMessageField implements MessageField {

  private attributeName: string;
  private dataType: string;
  private keyField: ProtoMessageField;
  private valueField: ProtoMessageField;
  private mapMessageClassName: string;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private messageField: ProtoMessageField,
    private oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    [this.keyField, this.valueField] = getMapKeyValueFields(this.proto, this.messageField);
    this.dataType = getDataType(this.proto, this.messageField);
    this.mapMessageClassName = this.proto.getRelativeTypeName(this.messageField.typeName);
  }

  printFromBinaryReader(printer: Printer) {
    const msgVarName = `msg_${this.messageField.number}`;

    printer.add(
      `case ${this.messageField.number}:
        const ${msgVarName} = {} as any;
        reader.readMessage(${msgVarName}, ${this.mapMessageClassName}.fromBinaryReader);
        instance.${this.attributeName} = instance.${this.attributeName} || {};
        instance.${this.attributeName}[${msgVarName}.key] = ${msgVarName}.value;
        break;`
    );
  }

  printToBinaryWriter(printer: Printer) {
    const varName = `instance.${this.attributeName}`;
    const keysVarName = `keys_${this.messageField.number}`;
    const repeatedVarName = `repeated_${this.messageField.number}`;
    const isStringKey = ProtoMessageFieldType.string || Number64MessageField.isNumber64Field(this.keyField);
    const castedKey = this.keyField.type === isStringKey ? 'key' : 'Number(key)';

    printer.add(`if (!!${varName}) {
      const ${keysVarName} = Object.keys(${varName} as any);

      if (${keysVarName}.length) {
        const ${repeatedVarName} = ${keysVarName}
          .map(key => ({ key: ${castedKey}, value: (${varName} as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        writer.writeRepeatedMessage(${this.messageField.number}, ${repeatedVarName}, ${this.mapMessageClassName}.toBinaryWriter);
      }
    }`);
  }

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
  }

  printInitializer(printer: Printer) {
    // TODO properly clone submessages
    printer.add(`this.${this.attributeName} = {...(value.${this.attributeName} || {})};`);
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else {
      printer.add(`instance.${this.attributeName} = instance.${this.attributeName} || {}`);
    }
  }

  printGetter(printer: Printer) {
    printer.add(`get ${this.attributeName}(): ${this.dataType} | undefined { return this._${this.attributeName} }`);
  }

  printSetter(printer: Printer) {
    printer.add(`set ${this.attributeName}(value: ${this.dataType} | undefined) {
      ${this.oneOf ? this.oneOf.createFieldSetterAddon(this.messageField) : ''}
      this._${this.attributeName} = value;
    }`);
  }

  printToObjectMapping(printer: Printer) {
    // TODO properly clone submessages
    printer.add(`${this.attributeName}: {...(this.${this.attributeName} || {})},`);
  }

}
