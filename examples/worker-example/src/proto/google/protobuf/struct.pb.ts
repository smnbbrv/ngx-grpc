/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export enum NullValue {
  nullValue = 0
}
export class Struct implements GrpcMessage {
  static toBinary(instance: Struct) {
    const writer = new BinaryWriter();
    Struct.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Struct();
    Struct.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Struct) {
    instance.fields = instance.fields || {};
  }

  static fromBinaryReader(instance: Struct, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          const msg_1 = {} as any;
          reader.readMessage(msg_1, Struct.FieldsEntry.fromBinaryReader);
          instance.fields = instance.fields || {};
          instance.fields[msg_1.key] = msg_1.value;
          break;
        default:
          reader.skipField();
      }
    }

    Struct.refineValues(instance);
  }

  static toBinaryWriter(instance: Struct, writer: BinaryWriter) {
    if (!!instance.fields) {
      const keys_1 = Object.keys(instance.fields as any);

      if (keys_1.length) {
        const repeated_1 = keys_1
          .map(key => ({ key: key, value: (instance.fields as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        writer.writeRepeatedMessage(
          1,
          repeated_1,
          Struct.FieldsEntry.toBinaryWriter
        );
      }
    }
  }

  private _fields?: { [prop: string]: Value };

  /**
   * Creates an object and applies default Protobuf values
   * @param Struct value
   */
  constructor(value?: RecursivePartial<Struct>) {
    value = value || {};
    this.fields = { ...(value.fields || {}) };
    Struct.refineValues(this);
  }
  get fields(): { [prop: string]: Value } | undefined {
    return this._fields;
  }
  set fields(value: { [prop: string]: Value } | undefined) {
    this._fields = value;
  }
  toObject() {
    return {
      fields: { ...(this.fields || {}) }
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Struct {
  export class FieldsEntry implements GrpcMessage {
    static toBinary(instance: FieldsEntry) {
      const writer = new BinaryWriter();
      FieldsEntry.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new FieldsEntry();
      FieldsEntry.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: FieldsEntry) {
      instance.key = instance.key || '';
      instance.value = instance.value || undefined;
    }

    static fromBinaryReader(instance: FieldsEntry, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.key = reader.readString();
            break;
          case 2:
            instance.value = new Value();
            reader.readMessage(instance.value, Value.fromBinaryReader);
            break;
          default:
            reader.skipField();
        }
      }

      FieldsEntry.refineValues(instance);
    }

    static toBinaryWriter(instance: FieldsEntry, writer: BinaryWriter) {
      if (instance.key) {
        writer.writeString(1, instance.key);
      }
      if (instance.value) {
        writer.writeMessage(2, instance.value as any, Value.toBinaryWriter);
      }
    }

    private _key?: string;
    private _value?: Value;

    /**
     * Creates an object and applies default Protobuf values
     * @param FieldsEntry value
     */
    constructor(value?: RecursivePartial<FieldsEntry>) {
      value = value || {};
      this.key = value.key;
      this.value = value.value ? new Value(value.value) : undefined;
      FieldsEntry.refineValues(this);
    }
    get key(): string | undefined {
      return this._key;
    }
    set key(value: string | undefined) {
      this._key = value;
    }
    get value(): Value | undefined {
      return this._value;
    }
    set value(value: Value | undefined) {
      this._value = value;
    }
    toObject() {
      return {
        key: this.key,
        value: this.value ? this.value.toObject() : undefined
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module FieldsEntry {}
}
export class Value implements GrpcMessage {
  static toBinary(instance: Value) {
    const writer = new BinaryWriter();
    Value.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Value();
    Value.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Value) {}

  static fromBinaryReader(instance: Value, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.nullValue = reader.readEnum();
          break;
        case 2:
          instance.numberValue = reader.readDouble();
          break;
        case 3:
          instance.stringValue = reader.readString();
          break;
        case 4:
          instance.boolValue = reader.readBool();
          break;
        case 5:
          instance.structValue = new Struct();
          reader.readMessage(instance.structValue, Struct.fromBinaryReader);
          break;
        case 6:
          instance.listValue = new ListValue();
          reader.readMessage(instance.listValue, ListValue.fromBinaryReader);
          break;
        default:
          reader.skipField();
      }
    }

    Value.refineValues(instance);
  }

  static toBinaryWriter(instance: Value, writer: BinaryWriter) {
    if (instance.nullValue) {
      writer.writeEnum(1, instance.nullValue);
    }
    if (instance.numberValue) {
      writer.writeDouble(2, instance.numberValue);
    }
    if (instance.stringValue) {
      writer.writeString(3, instance.stringValue);
    }
    if (instance.boolValue) {
      writer.writeBool(4, instance.boolValue);
    }
    if (instance.structValue) {
      writer.writeMessage(
        5,
        instance.structValue as any,
        Struct.toBinaryWriter
      );
    }
    if (instance.listValue) {
      writer.writeMessage(
        6,
        instance.listValue as any,
        ListValue.toBinaryWriter
      );
    }
  }

  private _nullValue?: NullValue;
  private _numberValue?: number;
  private _stringValue?: string;
  private _boolValue?: boolean;
  private _structValue?: Struct;
  private _listValue?: ListValue;

  private _kind: Value.KindCase = Value.KindCase.none;
  /**
   * Creates an object and applies default Protobuf values
   * @param Value value
   */
  constructor(value?: RecursivePartial<Value>) {
    value = value || {};
    this.nullValue = value.nullValue;
    this.numberValue = value.numberValue;
    this.stringValue = value.stringValue;
    this.boolValue = value.boolValue;
    this.structValue = value.structValue
      ? new Struct(value.structValue)
      : undefined;
    this.listValue = value.listValue
      ? new ListValue(value.listValue)
      : undefined;
    Value.refineValues(this);
  }
  get nullValue(): NullValue | undefined {
    return this._nullValue;
  }
  set nullValue(value: NullValue | undefined) {
    if (value !== undefined && value !== null) {
      this._numberValue = this._stringValue = this._boolValue = this._structValue = this._listValue = undefined;
      this._kind = Value.KindCase.nullValue;
    }
    this._nullValue = value;
  }
  get numberValue(): number | undefined {
    return this._numberValue;
  }
  set numberValue(value: number | undefined) {
    if (value !== undefined && value !== null) {
      this._nullValue = this._stringValue = this._boolValue = this._structValue = this._listValue = undefined;
      this._kind = Value.KindCase.numberValue;
    }
    this._numberValue = value;
  }
  get stringValue(): string | undefined {
    return this._stringValue;
  }
  set stringValue(value: string | undefined) {
    if (value !== undefined && value !== null) {
      this._nullValue = this._numberValue = this._boolValue = this._structValue = this._listValue = undefined;
      this._kind = Value.KindCase.stringValue;
    }
    this._stringValue = value;
  }
  get boolValue(): boolean | undefined {
    return this._boolValue;
  }
  set boolValue(value: boolean | undefined) {
    if (value !== undefined && value !== null) {
      this._nullValue = this._numberValue = this._stringValue = this._structValue = this._listValue = undefined;
      this._kind = Value.KindCase.boolValue;
    }
    this._boolValue = value;
  }
  get structValue(): Struct | undefined {
    return this._structValue;
  }
  set structValue(value: Struct | undefined) {
    if (value !== undefined && value !== null) {
      this._nullValue = this._numberValue = this._stringValue = this._boolValue = this._listValue = undefined;
      this._kind = Value.KindCase.structValue;
    }
    this._structValue = value;
  }
  get listValue(): ListValue | undefined {
    return this._listValue;
  }
  set listValue(value: ListValue | undefined) {
    if (value !== undefined && value !== null) {
      this._nullValue = this._numberValue = this._stringValue = this._boolValue = this._structValue = undefined;
      this._kind = Value.KindCase.listValue;
    }
    this._listValue = value;
  }
  get kind() {
    return this._kind;
  }
  toObject() {
    return {
      nullValue: this.nullValue,
      numberValue: this.numberValue,
      stringValue: this.stringValue,
      boolValue: this.boolValue,
      structValue: this.structValue ? this.structValue.toObject() : undefined,
      listValue: this.listValue ? this.listValue.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Value {
  export enum KindCase {
    none = 0,
    nullValue = 1,
    numberValue = 2,
    stringValue = 3,
    boolValue = 4,
    structValue = 5,
    listValue = 6
  }
}
export class ListValue implements GrpcMessage {
  static toBinary(instance: ListValue) {
    const writer = new BinaryWriter();
    ListValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new ListValue();
    ListValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: ListValue) {
    instance.values = instance.values || [];
  }

  static fromBinaryReader(instance: ListValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Value();
          reader.readMessage(messageInitializer1, Value.fromBinaryReader);
          (instance.values = instance.values || []).push(messageInitializer1);
          break;
        default:
          reader.skipField();
      }
    }

    ListValue.refineValues(instance);
  }

  static toBinaryWriter(instance: ListValue, writer: BinaryWriter) {
    if (instance.values && instance.values.length) {
      writer.writeRepeatedMessage(
        1,
        instance.values as any,
        Value.toBinaryWriter
      );
    }
  }

  private _values?: Value[];

  /**
   * Creates an object and applies default Protobuf values
   * @param ListValue value
   */
  constructor(value?: RecursivePartial<ListValue>) {
    value = value || {};
    this.values = (value.values || []).map(m => new Value(m));
    ListValue.refineValues(this);
  }
  get values(): Value[] | undefined {
    return this._values;
  }
  set values(value: Value[] | undefined) {
    this._values = value;
  }
  toObject() {
    return {
      values: (this.values || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module ListValue {}
