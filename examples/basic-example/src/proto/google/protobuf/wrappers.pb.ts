/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class DoubleValue implements GrpcMessage {
  static toBinary(instance: DoubleValue) {
    const writer = new BinaryWriter();
    DoubleValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new DoubleValue();
    DoubleValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: DoubleValue) {
    instance.value = instance.value || 0;
  }

  static fromBinaryReader(instance: DoubleValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readDouble();
          break;
        default:
          reader.skipField();
      }
    }

    DoubleValue.refineValues(instance);
  }

  static toBinaryWriter(instance: DoubleValue, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeDouble(1, instance.value);
    }
  }

  private _value?: number;

  /**
   * Creates an object and applies default Protobuf values
   * @param DoubleValue value
   */
  constructor(value?: RecursivePartial<DoubleValue>) {
    value = value || {};
    this.value = value.value;
    DoubleValue.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module DoubleValue {}
export class FloatValue implements GrpcMessage {
  static toBinary(instance: FloatValue) {
    const writer = new BinaryWriter();
    FloatValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FloatValue();
    FloatValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FloatValue) {
    instance.value = instance.value || 0;
  }

  static fromBinaryReader(instance: FloatValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readFloat();
          break;
        default:
          reader.skipField();
      }
    }

    FloatValue.refineValues(instance);
  }

  static toBinaryWriter(instance: FloatValue, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeFloat(1, instance.value);
    }
  }

  private _value?: number;

  /**
   * Creates an object and applies default Protobuf values
   * @param FloatValue value
   */
  constructor(value?: RecursivePartial<FloatValue>) {
    value = value || {};
    this.value = value.value;
    FloatValue.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FloatValue {}
export class Int64Value implements GrpcMessage {
  static toBinary(instance: Int64Value) {
    const writer = new BinaryWriter();
    Int64Value.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Int64Value();
    Int64Value.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Int64Value) {
    instance.value = instance.value || '0';
  }

  static fromBinaryReader(instance: Int64Value, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readInt64String();
          break;
        default:
          reader.skipField();
      }
    }

    Int64Value.refineValues(instance);
  }

  static toBinaryWriter(instance: Int64Value, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeInt64String(1, instance.value);
    }
  }

  private _value?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param Int64Value value
   */
  constructor(value?: RecursivePartial<Int64Value>) {
    value = value || {};
    this.value = value.value;
    Int64Value.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Int64Value {}
export class UInt64Value implements GrpcMessage {
  static toBinary(instance: UInt64Value) {
    const writer = new BinaryWriter();
    UInt64Value.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new UInt64Value();
    UInt64Value.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: UInt64Value) {
    instance.value = instance.value || '0';
  }

  static fromBinaryReader(instance: UInt64Value, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readUint64String();
          break;
        default:
          reader.skipField();
      }
    }

    UInt64Value.refineValues(instance);
  }

  static toBinaryWriter(instance: UInt64Value, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeUint64String(1, instance.value);
    }
  }

  private _value?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param UInt64Value value
   */
  constructor(value?: RecursivePartial<UInt64Value>) {
    value = value || {};
    this.value = value.value;
    UInt64Value.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module UInt64Value {}
export class Int32Value implements GrpcMessage {
  static toBinary(instance: Int32Value) {
    const writer = new BinaryWriter();
    Int32Value.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Int32Value();
    Int32Value.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Int32Value) {
    instance.value = instance.value || 0;
  }

  static fromBinaryReader(instance: Int32Value, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readInt32();
          break;
        default:
          reader.skipField();
      }
    }

    Int32Value.refineValues(instance);
  }

  static toBinaryWriter(instance: Int32Value, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeInt32(1, instance.value);
    }
  }

  private _value?: number;

  /**
   * Creates an object and applies default Protobuf values
   * @param Int32Value value
   */
  constructor(value?: RecursivePartial<Int32Value>) {
    value = value || {};
    this.value = value.value;
    Int32Value.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Int32Value {}
export class UInt32Value implements GrpcMessage {
  static toBinary(instance: UInt32Value) {
    const writer = new BinaryWriter();
    UInt32Value.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new UInt32Value();
    UInt32Value.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: UInt32Value) {
    instance.value = instance.value || 0;
  }

  static fromBinaryReader(instance: UInt32Value, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readUint32();
          break;
        default:
          reader.skipField();
      }
    }

    UInt32Value.refineValues(instance);
  }

  static toBinaryWriter(instance: UInt32Value, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeUint32(1, instance.value);
    }
  }

  private _value?: number;

  /**
   * Creates an object and applies default Protobuf values
   * @param UInt32Value value
   */
  constructor(value?: RecursivePartial<UInt32Value>) {
    value = value || {};
    this.value = value.value;
    UInt32Value.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module UInt32Value {}
export class BoolValue implements GrpcMessage {
  static toBinary(instance: BoolValue) {
    const writer = new BinaryWriter();
    BoolValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new BoolValue();
    BoolValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: BoolValue) {
    instance.value = instance.value || false;
  }

  static fromBinaryReader(instance: BoolValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readBool();
          break;
        default:
          reader.skipField();
      }
    }

    BoolValue.refineValues(instance);
  }

  static toBinaryWriter(instance: BoolValue, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeBool(1, instance.value);
    }
  }

  private _value?: boolean;

  /**
   * Creates an object and applies default Protobuf values
   * @param BoolValue value
   */
  constructor(value?: RecursivePartial<BoolValue>) {
    value = value || {};
    this.value = value.value;
    BoolValue.refineValues(this);
  }
  get value(): boolean | undefined {
    return this._value;
  }
  set value(value: boolean | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module BoolValue {}
export class StringValue implements GrpcMessage {
  static toBinary(instance: StringValue) {
    const writer = new BinaryWriter();
    StringValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new StringValue();
    StringValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: StringValue) {
    instance.value = instance.value || '';
  }

  static fromBinaryReader(instance: StringValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    StringValue.refineValues(instance);
  }

  static toBinaryWriter(instance: StringValue, writer: BinaryWriter) {
    if (instance.value) {
      writer.writeString(1, instance.value);
    }
  }

  private _value?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param StringValue value
   */
  constructor(value?: RecursivePartial<StringValue>) {
    value = value || {};
    this.value = value.value;
    StringValue.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module StringValue {}
export class BytesValue implements GrpcMessage {
  static toBinary(instance: BytesValue) {
    const writer = new BinaryWriter();
    BytesValue.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new BytesValue();
    BytesValue.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: BytesValue) {
    instance.value = instance.value || new Uint8Array();
  }

  static fromBinaryReader(instance: BytesValue, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.value = reader.readBytes();
          break;
        default:
          reader.skipField();
      }
    }

    BytesValue.refineValues(instance);
  }

  static toBinaryWriter(instance: BytesValue, writer: BinaryWriter) {
    if (instance.value && instance.value.length) {
      writer.writeBytes(1, instance.value);
    }
  }

  private _value?: Uint8Array;

  /**
   * Creates an object and applies default Protobuf values
   * @param BytesValue value
   */
  constructor(value?: RecursivePartial<BytesValue>) {
    value = value || {};
    this.value = value.value;
    BytesValue.refineValues(this);
  }
  get value(): Uint8Array | undefined {
    return this._value;
  }
  set value(value: Uint8Array | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      value: this.value ? this.value.subarray(0) : new Uint8Array()
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module BytesValue {}
