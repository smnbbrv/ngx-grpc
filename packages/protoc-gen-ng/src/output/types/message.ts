import { Proto } from '../../input/proto';
import { ProtoMessage } from '../../input/proto-message';
import { ProtoMessageFieldType } from '../../input/types';
import { ExternalDependencies } from '../misc/dependencies';
import { isFieldMap, isFieldMessage } from '../misc/helpers';
import { Printer } from '../misc/printer';
import { Enum } from './enum';
import { BooleanMessageField } from './fields/boolean-message-field';
import { BytesMessageField } from './fields/bytes-message-field';
import { EnumMessageField } from './fields/enum-message-field';
import { MapMessageField } from './fields/map-message-field';
import { MessageMessageField } from './fields/message-message-field';
import { NumberMessageField } from './fields/number-message-field';
import { Number64MessageField as Number64MessageField } from './fields/number64-message-field';
import { StringMessageField } from './fields/string-message-field';
import { JSDoc } from './js-doc';
import { MessageField } from './message-field';
import { OneOf } from './oneof';

export class Message {

  private messageFields: MessageField[];

  private oneOfs: OneOf[];

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
  ) {
    this.oneOfs = this.message.oneofDeclList.map(od => new OneOf(this.proto, this.message, od));

    this.messageFields = this.message.fieldList.map(field => {
      const oneOf = typeof field.oneofIndex === 'number' ? this.oneOfs[field.oneofIndex] : undefined;

      if (isFieldMap(this.proto, field)) {
        return new MapMessageField(this.proto, this.message, field, oneOf);
      } else if (isFieldMessage(field)) {
        return new MessageMessageField(this.proto, this.message, field, oneOf);
      } else {
        switch (field.type) {
          case ProtoMessageFieldType.bool:
            return new BooleanMessageField(this.proto, this.message, field, oneOf);
          case ProtoMessageFieldType.bytes:
            return new BytesMessageField(this.proto, this.message, field, oneOf);
          case ProtoMessageFieldType.enum:
            return new EnumMessageField(this.proto, this.message, field, oneOf);
          case ProtoMessageFieldType.string:
            return new StringMessageField(this.proto, this.message, field, oneOf);
          case ProtoMessageFieldType.double:
          case ProtoMessageFieldType.fixed32:
          case ProtoMessageFieldType.float:
          case ProtoMessageFieldType.int32:
          case ProtoMessageFieldType.sfixed32:
          case ProtoMessageFieldType.sint32:
          case ProtoMessageFieldType.uint32:
            return new NumberMessageField(this.proto, this.message, field, oneOf);
          case ProtoMessageFieldType.fixed64:
          case ProtoMessageFieldType.int64:
          case ProtoMessageFieldType.sfixed64:
          case ProtoMessageFieldType.sint64:
          case ProtoMessageFieldType.uint64:
            return new Number64MessageField(this.proto, this.message, field, oneOf);
          default: throw new Error('Unknown data type ' + field.type);
        }
      }
    });
  }

  print(printer: Printer) {
    printer.addDeps(
      ExternalDependencies.BinaryReader,
      ExternalDependencies.BinaryWriter,
      ExternalDependencies.ByteSource,
      ExternalDependencies.GrpcMessage,
      ExternalDependencies.RecursivePartial,
    );

    printer.addLine(`export class ${this.message.name} implements GrpcMessage {

      static toBinary(instance: ${this.message.name}) {
        const writer = new BinaryWriter();
        ${this.message.name}.toBinaryWriter(instance, writer);
        return writer.getResultBuffer();
      }

      static fromBinary(bytes: ByteSource) {
        const instance = new ${this.message.name}();
        ${this.message.name}.fromBinaryReader(instance, new BinaryReader(bytes));
        return instance;
      }
    `);

    if (this.message.name === 'Timestamp' && this.proto.pb_package === 'google.protobuf') {
      this.printTimestampStaticMethods(printer);
    }

    this.printStaticRefineValues(printer);
    printer.newLine();

    this.printStaticFromBinaryReader(printer);
    printer.newLine();

    this.printStaticToBinaryWriter(printer);
    printer.newLine();

    this.messageFields.forEach(f => {
      f.printPrivateAttribute(printer);
      printer.newLine();
    });
    printer.newLine();

    this.oneOfs.forEach(oneof => {
      oneof.printPrivateAttribute(printer);
      printer.newLine();
    });

    this.printConstructor(printer);
    this.printGettersAndSetters(printer);

    this.oneOfs.forEach(oneof => {
      oneof.printGetter(printer);
      printer.newLine();
    });

    this.printToObject(printer);

    printer.addLine('toJSON() { return this.toObject(); }');

    if (this.message.name === 'Timestamp' && this.proto.pb_package === 'google.protobuf') {
      this.printTimestampMemberMethods(printer);
    }

    printer.addLine('}');

    this.printSubTypes(printer);
  }

  private printStaticRefineValues(printer: Printer) {
    printer.addLine(`static refineValues(instance: ${this.message.name}) {`);
    this.messageFields.forEach(f => {
      f.printDefaultValueSetter(printer);
      printer.newLine();
    });
    printer.addLine('}');
  }

  private printStaticFromBinaryReader(printer: Printer) {
    printer.addLine(`static fromBinaryReader(instance: ${this.message.name}, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {`);

    this.messageFields.forEach(f => {
      f.printFromBinaryReader(printer);
      printer.newLine();
    });

    printer.addLine(`default: reader.skipField();
          }
        }

        ${this.message.name}.refineValues(instance);
      }`,
    );
  }

  private printStaticToBinaryWriter(printer: Printer) {
    printer.addLine(`static toBinaryWriter(instance: ${this.message.name}, writer: BinaryWriter) {`);
    this.messageFields.forEach(f => {
      f.printToBinaryWriter(printer);
      printer.newLine();
    });
    printer.addLine('}');
  }

  private printGettersAndSetters(printer: Printer) {
    this.messageFields.forEach(f => {
      f.printGetter(printer);
      printer.newLine();
      f.printSetter(printer);
      printer.newLine();
    });
  }

  private printConstructor(printer: Printer) {
    const jsdoc = new JSDoc();

    jsdoc.setDescription('Creates an object and applies default Protobuf values');
    jsdoc.addParam({
      name: 'value',
      type: `${this.message.name}`,
      description: `Initial values object or instance of ${this.message.name} to clone from (deep cloning)`,
    });

    printer.addLine(jsdoc.toString());
    printer.addLine(`constructor(value?: RecursivePartial<${this.message.name}>) {`);
    printer.addLine('value = value || {};');

    this.messageFields.forEach(f => {
      f.printInitializer(printer);
      printer.newLine();
    });

    printer.addLine(`${this.message.name}.refineValues(this);`);
    printer.addLine('}');
  }

  private printToObject(printer: Printer) {
    printer.addLine('toObject() {');
    printer.addLine('return {');
    this.messageFields.forEach(f => {
      f.printToObjectMapping(printer);
      printer.newLine();
    });
    printer.addLine('};');
    printer.addLine('}');
  }

  private printSubTypes(printer: Printer) {
    printer.addLine(`export module ${this.message.name} {`);

    this.oneOfs.forEach(oneof => oneof.printEnum(printer));
    this.message.enumTypeList.forEach(protoEnum => new Enum(this.proto, protoEnum).print(printer));
    this.message.nestedTypeList.forEach(protoMessage => new Message(this.proto, protoMessage).print(printer));

    printer.addLine('}');
  }

  private printTimestampStaticMethods(printer: Printer) {
    printer.addLine(`
      static fromDate(date: Date) {
        var timestamp = new Timestamp();
        timestamp.fromDate(date);
        return timestamp;
      }

      static fromISOString(isoDate: string) {
        var timestamp = new Timestamp();
        timestamp.fromISOString(isoDate);
        return timestamp;
      }
    `);
  }

  private printTimestampMemberMethods(printer: Printer) {
    printer.addLine(`
      fromDate(date: Date) {
        this.seconds = ''+Math.floor(date.getTime() / 1e3);
        this.nanos = date.getMilliseconds() * 1e6;
      }

      toDate() {
        return new Date(parseInt(this.seconds || '0') * 1e3 + (this.nanos || 0) / 1e6);
      }

      fromISOString(isoDate: string) {
        this.fromDate(new Date(isoDate));
      }

      toISOString() {
        return this.toDate().toISOString();
      }
    `);
  }

}
