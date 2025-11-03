import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality } from '../../../input/types';
import { getDataType, isPacked } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { OneOf } from '../oneof';
import { AbstractMessageField } from './abstract-message-field';

export class EnumMessageField extends AbstractMessageField {

  private notRepeatedDataType: string;
  private isArray: boolean;
  private isPacked: boolean;

  constructor(
    override proto: Proto,
    override message: ProtoMessage,
    override messageField: ProtoMessageField,
    override oneOf?: OneOf,
  ) {
    super(proto, message, messageField, oneOf);

    this.isArray =
      this.messageField.label === ProtoMessageFieldCardinality.repeated;
    this.isPacked = isPacked(this.proto, this.messageField);
    this.notRepeatedDataType = getDataType(this.proto, this.messageField, {
      ignoreRepeating: true,
    });
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    if (this.isPacked) {
      printer.add(`case ${this.messageField.number}: _reader.readPackableEnumInto(_instance.${this.attributeName} = _instance.${this.attributeName} || []);`);
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

  printToObjectMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).slice(),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName},`);
    }
  }

  printToProtobufJSONMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(v => ${this.notRepeatedDataType}[v]),`);
    } else {
      printer.add(`${this.attributeName}: ${this.oneOf || this.messageField.proto3Optional ?
        `this.${this.attributeName} === undefined ? null : `
        : ''}${this.notRepeatedDataType}[this.${this.attributeName} === null || this.${this.attributeName} === undefined ? 0 : this.${this.attributeName}],`);
    }
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}: string${this.isArray ? '[]' : ''}${this.oneOf || this.messageField.proto3Optional ? ' | null' : ''};`);
  }

}
