import { Proto } from '../../input/proto';
import { ProtoEnum } from '../../input/proto-enum';
import { ProtoMessage } from '../../input/proto-message';
import { ProtoMessageField } from '../../input/proto-message-field';
import { ProtoOneof } from '../../input/proto-oneof';
import { camelizeSafe, classify } from '../../utils';
import { Printer } from '../misc/printer';
import { Enum } from './enum';

export class OneOf {

  private attributeName: string;
  private enumName: string;
  private index: number;
  private fields: ProtoMessageField[];
  private synthetic: boolean;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
    private oneof: ProtoOneof,
  ) {
    this.attributeName = camelizeSafe(this.oneof.name);
    this.enumName = classify(this.oneof.name) + 'Case';
    this.index = message.oneofDeclList.indexOf(this.oneof);
    this.fields = message.fieldList.filter(f => f.oneofIndex === this.index);
    this.synthetic = this.fields.every(field => field.proto3Optional);
  }

  isSyntheticOneOf() {
    return this.synthetic;
  }

  printEnum(printer: Printer) {
    const protoEnum = new ProtoEnum({
      name: this.enumName,
      reservedNameList: [],
      reservedRangeList: [],
      valueList: [
        { name: 'none', number: 0 },
        ...this.fields.map((f, fi) => ({ name: camelizeSafe(f.name), number: fi + 1 })),
      ],
    });

    new Enum(this.proto, protoEnum).print(printer);
  }

  printPrivateAttribute(printer: Printer) {
    const type = `${this.message.name}.${this.enumName}`;

    printer.add(`private _${this.attributeName}: ${type} = ${type}.none;`);
  }

  printGetter(printer: Printer) {
    printer.add(`get ${this.attributeName}() { return this._${this.attributeName}; }`);
  }

  createFieldSetterAddon(field: ProtoMessageField) {
    const otherFields = this.message.fieldList
      .filter(ff => ff.oneofIndex === field.oneofIndex && ff.name !== field.name)
      .map(ff => `this._${camelizeSafe(ff.name)}`);

    // TODO setter should not check for null or undefined
    return `if (value !== undefined && value !== null) {
          ${otherFields.length ? [...otherFields, 'undefined'].join(' = ') : ''}
          this._${camelizeSafe(this.attributeName)} = ${this.message.name}.${this.enumName}.${camelizeSafe(field.name)};
        }`;
  }

}
