import { Proto } from '../../../input/proto';
import { ProtoMessage } from '../../../input/proto-message';
import { ProtoMessageField } from '../../../input/proto-message-field';
import { camelizeSafe } from '../../../utils';
import { getDataType } from '../../misc/helpers';
import { Printer } from '../../misc/printer';
import { MessageField } from '../message-field';
import { OneOf } from '../oneof';

export abstract class AbstractMessageField implements MessageField {
  protected attributeName: string;
  protected dataType: string;

  constructor(
    protected proto: Proto,
    protected message: ProtoMessage,
    protected messageField: ProtoMessageField,
    protected oneOf?: OneOf,
  ) {
    this.attributeName = camelizeSafe(this.messageField.name);
    this.dataType = getDataType(this.proto, this.messageField);
  }

  get postfixProp(): string {
   return this.messageField.proto3Optional ? '?' : '';
  }

  get type(): string {
    return this.messageField.proto3Optional ? `${this.dataType} | undefined` : this.dataType;
  }

  abstract printDeserializeBinaryFromReader(printer: Printer): void;

  abstract printSerializeBinaryToWriter(printer: Printer): void;

  printPrivateAttribute(printer: Printer): void {
    printer.add(`private _${this.attributeName}${this.postfixProp}: ${this.dataType};`);
  }

  abstract printInitializer(printer: Printer): void;

  abstract printDefaultValueSetter(printer: Printer): void;

  printGetter(printer: Printer) {
    printer.add(`get ${this.attributeName}(): ${this.type} { return this._${this.attributeName} }`);
  }

  printSetter(printer: Printer) {
    printer.add(`set ${this.attributeName}(value${this.postfixProp}: ${this.dataType}) {
      ${this.oneOf ? this.oneOf.createFieldSetterAddon(this.messageField) : ''}
      this._${this.attributeName} = value;
    }`);
  }

  abstract printToObjectMapping(printer: Printer): void;

  printAsObjectMapping(printer: Printer): void {
    printer.add(`${this.attributeName}${this.postfixProp}: ${this.dataType};`);
  }

  abstract printToProtobufJSONMapping(printer: Printer): void;

  abstract printAsJSONMapping(printer: Printer): void;
}
