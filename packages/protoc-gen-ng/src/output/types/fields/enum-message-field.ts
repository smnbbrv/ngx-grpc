import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType, isPacked } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export class EnumMessageField implements MessageField {

  private attributeName: string;
  private dataType: string;
  private notRepeatedDataType: string;
  private isArray: boolean;
  private isPacked: boolean;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private messageField: ProtoMessageField,
    private oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    this.isArray = this.messageField.label === ProtoMessageFieldCardinality.repeated;
    this.isPacked = isPacked(this.proto, this.messageField);
    this.dataType = getDataType(this.proto, this.messageField);
    this.notRepeatedDataType = getDataType(this.proto, this.messageField, { ignoreRepeating: true });
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    if (this.isPacked) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(...(_reader.readPackedEnum() || []));`);
    } else if (this.isArray) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(_reader.readEnum());`);
    } else {
      printer.add(`case ${this.messageField.number}: _instance.${this.attributeName} = _reader.readEnum();`);
    }

    printer.add('break;');
  }

  printSerializeBinaryToWriter(printer: Printer) {
    if (this.isPacked) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writePackedEnum(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.isArray) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writeRepeatedEnum(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.oneOf) {
      printer.add(`if (_instance.${this.attributeName} || _instance.${this.attributeName} === 0) {
        _writer.writeEnum(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.messageField.proto3Optional) {
      printer.add(`if (_instance.${this.attributeName} !== undefined && _instance.${this.attributeName} !== null) {
        _writer.writeEnum(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else {
      printer.add(`if (_instance.${this.attributeName}) {
        _writer.writeEnum(${this.messageField.number}, _instance.${this.attributeName});
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
    if (this.oneOf || this.messageField.proto3Optional) {
      return;
    } else if (this.isArray) {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || []`);
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || 0`);
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

  printToProtobufJSONMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(v => ${this.notRepeatedDataType}[v]),`);
    } else {
      printer.add(`${this.attributeName}: ${this.oneOf || this.messageField.proto3Optional ? `this.${this.attributeName} === undefined ? null : ` : ''}${this.notRepeatedDataType}[this.${this.attributeName} ?? 0],`);
    }
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: string${this.isArray ? '[]' : ''}${this.oneOf || this.messageField.proto3Optional ? ' | null' : ''};`);
  }

}
