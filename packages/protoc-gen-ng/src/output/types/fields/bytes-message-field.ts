import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export class BytesMessageField implements MessageField {

  private attributeName: string;
  private dataType: string;
  private isArray: boolean;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private messageField: ProtoMessageField,
    private oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    this.isArray = this.messageField.label === ProtoMessageFieldCardinality.repeated;
    this.dataType = getDataType(this.proto, this.messageField);
  }

  printFromBinaryReader(printer: Printer) {
    const readerCall = 'reader.readBytes()';

    if (this.isArray) {
      printer.add(`case ${this.messageField.number}: (instance.${this.attributeName} = instance.${this.attributeName} || []).push(${readerCall});`);
    } else {
      printer.add(`case ${this.messageField.number}: instance.${this.attributeName} = ${readerCall};`);
    }

    printer.add('break;');
  }

  printToBinaryWriter(printer: Printer) {
    printer.add(`if (instance.${this.attributeName} && instance.${this.attributeName}.length) {
      writer.write${this.isArray ? 'Repeated' : ''}Bytes(${this.messageField.number}, instance.${this.attributeName});
    }`);
  }

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (value.${this.attributeName} || []).map(b => b ? b.subarray(0) : new Uint8Array());`);
    } else {
      printer.add(`this.${this.attributeName} = value.${this.attributeName}`);
    }
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else if (this.isArray) {
      printer.add(`instance.${this.attributeName} = instance.${this.attributeName} || []`);
    } else {
      printer.add(`instance.${this.attributeName} = instance.${this.attributeName} || new Uint8Array()`);
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
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(b => b ? b.subarray(0) : new Uint8Array()),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName} ? this.${this.attributeName}.subarray(0) : new Uint8Array(),`);
    }
  }

}
