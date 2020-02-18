/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '../../google/protobuf/any.pb';
import * as googleProtobuf001 from '../../google/protobuf/source-context.pb';
export enum Syntax {
  syntaxProto2 = 0,
  syntaxProto3 = 1
}
export class Type implements GrpcMessage {
  static toBinary(instance: Type) {
    const writer = new BinaryWriter();
    Type.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Type();
    Type.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Type) {
    instance.name = instance.name || '';
    instance.fields = instance.fields || [];
    instance.oneofs = instance.oneofs || [];
    instance.options = instance.options || [];
    instance.sourceContext = instance.sourceContext || undefined;
    instance.syntax = instance.syntax || 0;
  }

  static fromBinaryReader(instance: Type, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new Field();
          reader.readMessage(messageInitializer2, Field.fromBinaryReader);
          (instance.fields = instance.fields || []).push(messageInitializer2);
          break;
        case 3:
          (instance.oneofs = instance.oneofs || []).push(reader.readString());
          break;
        case 4:
          const messageInitializer4 = new Option();
          reader.readMessage(messageInitializer4, Option.fromBinaryReader);
          (instance.options = instance.options || []).push(messageInitializer4);
          break;
        case 5:
          instance.sourceContext = new googleProtobuf001.SourceContext();
          reader.readMessage(
            instance.sourceContext,
            googleProtobuf001.SourceContext.fromBinaryReader
          );
          break;
        case 6:
          instance.syntax = reader.readEnum();
          break;
        default:
          reader.skipField();
      }
    }

    Type.refineValues(instance);
  }

  static toBinaryWriter(instance: Type, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.fields && instance.fields.length) {
      writer.writeRepeatedMessage(
        2,
        instance.fields as any,
        Field.toBinaryWriter
      );
    }
    if (instance.oneofs && instance.oneofs.length) {
      writer.writeRepeatedString(3, instance.oneofs);
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        4,
        instance.options as any,
        Option.toBinaryWriter
      );
    }
    if (instance.sourceContext) {
      writer.writeMessage(
        5,
        instance.sourceContext as any,
        googleProtobuf001.SourceContext.toBinaryWriter
      );
    }
    if (instance.syntax) {
      writer.writeEnum(6, instance.syntax);
    }
  }

  private _name?: string;
  private _fields?: Field[];
  private _oneofs?: string[];
  private _options?: Option[];
  private _sourceContext?: googleProtobuf001.SourceContext;
  private _syntax?: Syntax;

  /**
   * Creates an object and applies default Protobuf values
   * @param Type value
   */
  constructor(value?: RecursivePartial<Type>) {
    value = value || {};
    this.name = value.name;
    this.fields = (value.fields || []).map(m => new Field(m));
    this.oneofs = (value.oneofs || []).slice();
    this.options = (value.options || []).map(m => new Option(m));
    this.sourceContext = value.sourceContext
      ? new googleProtobuf001.SourceContext(value.sourceContext)
      : undefined;
    this.syntax = value.syntax;
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
  toObject() {
    return {
      name: this.name,
      fields: (this.fields || []).map(m => m.toObject()),
      oneofs: (this.oneofs || []).slice(),
      options: (this.options || []).map(m => m.toObject()),
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      syntax: this.syntax
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Type {}
export class Field implements GrpcMessage {
  static toBinary(instance: Field) {
    const writer = new BinaryWriter();
    Field.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Field();
    Field.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Field) {
    instance.kind = instance.kind || 0;
    instance.cardinality = instance.cardinality || 0;
    instance.number = instance.number || 0;
    instance.name = instance.name || '';
    instance.typeUrl = instance.typeUrl || '';
    instance.oneofIndex = instance.oneofIndex || 0;
    instance.packed = instance.packed || false;
    instance.options = instance.options || [];
    instance.jsonName = instance.jsonName || '';
    instance.defaultValue = instance.defaultValue || '';
  }

  static fromBinaryReader(instance: Field, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.kind = reader.readEnum();
          break;
        case 2:
          instance.cardinality = reader.readEnum();
          break;
        case 3:
          instance.number = reader.readInt32();
          break;
        case 4:
          instance.name = reader.readString();
          break;
        case 6:
          instance.typeUrl = reader.readString();
          break;
        case 7:
          instance.oneofIndex = reader.readInt32();
          break;
        case 8:
          instance.packed = reader.readBool();
          break;
        case 9:
          const messageInitializer9 = new Option();
          reader.readMessage(messageInitializer9, Option.fromBinaryReader);
          (instance.options = instance.options || []).push(messageInitializer9);
          break;
        case 10:
          instance.jsonName = reader.readString();
          break;
        case 11:
          instance.defaultValue = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    Field.refineValues(instance);
  }

  static toBinaryWriter(instance: Field, writer: BinaryWriter) {
    if (instance.kind) {
      writer.writeEnum(1, instance.kind);
    }
    if (instance.cardinality) {
      writer.writeEnum(2, instance.cardinality);
    }
    if (instance.number) {
      writer.writeInt32(3, instance.number);
    }
    if (instance.name) {
      writer.writeString(4, instance.name);
    }
    if (instance.typeUrl) {
      writer.writeString(6, instance.typeUrl);
    }
    if (instance.oneofIndex) {
      writer.writeInt32(7, instance.oneofIndex);
    }
    if (instance.packed) {
      writer.writeBool(8, instance.packed);
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        9,
        instance.options as any,
        Option.toBinaryWriter
      );
    }
    if (instance.jsonName) {
      writer.writeString(10, instance.jsonName);
    }
    if (instance.defaultValue) {
      writer.writeString(11, instance.defaultValue);
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
   * Creates an object and applies default Protobuf values
   * @param Field value
   */
  constructor(value?: RecursivePartial<Field>) {
    value = value || {};
    this.kind = value.kind;
    this.cardinality = value.cardinality;
    this.number = value.number;
    this.name = value.name;
    this.typeUrl = value.typeUrl;
    this.oneofIndex = value.oneofIndex;
    this.packed = value.packed;
    this.options = (value.options || []).map(m => new Option(m));
    this.jsonName = value.jsonName;
    this.defaultValue = value.defaultValue;
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
  toObject() {
    return {
      kind: this.kind,
      cardinality: this.cardinality,
      number: this.number,
      name: this.name,
      typeUrl: this.typeUrl,
      oneofIndex: this.oneofIndex,
      packed: this.packed,
      options: (this.options || []).map(m => m.toObject()),
      jsonName: this.jsonName,
      defaultValue: this.defaultValue
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Field {
  export enum Kind {
    typeUnknown = 0,
    typeDouble = 1,
    typeFloat = 2,
    typeInt64 = 3,
    typeUint64 = 4,
    typeInt32 = 5,
    typeFixed64 = 6,
    typeFixed32 = 7,
    typeBool = 8,
    typeString = 9,
    typeGroup = 10,
    typeMessage = 11,
    typeBytes = 12,
    typeUint32 = 13,
    typeEnum = 14,
    typeSfixed32 = 15,
    typeSfixed64 = 16,
    typeSint32 = 17,
    typeSint64 = 18
  }
  export enum Cardinality {
    cardinalityUnknown = 0,
    cardinalityOptional = 1,
    cardinalityRequired = 2,
    cardinalityRepeated = 3
  }
}
export class Enum implements GrpcMessage {
  static toBinary(instance: Enum) {
    const writer = new BinaryWriter();
    Enum.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Enum();
    Enum.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Enum) {
    instance.name = instance.name || '';
    instance.enumvalue = instance.enumvalue || [];
    instance.options = instance.options || [];
    instance.sourceContext = instance.sourceContext || undefined;
    instance.syntax = instance.syntax || 0;
  }

  static fromBinaryReader(instance: Enum, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new EnumValue();
          reader.readMessage(messageInitializer2, EnumValue.fromBinaryReader);
          (instance.enumvalue = instance.enumvalue || []).push(
            messageInitializer2
          );
          break;
        case 3:
          const messageInitializer3 = new Option();
          reader.readMessage(messageInitializer3, Option.fromBinaryReader);
          (instance.options = instance.options || []).push(messageInitializer3);
          break;
        case 4:
          instance.sourceContext = new googleProtobuf001.SourceContext();
          reader.readMessage(
            instance.sourceContext,
            googleProtobuf001.SourceContext.fromBinaryReader
          );
          break;
        case 5:
          instance.syntax = reader.readEnum();
          break;
        default:
          reader.skipField();
      }
    }

    Enum.refineValues(instance);
  }

  static toBinaryWriter(instance: Enum, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.enumvalue && instance.enumvalue.length) {
      writer.writeRepeatedMessage(
        2,
        instance.enumvalue as any,
        EnumValue.toBinaryWriter
      );
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        3,
        instance.options as any,
        Option.toBinaryWriter
      );
    }
    if (instance.sourceContext) {
      writer.writeMessage(
        4,
        instance.sourceContext as any,
        googleProtobuf001.SourceContext.toBinaryWriter
      );
    }
    if (instance.syntax) {
      writer.writeEnum(5, instance.syntax);
    }
  }

  private _name?: string;
  private _enumvalue?: EnumValue[];
  private _options?: Option[];
  private _sourceContext?: googleProtobuf001.SourceContext;
  private _syntax?: Syntax;

  /**
   * Creates an object and applies default Protobuf values
   * @param Enum value
   */
  constructor(value?: RecursivePartial<Enum>) {
    value = value || {};
    this.name = value.name;
    this.enumvalue = (value.enumvalue || []).map(m => new EnumValue(m));
    this.options = (value.options || []).map(m => new Option(m));
    this.sourceContext = value.sourceContext
      ? new googleProtobuf001.SourceContext(value.sourceContext)
      : undefined;
    this.syntax = value.syntax;
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
  toObject() {
    return {
      name: this.name,
      enumvalue: (this.enumvalue || []).map(m => m.toObject()),
      options: (this.options || []).map(m => m.toObject()),
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      syntax: this.syntax
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Enum {}
export class EnumValue implements GrpcMessage {
  static toBinary(instance: EnumValue) {
    const writer = new BinaryWriter();
    EnumValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EnumValue();
    EnumValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EnumValue) {
    instance.name = instance.name || '';
    instance.number = instance.number || 0;
    instance.options = instance.options || [];
  }

  static fromBinaryReader(instance: EnumValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.number = reader.readInt32();
          break;
        case 3:
          const messageInitializer3 = new Option();
          reader.readMessage(messageInitializer3, Option.fromBinaryReader);
          (instance.options = instance.options || []).push(messageInitializer3);
          break;
        default:
          reader.skipField();
      }
    }

    EnumValue.refineValues(instance);
  }

  static toBinaryWriter(instance: EnumValue, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.number) {
      writer.writeInt32(2, instance.number);
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        3,
        instance.options as any,
        Option.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _number?: number;
  private _options?: Option[];

  /**
   * Creates an object and applies default Protobuf values
   * @param EnumValue value
   */
  constructor(value?: RecursivePartial<EnumValue>) {
    value = value || {};
    this.name = value.name;
    this.number = value.number;
    this.options = (value.options || []).map(m => new Option(m));
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
  toObject() {
    return {
      name: this.name,
      number: this.number,
      options: (this.options || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EnumValue {}
export class Option implements GrpcMessage {
  static toBinary(instance: Option) {
    const writer = new BinaryWriter();
    Option.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Option();
    Option.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Option) {
    instance.name = instance.name || '';
    instance.value = instance.value || undefined;
  }

  static fromBinaryReader(instance: Option, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.value = new googleProtobuf000.Any();
          reader.readMessage(
            instance.value,
            googleProtobuf000.Any.fromBinaryReader
          );
          break;
        default:
          reader.skipField();
      }
    }

    Option.refineValues(instance);
  }

  static toBinaryWriter(instance: Option, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.value) {
      writer.writeMessage(
        2,
        instance.value as any,
        googleProtobuf000.Any.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _value?: googleProtobuf000.Any;

  /**
   * Creates an object and applies default Protobuf values
   * @param Option value
   */
  constructor(value?: RecursivePartial<Option>) {
    value = value || {};
    this.name = value.name;
    this.value = value.value
      ? new googleProtobuf000.Any(value.value)
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
  toObject() {
    return {
      name: this.name,
      value: this.value ? this.value.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Option {}
