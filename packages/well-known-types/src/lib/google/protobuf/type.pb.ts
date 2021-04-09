/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions,
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '../../google/protobuf/any.pb';
import * as googleProtobuf001 from '../../google/protobuf/source-context.pb';
export enum Syntax {
  SYNTAX_PROTO2 = 0,
  SYNTAX_PROTO3 = 1,
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Type implements GrpcMessage {
  static id = 'google.protobuf.Type';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Type();
    Type.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Type) {
    _instance.name = _instance.name || '';
    _instance.fields = _instance.fields || [];
    _instance.oneofs = _instance.oneofs || [];
    _instance.options = _instance.options || [];
    _instance.sourceContext = _instance.sourceContext || undefined;
    _instance.syntax = _instance.syntax || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Type, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          const messageInitializer2 = new Field();
          _reader.readMessage(
            messageInitializer2,
            Field.deserializeBinaryFromReader
          );
          (_instance.fields = _instance.fields || []).push(messageInitializer2);
          break;
        case 3:
          (_instance.oneofs = _instance.oneofs || []).push(
            _reader.readString()
          );
          break;
        case 4:
          const messageInitializer4 = new Option();
          _reader.readMessage(
            messageInitializer4,
            Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer4
          );
          break;
        case 5:
          _instance.sourceContext = new googleProtobuf001.SourceContext();
          _reader.readMessage(
            _instance.sourceContext,
            googleProtobuf001.SourceContext.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.syntax = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    Type.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Type, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.fields && _instance.fields.length) {
      _writer.writeRepeatedMessage(
        2,
        _instance.fields as any,
        Field.serializeBinaryToWriter
      );
    }
    if (_instance.oneofs && _instance.oneofs.length) {
      _writer.writeRepeatedString(3, _instance.oneofs);
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        4,
        _instance.options as any,
        Option.serializeBinaryToWriter
      );
    }
    if (_instance.sourceContext) {
      _writer.writeMessage(
        5,
        _instance.sourceContext as any,
        googleProtobuf001.SourceContext.serializeBinaryToWriter
      );
    }
    if (_instance.syntax) {
      _writer.writeEnum(6, _instance.syntax);
    }
  }

  private _name?: string;
  private _fields?: Field[];
  private _oneofs?: string[];
  private _options?: Option[];
  private _sourceContext?: googleProtobuf001.SourceContext;
  private _syntax?: Syntax;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Type to deeply clone from
   */
  constructor(_value?: RecursivePartial<Type.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.fields = (_value.fields || []).map((m) => new Field(m));
    this.oneofs = (_value.oneofs || []).slice();
    this.options = (_value.options || []).map((m) => new Option(m));
    this.sourceContext = _value.sourceContext
      ? new googleProtobuf001.SourceContext(_value.sourceContext)
      : undefined;
    this.syntax = _value.syntax;
    Type.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get fields(): Field[] | undefined {
    return this._fields;
  }
  set fields(value: Field[] | undefined) {
    this._fields = value;
  }
  get oneofs(): string[] | undefined {
    return this._oneofs;
  }
  set oneofs(value: string[] | undefined) {
    this._oneofs = value;
  }
  get options(): Option[] | undefined {
    return this._options;
  }
  set options(value: Option[] | undefined) {
    this._options = value;
  }
  get sourceContext(): googleProtobuf001.SourceContext | undefined {
    return this._sourceContext;
  }
  set sourceContext(value: googleProtobuf001.SourceContext | undefined) {
    this._sourceContext = value;
  }
  get syntax(): Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: Syntax | undefined) {
    this._syntax = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Type.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Type.AsObject {
    return {
      name: this.name,
      fields: (this.fields || []).map((m) => m.toObject()),
      oneofs: (this.oneofs || []).slice(),
      options: (this.options || []).map((m) => m.toObject()),
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      syntax: this.syntax,
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Type.AsProtobufJSON {
    return {
      name: this.name,
      fields: (this.fields || []).map((m) => m.toProtobufJSON(options)),
      oneofs: (this.oneofs || []).slice(),
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
      sourceContext: this.sourceContext
        ? this.sourceContext.toProtobufJSON(options)
        : null,
      syntax: Syntax[this.syntax ?? 0],
    };
  }
}
export module Type {
  /**
   * Standard JavaScript object representation for Type
   */
  export interface AsObject {
    name?: string;
    fields?: Field.AsObject[];
    oneofs?: string[];
    options?: Option.AsObject[];
    sourceContext?: googleProtobuf001.SourceContext.AsObject;
    syntax?: Syntax;
  }

  /**
   * Protobuf JSON representation for Type
   */
  export interface AsProtobufJSON {
    name?: string;
    fields?: Field.AsProtobufJSON[] | null;
    oneofs?: string[];
    options?: Option.AsProtobufJSON[] | null;
    sourceContext?: googleProtobuf001.SourceContext.AsProtobufJSON | null;
    syntax?: string;
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Field implements GrpcMessage {
  static id = 'google.protobuf.Field';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Field();
    Field.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Field) {
    _instance.kind = _instance.kind || 0;
    _instance.cardinality = _instance.cardinality || 0;
    _instance.number = _instance.number || 0;
    _instance.name = _instance.name || '';
    _instance.typeUrl = _instance.typeUrl || '';
    _instance.oneofIndex = _instance.oneofIndex || 0;
    _instance.packed = _instance.packed || false;
    _instance.options = _instance.options || [];
    _instance.jsonName = _instance.jsonName || '';
    _instance.defaultValue = _instance.defaultValue || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Field, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.kind = _reader.readEnum();
          break;
        case 2:
          _instance.cardinality = _reader.readEnum();
          break;
        case 3:
          _instance.number = _reader.readInt32();
          break;
        case 4:
          _instance.name = _reader.readString();
          break;
        case 6:
          _instance.typeUrl = _reader.readString();
          break;
        case 7:
          _instance.oneofIndex = _reader.readInt32();
          break;
        case 8:
          _instance.packed = _reader.readBool();
          break;
        case 9:
          const messageInitializer9 = new Option();
          _reader.readMessage(
            messageInitializer9,
            Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer9
          );
          break;
        case 10:
          _instance.jsonName = _reader.readString();
          break;
        case 11:
          _instance.defaultValue = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Field.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Field, _writer: BinaryWriter) {
    if (_instance.kind) {
      _writer.writeEnum(1, _instance.kind);
    }
    if (_instance.cardinality) {
      _writer.writeEnum(2, _instance.cardinality);
    }
    if (_instance.number) {
      _writer.writeInt32(3, _instance.number);
    }
    if (_instance.name) {
      _writer.writeString(4, _instance.name);
    }
    if (_instance.typeUrl) {
      _writer.writeString(6, _instance.typeUrl);
    }
    if (_instance.oneofIndex) {
      _writer.writeInt32(7, _instance.oneofIndex);
    }
    if (_instance.packed) {
      _writer.writeBool(8, _instance.packed);
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        9,
        _instance.options as any,
        Option.serializeBinaryToWriter
      );
    }
    if (_instance.jsonName) {
      _writer.writeString(10, _instance.jsonName);
    }
    if (_instance.defaultValue) {
      _writer.writeString(11, _instance.defaultValue);
    }
  }

  private _kind?: Field.Kind;
  private _cardinality?: Field.Cardinality;
  private _number?: number;
  private _name?: string;
  private _typeUrl?: string;
  private _oneofIndex?: number;
  private _packed?: boolean;
  private _options?: Option[];
  private _jsonName?: string;
  private _defaultValue?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Field to deeply clone from
   */
  constructor(_value?: RecursivePartial<Field.AsObject>) {
    _value = _value || {};
    this.kind = _value.kind;
    this.cardinality = _value.cardinality;
    this.number = _value.number;
    this.name = _value.name;
    this.typeUrl = _value.typeUrl;
    this.oneofIndex = _value.oneofIndex;
    this.packed = _value.packed;
    this.options = (_value.options || []).map((m) => new Option(m));
    this.jsonName = _value.jsonName;
    this.defaultValue = _value.defaultValue;
    Field.refineValues(this);
  }
  get kind(): Field.Kind | undefined {
    return this._kind;
  }
  set kind(value: Field.Kind | undefined) {
    this._kind = value;
  }
  get cardinality(): Field.Cardinality | undefined {
    return this._cardinality;
  }
  set cardinality(value: Field.Cardinality | undefined) {
    this._cardinality = value;
  }
  get number(): number | undefined {
    return this._number;
  }
  set number(value: number | undefined) {
    this._number = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get typeUrl(): string | undefined {
    return this._typeUrl;
  }
  set typeUrl(value: string | undefined) {
    this._typeUrl = value;
  }
  get oneofIndex(): number | undefined {
    return this._oneofIndex;
  }
  set oneofIndex(value: number | undefined) {
    this._oneofIndex = value;
  }
  get packed(): boolean | undefined {
    return this._packed;
  }
  set packed(value: boolean | undefined) {
    this._packed = value;
  }
  get options(): Option[] | undefined {
    return this._options;
  }
  set options(value: Option[] | undefined) {
    this._options = value;
  }
  get jsonName(): string | undefined {
    return this._jsonName;
  }
  set jsonName(value: string | undefined) {
    this._jsonName = value;
  }
  get defaultValue(): string | undefined {
    return this._defaultValue;
  }
  set defaultValue(value: string | undefined) {
    this._defaultValue = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Field.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Field.AsObject {
    return {
      kind: this.kind,
      cardinality: this.cardinality,
      number: this.number,
      name: this.name,
      typeUrl: this.typeUrl,
      oneofIndex: this.oneofIndex,
      packed: this.packed,
      options: (this.options || []).map((m) => m.toObject()),
      jsonName: this.jsonName,
      defaultValue: this.defaultValue,
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Field.AsProtobufJSON {
    return {
      kind: Field.Kind[this.kind ?? 0],
      cardinality: Field.Cardinality[this.cardinality ?? 0],
      number: this.number,
      name: this.name,
      typeUrl: this.typeUrl,
      oneofIndex: this.oneofIndex,
      packed: this.packed,
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
      jsonName: this.jsonName,
      defaultValue: this.defaultValue,
    };
  }
}
export module Field {
  /**
   * Standard JavaScript object representation for Field
   */
  export interface AsObject {
    kind?: Field.Kind;
    cardinality?: Field.Cardinality;
    number?: number;
    name?: string;
    typeUrl?: string;
    oneofIndex?: number;
    packed?: boolean;
    options?: Option.AsObject[];
    jsonName?: string;
    defaultValue?: string;
  }

  /**
   * Protobuf JSON representation for Field
   */
  export interface AsProtobufJSON {
    kind?: string;
    cardinality?: string;
    number?: number;
    name?: string;
    typeUrl?: string;
    oneofIndex?: number;
    packed?: boolean;
    options?: Option.AsProtobufJSON[] | null;
    jsonName?: string;
    defaultValue?: string;
  }
  export enum Kind {
    TYPE_UNKNOWN = 0,
    TYPE_DOUBLE = 1,
    TYPE_FLOAT = 2,
    TYPE_INT64 = 3,
    TYPE_UINT64 = 4,
    TYPE_INT32 = 5,
    TYPE_FIXED64 = 6,
    TYPE_FIXED32 = 7,
    TYPE_BOOL = 8,
    TYPE_STRING = 9,
    TYPE_GROUP = 10,
    TYPE_MESSAGE = 11,
    TYPE_BYTES = 12,
    TYPE_UINT32 = 13,
    TYPE_ENUM = 14,
    TYPE_SFIXED32 = 15,
    TYPE_SFIXED64 = 16,
    TYPE_SINT32 = 17,
    TYPE_SINT64 = 18,
  }
  export enum Cardinality {
    CARDINALITY_UNKNOWN = 0,
    CARDINALITY_OPTIONAL = 1,
    CARDINALITY_REQUIRED = 2,
    CARDINALITY_REPEATED = 3,
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Enum implements GrpcMessage {
  static id = 'google.protobuf.Enum';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Enum();
    Enum.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Enum) {
    _instance.name = _instance.name || '';
    _instance.enumvalue = _instance.enumvalue || [];
    _instance.options = _instance.options || [];
    _instance.sourceContext = _instance.sourceContext || undefined;
    _instance.syntax = _instance.syntax || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Enum, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          const messageInitializer2 = new EnumValue();
          _reader.readMessage(
            messageInitializer2,
            EnumValue.deserializeBinaryFromReader
          );
          (_instance.enumvalue = _instance.enumvalue || []).push(
            messageInitializer2
          );
          break;
        case 3:
          const messageInitializer3 = new Option();
          _reader.readMessage(
            messageInitializer3,
            Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer3
          );
          break;
        case 4:
          _instance.sourceContext = new googleProtobuf001.SourceContext();
          _reader.readMessage(
            _instance.sourceContext,
            googleProtobuf001.SourceContext.deserializeBinaryFromReader
          );
          break;
        case 5:
          _instance.syntax = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    Enum.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Enum, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.enumvalue && _instance.enumvalue.length) {
      _writer.writeRepeatedMessage(
        2,
        _instance.enumvalue as any,
        EnumValue.serializeBinaryToWriter
      );
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.options as any,
        Option.serializeBinaryToWriter
      );
    }
    if (_instance.sourceContext) {
      _writer.writeMessage(
        4,
        _instance.sourceContext as any,
        googleProtobuf001.SourceContext.serializeBinaryToWriter
      );
    }
    if (_instance.syntax) {
      _writer.writeEnum(5, _instance.syntax);
    }
  }

  private _name?: string;
  private _enumvalue?: EnumValue[];
  private _options?: Option[];
  private _sourceContext?: googleProtobuf001.SourceContext;
  private _syntax?: Syntax;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Enum to deeply clone from
   */
  constructor(_value?: RecursivePartial<Enum.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.enumvalue = (_value.enumvalue || []).map((m) => new EnumValue(m));
    this.options = (_value.options || []).map((m) => new Option(m));
    this.sourceContext = _value.sourceContext
      ? new googleProtobuf001.SourceContext(_value.sourceContext)
      : undefined;
    this.syntax = _value.syntax;
    Enum.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get enumvalue(): EnumValue[] | undefined {
    return this._enumvalue;
  }
  set enumvalue(value: EnumValue[] | undefined) {
    this._enumvalue = value;
  }
  get options(): Option[] | undefined {
    return this._options;
  }
  set options(value: Option[] | undefined) {
    this._options = value;
  }
  get sourceContext(): googleProtobuf001.SourceContext | undefined {
    return this._sourceContext;
  }
  set sourceContext(value: googleProtobuf001.SourceContext | undefined) {
    this._sourceContext = value;
  }
  get syntax(): Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: Syntax | undefined) {
    this._syntax = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Enum.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Enum.AsObject {
    return {
      name: this.name,
      enumvalue: (this.enumvalue || []).map((m) => m.toObject()),
      options: (this.options || []).map((m) => m.toObject()),
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      syntax: this.syntax,
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Enum.AsProtobufJSON {
    return {
      name: this.name,
      enumvalue: (this.enumvalue || []).map((m) => m.toProtobufJSON(options)),
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
      sourceContext: this.sourceContext
        ? this.sourceContext.toProtobufJSON(options)
        : null,
      syntax: Syntax[this.syntax ?? 0],
    };
  }
}
export module Enum {
  /**
   * Standard JavaScript object representation for Enum
   */
  export interface AsObject {
    name?: string;
    enumvalue?: EnumValue.AsObject[];
    options?: Option.AsObject[];
    sourceContext?: googleProtobuf001.SourceContext.AsObject;
    syntax?: Syntax;
  }

  /**
   * Protobuf JSON representation for Enum
   */
  export interface AsProtobufJSON {
    name?: string;
    enumvalue?: EnumValue.AsProtobufJSON[] | null;
    options?: Option.AsProtobufJSON[] | null;
    sourceContext?: googleProtobuf001.SourceContext.AsProtobufJSON | null;
    syntax?: string;
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class EnumValue implements GrpcMessage {
  static id = 'google.protobuf.EnumValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new EnumValue();
    EnumValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: EnumValue) {
    _instance.name = _instance.name || '';
    _instance.number = _instance.number || 0;
    _instance.options = _instance.options || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: EnumValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.number = _reader.readInt32();
          break;
        case 3:
          const messageInitializer3 = new Option();
          _reader.readMessage(
            messageInitializer3,
            Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer3
          );
          break;
        default:
          _reader.skipField();
      }
    }

    EnumValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: EnumValue, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.number) {
      _writer.writeInt32(2, _instance.number);
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.options as any,
        Option.serializeBinaryToWriter
      );
    }
  }

  private _name?: string;
  private _number?: number;
  private _options?: Option[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of EnumValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<EnumValue.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.number = _value.number;
    this.options = (_value.options || []).map((m) => new Option(m));
    EnumValue.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get number(): number | undefined {
    return this._number;
  }
  set number(value: number | undefined) {
    this._number = value;
  }
  get options(): Option[] | undefined {
    return this._options;
  }
  set options(value: Option[] | undefined) {
    this._options = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    EnumValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): EnumValue.AsObject {
    return {
      name: this.name,
      number: this.number,
      options: (this.options || []).map((m) => m.toObject()),
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): EnumValue.AsProtobufJSON {
    return {
      name: this.name,
      number: this.number,
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
    };
  }
}
export module EnumValue {
  /**
   * Standard JavaScript object representation for EnumValue
   */
  export interface AsObject {
    name?: string;
    number?: number;
    options?: Option.AsObject[];
  }

  /**
   * Protobuf JSON representation for EnumValue
   */
  export interface AsProtobufJSON {
    name?: string;
    number?: number;
    options?: Option.AsProtobufJSON[] | null;
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Option implements GrpcMessage {
  static id = 'google.protobuf.Option';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Option();
    Option.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Option) {
    _instance.name = _instance.name || '';
    _instance.value = _instance.value || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Option, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.value = new googleProtobuf000.Any();
          _reader.readMessage(
            _instance.value,
            googleProtobuf000.Any.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    Option.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Option, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.value) {
      _writer.writeMessage(
        2,
        _instance.value as any,
        googleProtobuf000.Any.serializeBinaryToWriter
      );
    }
  }

  private _name?: string;
  private _value?: googleProtobuf000.Any;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Option to deeply clone from
   */
  constructor(_value?: RecursivePartial<Option.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.value = _value.value
      ? new googleProtobuf000.Any(_value.value)
      : undefined;
    Option.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get value(): googleProtobuf000.Any | undefined {
    return this._value;
  }
  set value(value: googleProtobuf000.Any | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Option.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Option.AsObject {
    return {
      name: this.name,
      value: this.value ? this.value.toObject() : undefined,
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Option.AsProtobufJSON {
    return {
      name: this.name,
      value: this.value ? this.value.toProtobufJSON(options) : null,
    };
  }
}
export module Option {
  /**
   * Standard JavaScript object representation for Option
   */
  export interface AsObject {
    name?: string;
    value?: googleProtobuf000.Any.AsObject;
  }

  /**
   * Protobuf JSON representation for Option
   */
  export interface AsProtobufJSON {
    name?: string;
    value?: googleProtobuf000.Any.AsProtobufJSON | null;
  }
}
