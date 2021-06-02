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
import { StringMessageField } from './fields/string-message-field';
import { MessageField } from './message-field';
import { OneOf } from './oneof';
import { AnyWKT } from './well-known-types/any.wkt';
import { ApiWKT, MethodWKT, MixinWKT } from './well-known-types/api.wkt';
import { DurationWKT } from './well-known-types/duration.wkt';
import { EmptyWKT } from './well-known-types/empty.wkt';
import { FieldMaskWKT } from './well-known-types/field-mask.wkt';
import { SourceContextWKT } from './well-known-types/source-context.wkt';
import { ListValueWKT, StructWKT, ValueWKT } from './well-known-types/struct.wkt';
import { TimestampWKT } from './well-known-types/timestamp.wkt';
import { EnumValueWKT, EnumWKT, FieldWKT, OptionWKT, TypeWKT } from './well-known-types/type.wkt';
import { BoolValueWKT, BytesValueWKT, DoubleValueWKT, FloatValueWKT, Int32ValueWKT, Int64ValueWKT, StringValueWKT, UInt32ValueWKT, UInt64ValueWKT } from './well-known-types/wrappers.wkt';
import { WKT } from './wkt';

export class Message {

  private messageFields: MessageField[];

  private oneOfs: OneOf[];

  private wkt?: WKT;

