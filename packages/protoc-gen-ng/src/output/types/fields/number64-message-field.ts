import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality, ProtoMessageFieldType } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export class Number64MessageField implements MessageField {

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private messageField: ProtoMessageField,
    private oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    this.isArray = this.messageField.label === ProtoMessageFieldCardinality.repeated;
    this.dataType = getDataType(this.proto, this.messageField);

    switch (this.messageField.type) {
      case ProtoMessageFieldType.fixed64: this.protoDataType = 'Fixed64String'; break;
      case ProtoMessageFieldType.int64: this.protoDataType = 'Int64String'; break;
      case ProtoMessageFieldType.sfixed64: this.protoDataType = 'Sfixed64String'; break;
      case ProtoMessageFieldType.sint64: this.protoDataType = 'Sint64String'; break;
      case ProtoMessageFieldType.uint64: this.protoDataType = 'Uint64String'; break;
      default: throw new Error('Unknown int64 type ' + this.messageField.type);
    }
  }

  private attributeName: string;
  private dataType: string;
  private protoDataType: string; // used in reader and writer as part of the method call
  private isArray: boolean;

  static isNumber64Field(field: ProtoMessageField) {
    const number64Types = [
      ProtoMessageFieldType.fixed64,
      ProtoMessageFieldType.int64,
      ProtoMessageFieldType.sfixed64,
      ProtoMessageFieldType.sint64,
      ProtoMessageFieldType.uint64,
    ];

    return number64Types.includes(field.type);
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    const readerCall = '_reader.read' + this.protoDataType + '()';

    if (this.isArray) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(${readerCall});`);
    } else {
      printer.add(`case ${this.messageField.number}: _instance.${this.attributeName} = ${readerCall};`);
    }

    printer.add('break;');
  }

  printSerializeBinaryToWriter(printer: Printer) {
    if (this.isArray) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writeRepeated${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else {
      printer.add(`if (_instance.${this.attributeName}) {
        _writer.write${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    }
  }

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (_value.${this.attributeName} || []).slice();`);
    } else {
      printer.add(`this.${this.attributeName} = _value.${this.attributeName}`);
    }
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else if (this.isArray) {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || []`);
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || '0'`);
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
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).slice(),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName},`);
    }
  }

  printAsObjectMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: ${this.dataType};`);
  }

}
