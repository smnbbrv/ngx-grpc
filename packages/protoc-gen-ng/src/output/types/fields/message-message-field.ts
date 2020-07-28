import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export class MessageMessageField implements MessageField {

  private attributeName: string;
  private dataType: string;
  private messageClassName: string;
  private isArray: boolean;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private messageField: ProtoMessageField,
    private oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    this.isArray = this.messageField.label === ProtoMessageFieldCardinality.repeated;
    this.messageClassName = this.proto.getRelativeTypeName(this.messageField.typeName);
    this.dataType = getDataType(this.proto, this.messageField);
  }

  printFromBinaryReader(printer: Printer) {
    const varName = `messageInitializer${this.messageField.number}`;

    if (this.isArray) {
      printer.add(`case ${this.messageField.number}:
        const ${varName} = new ${this.messageClassName}();
        reader.readMessage(${varName}, ${this.messageClassName}.fromBinaryReader);
        (instance.${this.attributeName} = instance.${this.attributeName} || []).push(${varName});`);
    } else {
      printer.add(`case ${this.messageField.number}:
        instance.${this.attributeName} = new ${this.messageClassName}();
        reader.readMessage(instance.${this.attributeName}, ${this.messageClassName}.fromBinaryReader);`);
    }

    printer.add('break;');
  }

  printToBinaryWriter(printer: Printer) {
    if (this.isArray) {
      printer.add(`if (instance.${this.attributeName} && instance.${this.attributeName}.length) {
        writer.writeRepeatedMessage(${this.messageField.number}, instance.${this.attributeName} as any, ${this.messageClassName}.toBinaryWriter);
      }`);
    } else {
      printer.add(`if (instance.${this.attributeName}) {
        writer.writeMessage(${this.messageField.number}, instance.${this.attributeName} as any, ${this.messageClassName}.toBinaryWriter);
      }`);
    }
  }

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (value.${this.attributeName} || []).map(m => new ${this.messageClassName}(m));`);
    } else {
      printer.add(`this.${this.attributeName} = value.${this.attributeName} ? new ${this.messageClassName}(value.${this.attributeName}) : undefined;`);
    }
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else if (this.isArray) {
      printer.add(`instance.${this.attributeName} = instance.${this.attributeName} || []`);
    } else {
      printer.add(`instance.${this.attributeName} = instance.${this.attributeName} || undefined`);
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
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(m => m.toObject()),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName} ? this.${this.attributeName}.toObject() : undefined,`);
    }
  }

}
