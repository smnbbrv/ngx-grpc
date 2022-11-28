import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { ExternalDependencies } from '../../misc/dependencies';
import { Printer } from '../../misc/printer';
import { OneOf } from '../oneof';
import { AbstractMessageField } from './abstract-message-field';

export class BytesMessageField extends AbstractMessageField {

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
    const readerCall = '_reader.readBytes()';

    if (this.isArray) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(${readerCall});`);
    } else {
      printer.add(`case ${this.messageField.number}: _instance.${this.attributeName} = ${readerCall};`);
    }

    printer.add('break;');
  }

  printSerializeBinaryToWriter(printer: Printer) {
   if (this.messageField.proto3Optional) {
      printer.add(`if (_instance.${this.attributeName} !== undefined && _instance.${this.attributeName} !== null) {
        _writer.writeBytes(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else {
     printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
      _writer.write${this.isArray ? 'Repeated' : ''}Bytes(${this.messageField.number}, _instance.${this.attributeName});
    }`);
   }
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (_value.${this.attributeName} || []).map(b => b ? b.subarray(0) : new Uint8Array());`);
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
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || new Uint8Array()`);
    }
  }

  printToObjectMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(b => b ? b.subarray(0) : new Uint8Array()),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName} ? this.${this.attributeName}.subarray(0) : ${this.messageField.proto3Optional ? 'undefined' : 'new Uint8Array()'},`);
    }
  }

  printToProtobufJSONMapping(printer: Printer) {
    printer.addDeps(ExternalDependencies.uint8ArrayToBase64);

    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(b => b ? uint8ArrayToBase64(b) : ''),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName} ? uint8ArrayToBase64(this.${this.attributeName}) : ${this.messageField.proto3Optional ? 'null' : '\'\''},`);
    }
  }

  printAsJSONMapping(printer: Printer) {
    if (this.messageField.proto3Optional) {
      printer.add(`${this.attributeName}: string | null;`);
    } else {
      printer.add(`${this.attributeName}: string${this.isArray ? '[]' : ''};`);
    }
  }

}
