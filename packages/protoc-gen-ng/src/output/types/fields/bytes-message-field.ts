import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { ExternalDependencies } from '../../misc/dependencies';
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

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
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
      printer.add(`${this.attributeName}: this.${this.attributeName} ? this.${this.attributeName}.subarray(0) : ${this.messageField.proto3Optional ? 'undefined' : 'new Uint8Array()'},`);
    }
  }

  printAsObjectMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: ${this.dataType};`);
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
      printer.add(`${this.attributeName}?: string | null;`);
    } else {
      printer.add(`${this.attributeName}?: string${this.isArray ? '[]' : ''};`);
    }
  }

}
