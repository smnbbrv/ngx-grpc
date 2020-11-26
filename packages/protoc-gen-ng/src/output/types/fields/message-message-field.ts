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
  private asObjectDataType: string;
  private asJSONDataType: string;
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
    this.asObjectDataType = getDataType(this.proto, this.messageField, { asObjectDataType: true });
    this.asJSONDataType = getDataType(this.proto, this.messageField, { asProtobufJSONDataType: true });
  }

  printDeserializeBinaryFromReader(printer: Printer) {
    const varName = `messageInitializer${this.messageField.number}`;

    if (this.isArray) {
      printer.add(`case ${this.messageField.number}:
        const ${varName} = new ${this.messageClassName}();
        _reader.readMessage(${varName}, ${this.messageClassName}.deserializeBinaryFromReader);
        (_instance.${this.attributeName} = _instance.${this.attributeName} || []).push(${varName});`);
    } else {
      printer.add(`case ${this.messageField.number}:
        _instance.${this.attributeName} = new ${this.messageClassName}();
        _reader.readMessage(_instance.${this.attributeName}, ${this.messageClassName}.deserializeBinaryFromReader);`);
    }

    printer.add('break;');
  }

  printSerializeBinaryToWriter(printer: Printer) {
    if (this.isArray) {
      printer.add(`if (_instance.${this.attributeName} && _instance.${this.attributeName}.length) {
        _writer.writeRepeatedMessage(${this.messageField.number}, _instance.${this.attributeName} as any, ${this.messageClassName}.serializeBinaryToWriter);
      }`);
    } else {
      printer.add(`if (_instance.${this.attributeName}) {
        _writer.writeMessage(${this.messageField.number}, _instance.${this.attributeName} as any, ${this.messageClassName}.serializeBinaryToWriter);
      }`);
    }
  }

  printPrivateAttribute(printer: Printer) {
    printer.add(`private _${this.attributeName}?: ${this.dataType};`);
  }

  printInitializer(printer: Printer) {
    if (this.isArray) {
      printer.add(`this.${this.attributeName} = (_value.${this.attributeName} || []).map(m => new ${this.messageClassName}(m));`);
    } else {
      printer.add(`this.${this.attributeName} = _value.${this.attributeName} ? new ${this.messageClassName}(_value.${this.attributeName}) : undefined;`);
    }
  }

  printDefaultValueSetter(printer: Printer) {
    if (this.oneOf) {
      return;
    } else if (this.isArray) {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || []`);
    } else {
      printer.add(`_instance.${this.attributeName} = _instance.${this.attributeName} || undefined`);
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

  printAsObjectMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: ${this.asObjectDataType};`);
  }

  printToProtobufJSONMapping(printer: Printer) {
    if (this.isArray) {
      printer.add(`${this.attributeName}: (this.${this.attributeName} || []).map(m => m.toProtobufJSON(options)),`);
    } else {
      printer.add(`${this.attributeName}: this.${this.attributeName} ? this.${this.attributeName}.toProtobufJSON(options) : null,`);
    }
  }

  printAsJSONMapping(printer: Printer) {
    printer.add(`${this.attributeName}?: ${this.asJSONDataType} | null;`);
  }

}
