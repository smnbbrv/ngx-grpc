import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldType } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType, getMapKeyValueFields, isFieldMessage, isNumberString } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';
import { AbstractMessageField } from './abstract-message-field';

export class MapMessageField extends AbstractMessageField {

  private keyField: ProtoMessageField;
  private valueField: ProtoMessageField;
  private mapMessageClassName: string;

  constructor(
    override proto: Proto,
    override message: ProtoMessage,
    override messageField: ProtoMessageField,
    override oneOf?: OneOf,
  ) {
    super(proto, message, messageField, oneOf);

    [this.keyField, this.valueField] = getMapKeyValueFields(this.proto, this.messageField);
    this.mapMessageClassName = this.proto.getRelativeTypeName(this.messageField.typeName);
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    const msgVarName = `msg_${this.messageField.number}`;
    const isStringKey = this.keyField.type === ProtoMessageFieldType.string || isNumberString(this.keyField);
    const castedKey = isStringKey ? `${msgVarName}.key` : `Number(${msgVarName}.key)`;

    printer.add(
      `case ${this.messageField.number}:
        const ${msgVarName} = {} as any;
        _reader.readMessage(${msgVarName}, ${this.mapMessageClassName}.deserializeBinaryFromReader);
        _instance.${this.attributeName} = _instance.${this.attributeName} || {};
        _instance.${this.attributeName}[${castedKey}] = ${msgVarName}.value;
        break;`,
    );
  }

  printSerializeBinaryToWriter(printer: Printer) {
    const varName = `_instance.${this.attributeName}`;
    const keysVarName = `keys_${this.messageField.number}`;
    const repeatedVarName = `repeated_${this.messageField.number}`;
    const isStringKey = this.keyField.type === ProtoMessageFieldType.string || isNumberString(this.keyField);
    const castedKey = isStringKey ? 'key' : 'Number(key)';

    printer.add(`if (!!${varName}) {
      const ${keysVarName} = Object.keys(${varName} as any);

      if (${keysVarName}.length) {
        const ${repeatedVarName} = ${keysVarName}
          .map(key => ({ key: ${castedKey}, value: (${varName} as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        _writer.writeRepeatedMessage(${this.messageField.number}, ${repeatedVarName}, ${this.mapMessageClassName}.serializeBinaryToWriter);
      }
    }`);
  }

  printInitializer(printer: Printer) {
    let cloneFn = `_value!.${this.attributeName}![k]`;

    if (isFieldMessage(this.valueField)) {
      cloneFn = `_value!.${this.attributeName}![k] ? new ${getDataType(this.proto, this.valueField)}(_value!.${this.attributeName}![k]) : undefined,`;
    } else if (this.valueField.type === ProtoMessageFieldType.bytes) {
      cloneFn = `_value!.${this.attributeName}![k] ? _value!.${this.attributeName}![k].subarray(0) : undefined`;
    }

    printer.add(`this.${this.attributeName} = _value!.${this.attributeName} ? Object.keys(_value!.${this.attributeName}).reduce((r, k) => ({ ...r, [k]: ${cloneFn} }), {}) : {},`);
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || {}`);
    }
  }

  printToObjectMapping(printer: Printer) {
    let cloneFn = `this.${this.attributeName}![k]`;

    if (isFieldMessage(this.valueField)) {
      cloneFn = `this.${this.attributeName}![k] ? this.${this.attributeName}![k].toObject() : undefined`;
    } else if (this.valueField.type === ProtoMessageFieldType.bytes) {
      cloneFn = `this.${this.attributeName}![k] ? this.${this.attributeName}![k].subarray(0) : undefined`;
    }

    printer.add(`${this.attributeName}: this.${this.attributeName} ? Object.keys(this.${this.attributeName}).reduce((r, k) => ({ ...r, [k]: ${cloneFn} }), {}) : {},`);
  }

  printToProtobufJSONMapping(printer: Printer) {
    let cloneFn = `this.${this.attributeName}![k]`;

    if (isFieldMessage(this.valueField)) {
      cloneFn = `this.${this.attributeName}![k] ? this.${this.attributeName}![k].toJSON() : null`;
    } else if (this.valueField.type === ProtoMessageFieldType.bytes) {
      cloneFn = `this.${this.attributeName}![k] ? this.${this.attributeName}![k].subarray(0) : null`;
    }

    printer.add(`${this.attributeName}: this.${this.attributeName} ? Object.keys(this.${this.attributeName}).reduce((r, k) => ({ ...r, [k]: ${cloneFn} }), {}) : {},`);
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}: ${this.dataType};`);
  }

}
