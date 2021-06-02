import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { ProtoMessageFieldCardinality, ProtoMessageFieldType } from '../../../input/types';
import { camelizeSafe } from '../../../utils';
import { getDataType, isNumberString, isPacked } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export class NumberMessageField implements MessageField {

  private attributeName: string;
  private dataType: string;
  private isPacked: boolean;
  private protoDataType: string; // used in reader and writer as part of the method call
  private isArray: boolean;
  private isStringType: boolean;

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
    this.isStringType = isNumberString(this.messageField);

    switch (this.messageField.type) {
      case ProtoMessageFieldType.double: this.protoDataType = 'Double'; break;
      case ProtoMessageFieldType.fixed32: this.protoDataType = 'Fixed32'; break;
      case ProtoMessageFieldType.float: this.protoDataType = 'Float'; break;
      case ProtoMessageFieldType.int32: this.protoDataType = 'Int32'; break;
      case ProtoMessageFieldType.sfixed32: this.protoDataType = 'Sfixed32'; break;
      case ProtoMessageFieldType.sint32: this.protoDataType = 'Sint32'; break;
      case ProtoMessageFieldType.uint32: this.protoDataType = 'Uint32'; break;
      case ProtoMessageFieldType.fixed64: this.protoDataType = 'Fixed64' + (this.isStringType ? 'String' : ''); break;
      case ProtoMessageFieldType.int64: this.protoDataType = 'Int64' + (this.isStringType ? 'String' : ''); break;
      case ProtoMessageFieldType.sfixed64: this.protoDataType = 'Sfixed64' + (this.isStringType ? 'String' : ''); break;
      case ProtoMessageFieldType.sint64: this.protoDataType = 'Sint64' + (this.isStringType ? 'String' : ''); break;
      case ProtoMessageFieldType.uint64: this.protoDataType = 'Uint64' + (this.isStringType ? 'String' : ''); break;
      default: throw new Error('Unknown number type ' + this.messageField.type);
    }
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    if (this.isPacked) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(...(_reader.readPacked${this.protoDataType}() || []));`);
    } else if (this.isArray) {
      printer.add(`case ${this.messageField.number}: (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(_reader.read${this.protoDataType}());`);
    } else {
      printer.add(`case ${this.messageField.number}: _instance.${this.attributeName} = _reader.read${this.protoDataType}();`);
    }

    printer.add('break;');
  }

  printSerializeBinaryToWriter(printer: Printer) {
    if (this.isPacked) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writePacked${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.isArray) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writeRepeated${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.oneOf) {
      printer.add(`if (_instance.${this.attributeName} || _instance.${this.attributeName} === ${this.isStringType ? '\'0\'' : '0'}) {
        _writer.write${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
      }`);
    } else if (this.messageField.proto3Optional) {
      printer.add(`if (_instance.${this.attributeName} !== undefined && _instance.${this.attributeName} !== null) {
         _writer.write${this.protoDataType}(${this.messageField.number}, _instance.${this.attributeName});
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
    if (this.oneOf || this.messageField.proto3Optional) {
      return;
    } else if (this.isArray) {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || []`);
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || ${this.isStringType ? '\'0\'' : '0'}`);
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
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).slice(),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName}${this.oneOf || this.messageField.proto3Optional ? ' ?? null' : ''},`);
    }
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: ${this.dataType}${this.oneOf || this.messageField.proto3Optional ? ' | null' : ''};`);
  }

}
