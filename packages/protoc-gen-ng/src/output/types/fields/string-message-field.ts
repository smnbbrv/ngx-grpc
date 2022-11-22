import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { Printer } from '../../misc/printer';
import { OneOf } from '../oneof';
import { AbstractMessageField } from './abstract-message-field';

export class StringMessageField extends AbstractMessageField {

  private isArray: boolean;

  constructor(
    override proto: Proto,
    override message: ProtoMessage,
    override messageField: ProtoMessageField,
    override oneOf?: OneOf,
  ) {
    super(proto, message, messageField, oneOf);

    this.isArray = this.messageField.label === ProtoMessageFieldCardinality.repeated;
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    const readerCall = '_reader.readString()';

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
        _writer.writeRepeatedString(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.oneOf) {
      printer.add(`if (_instance.${this.attributeName} || _instance.${this.attributeName} === '') {
        _writer.writeString(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.messageField.proto3Optional) {
      printer.add(`if (_instance.${this.attributeName} !== undefined && _instance.${this.attributeName} !== null) {
        _writer.writeString(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else {
      printer.add(`if (_instance.${this.attributeName}) {
        _writer.writeString(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    }
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (_value.${this.attributeName} || []).slice();`);
    } else {
      printer.add(`this.${this.attributeName} = _value.${this.attributeName}`);
    }
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf || this.messageField.proto3Optional) {
      return;
    } else if (this.isArray) {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || []`);
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || ''`);
    }
  }

  printToObjectMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).slice(),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName},`);
    }
  }

  printToProtobufJSONMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).slice(),`);
    } else {
      if (this.oneOf || this.messageField.proto3Optional){
        printer.add(`${this.attributeName}: this.${this.attributeName} === null || this.${this.attributeName} === undefined ? null : this.${this.attributeName},`);
      } else {
        printer.add(`${this.attributeName}: this.${this.attributeName},`);
      }
    }
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}: ${this.dataType}${this.oneOf || this.messageField.proto3Optional ? ' | null' : ''};`);
  }
}