  constructor(
    private proto: Proto,
    private message: ProtoMessage,
  ) {
    if (this.proto.pb_package === 'google.protobuf') {
      switch (this.message.name) {
        case 'Any': this.wkt = new AnyWKT(); break;
        case 'Api': this.wkt = new ApiWKT(); break;
        case 'BoolValue': this.wkt = new BoolValueWKT(); break;
        case 'BytesValue': this.wkt = new BytesValueWKT(); break;
        case 'DoubleValue': this.wkt = new DoubleValueWKT(); break;
        case 'Duration': this.wkt = new DurationWKT(); break;
        case 'Empty': this.wkt = new EmptyWKT(); break;
        case 'Enum': this.wkt = new EnumWKT(); break;
        case 'EnumValue': this.wkt = new EnumValueWKT(); break;
        case 'Field': this.wkt = new FieldWKT(); break;
        case 'FieldMask': this.wkt = new FieldMaskWKT(); break;
        case 'FloatValue': this.wkt = new FloatValueWKT(); break;
        case 'Int32Value': this.wkt = new Int32ValueWKT(); break;
        case 'Int64Value': this.wkt = new Int64ValueWKT(); break;
        case 'ListValue': this.wkt = new ListValueWKT(); break;
        case 'Method': this.wkt = new MethodWKT(); break;
        case 'Mixin': this.wkt = new MixinWKT(); break;
        case 'Option': this.wkt = new OptionWKT(); break;
        case 'SourceContext': this.wkt = new SourceContextWKT(); break;
        case 'StringValue': this.wkt = new StringValueWKT(); break;
        case 'Struct': this.wkt = new StructWKT(); break;
        case 'Timestamp': this.wkt = new TimestampWKT(); break;
        case 'Type': this.wkt = new TypeWKT(); break;
        case 'UInt32Value': this.wkt = new UInt32ValueWKT(); break;
        case 'UInt64Value': this.wkt = new UInt64ValueWKT(); break;
        case 'Value': this.wkt = new ValueWKT(); break;
      }
    }

    const allOneOfs = this.message.oneofDeclList.map(od => new OneOf(this.proto, this.message, od));
    this.oneOfs = allOneOfs.filter(oneOf => !oneOf.isSyntheticOneOf());

    this.messageFields = this.message.fieldList.map(field => {
      const oneOf = typeof field.oneofIndex === 'number' && !field.proto3Optional
        ? allOneOfs[field.oneofIndex]
        : undefined;

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
          case ProtoMessageFieldType.fixed64:
          case ProtoMessageFieldType.int64:
          case ProtoMessageFieldType.sfixed64:
          case ProtoMessageFieldType.sint64:
          case ProtoMessageFieldType.uint64:
            return new NumberMessageField(this.proto, this.message, field, oneOf);
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

    const messageId = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.message.name;
    const wktUrl = 'https://developers.google.com/protocol-buffers/docs/reference/google.protobuf';
    const constructorComment = this.wkt ? `Well known type, more at ${wktUrl}` : `Message implementation for ${messageId}`;

    printer.addLine(`
    /**
     * ${constructorComment}
     */
    export class ${this.message.name} implements GrpcMessage {

      static id = '${messageId}';

      /**
       * Deserialize binary data to message
       * @param instance message instance
       */
      static deserializeBinary(bytes: ByteSource) {
        const instance = new ${this.message.name}();
        ${this.message.name}.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
      }
    `);

    this.wkt?.printStaticMethods?.(printer);
    this.printStaticRefineValues(printer);
    printer.newLine();

    this.printStaticDeserializeBinaryFromReader(printer);
    printer.newLine();

    this.printStaticSerializeBinaryToWriter(printer);
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

    printer.addLine(`
      /**
       * Serialize message to binary data
       * @param instance message instance
       */
      serializeBinary() {
        const writer = new BinaryWriter();
        ${this.message.name}.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
      }
    `);

    this.printToObject(printer);
    this.printToJSON(printer);
    this.printToProtobufJSON(printer);

    this.wkt?.printMemberMethods?.(printer);

    printer.addLine('}');

    this.printSubTypes(printer);
  }

  private printStaticRefineValues(printer: Printer) {
    printer.addLine(`
      /**
       * Check all the properties and set default protobuf values if necessary
       * @param _instance message instance
       */
      static refineValues(_instance: ${this.message.name}) {
    `);
    this.messageFields.forEach(f => {
      f.printDefaultValueSetter(printer);
      printer.newLine();
    });
    printer.addLine('}');
  }

  private printStaticDeserializeBinaryFromReader(printer: Printer) {
    printer.addLine(`
      /**
       * Deserializes / reads binary message into message instance using provided binary reader
       * @param _instance message instance
       * @param _reader binary reader instance
       */
      static deserializeBinaryFromReader(_instance: ${this.message.name}, _reader: BinaryReader) {
        while (_reader.nextField()) {
          if (_reader.isEndGroup()) break;

          switch (_reader.getFieldNumber()) {`);

    this.messageFields.forEach(f => {
      f.printDeserializeBinaryFromReader(printer);
      printer.newLine();
    });

    printer.addLine(`default: _reader.skipField();
          }
        }

        ${this.message.name}.refineValues(_instance);
      }`,
    );
  }

  private printStaticSerializeBinaryToWriter(printer: Printer) {
    printer.addLine(`
      /**
       * Serializes a message to binary format using provided binary reader
       * @param _instance message instance
       * @param _writer binary writer instance
       */
      static serializeBinaryToWriter(_instance: ${this.message.name}, _writer: BinaryWriter) {
    `);
    this.messageFields.forEach(f => {
      f.printSerializeBinaryToWriter(printer);
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
    printer.addLine(`
      /**
       * Message constructor. Initializes the properties and applies default Protobuf values if necessary
       * @param _value initial values object or instance of ${this.message.name} to deeply clone from
       */
      constructor(_value?: RecursivePartial<${this.message.name}.AsObject>) {
    `);
    printer.addLine('_value = _value || {};');

    this.messageFields.forEach(f => {
      f.printInitializer(printer);
      printer.newLine();
    });

    printer.addLine(`${this.message.name}.refineValues(this);`);
    printer.addLine('}');
  }

  private printAsObjectInterface(printer: Printer) {
    printer.addLine(`
      /**
       * Standard JavaScript object representation for ${this.message.name}
       */
      export interface AsObject {
    `);
    this.messageFields.forEach(f => {
      f.printAsObjectMapping(printer);
      printer.newLine();
    });
    printer.addLine('}');
  }

  private printToObject(printer: Printer) {
    printer.addLine(`
      /**
       * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
       */
      toObject(): ${this.message.name}.AsObject {
    `);
    printer.addLine('return {');
    this.messageFields.forEach(f => {
      f.printToObjectMapping(printer);
      printer.newLine();
    });
    printer.addLine('};');
    printer.addLine('}');
  }

  private printAsJSONInterface(printer: Printer) {
    printer.addLine(`
      /**
       * Protobuf JSON representation for ${this.message.name}
       */`,
    );
    if (this.wkt?.printAsProtobufJSON) {
      this.wkt.printAsProtobufJSON(printer);
    } else {
      printer.addLine(`export interface AsProtobufJSON {`);
      this.messageFields.forEach(f => {
        f.printAsJSONMapping(printer);
        printer.newLine();
      });
      printer.addLine('}');
    }
  }

  private printToJSON(printer: Printer) {
    printer.addLine(`
      /**
       * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
       */
      toJSON() { return this.toObject(); }
    `);
  }

  private printToProtobufJSON(printer: Printer) {
    printer.addDeps(
      ExternalDependencies.ToProtobufJSONOptions,
    );

    printer.addLine(`
      /**
       * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
       * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
       * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
       */`,
    );
    printer.addLine(`toProtobufJSON(
      // @ts-ignore
      options?: ToProtobufJSONOptions
    ): ${this.message.name}.AsProtobufJSON {`);

    if (this.wkt?.printToProtobufJSON) {
      this.wkt.printToProtobufJSON(printer);
    } else {
      printer.addLine('return {');
      this.messageFields.forEach(f => {
        f.printToProtobufJSONMapping(printer);
        printer.newLine();
      });
      printer.addLine('};');
    }

    printer.addLine('}');
  }

  private printSubTypes(printer: Printer) {
    printer.addLine(`export module ${this.message.name} {`);

    this.printAsObjectInterface(printer);
    this.printAsJSONInterface(printer);

    this.oneOfs.forEach(oneof => oneof.printEnum(printer));
    this.message.enumTypeList.forEach(protoEnum => new Enum(this.proto, protoEnum).print(printer));
    this.message.nestedTypeList.forEach(protoMessage => new Message(this.proto, protoMessage).print(printer));

    printer.addLine('}');
  }

}
