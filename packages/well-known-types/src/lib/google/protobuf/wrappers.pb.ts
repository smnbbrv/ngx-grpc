/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions,
  uint8ArrayToBase64,
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class DoubleValue implements GrpcMessage {
  static id = 'google.protobuf.DoubleValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new DoubleValue();
    DoubleValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: DoubleValue) {
    _instance.value = _instance.value || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: DoubleValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readDouble();
          break;
        default:
          _reader.skipField();
      }
    }

    DoubleValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: DoubleValue,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeDouble(1, _instance.value);
    }
  }

  private _value?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DoubleValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<DoubleValue.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    DoubleValue.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    DoubleValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): DoubleValue.AsObject {
    return {
      value: this.value,
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
  ): DoubleValue.AsProtobufJSON {
    return this.value;
  }
}
export module DoubleValue {
  /**
   * Standard JavaScript object representation for DoubleValue
   */
  export interface AsObject {
    value?: number;
  }

  /**
   * Protobuf JSON representation for DoubleValue
   */
  export type AsProtobufJSON = number;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class FloatValue implements GrpcMessage {
  static id = 'google.protobuf.FloatValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new FloatValue();
    FloatValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: FloatValue) {
    _instance.value = _instance.value || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: FloatValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readFloat();
          break;
        default:
          _reader.skipField();
      }
    }

    FloatValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: FloatValue, _writer: BinaryWriter) {
    if (_instance.value) {
      _writer.writeFloat(1, _instance.value);
    }
  }

  private _value?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of FloatValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<FloatValue.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    FloatValue.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    FloatValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): FloatValue.AsObject {
    return {
      value: this.value,
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
  ): FloatValue.AsProtobufJSON {
    return this.value;
  }
}
export module FloatValue {
  /**
   * Standard JavaScript object representation for FloatValue
   */
  export interface AsObject {
    value?: number;
  }

  /**
   * Protobuf JSON representation for FloatValue
   */
  export type AsProtobufJSON = number;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Int64Value implements GrpcMessage {
  static id = 'google.protobuf.Int64Value';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Int64Value();
    Int64Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Int64Value) {
    _instance.value = _instance.value || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Int64Value,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    Int64Value.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Int64Value, _writer: BinaryWriter) {
    if (_instance.value) {
      _writer.writeInt64String(1, _instance.value);
    }
  }

  private _value?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Int64Value to deeply clone from
   */
  constructor(_value?: RecursivePartial<Int64Value.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    Int64Value.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Int64Value.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Int64Value.AsObject {
    return {
      value: this.value,
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
  ): Int64Value.AsProtobufJSON {
    return this.value;
  }
}
export module Int64Value {
  /**
   * Standard JavaScript object representation for Int64Value
   */
  export interface AsObject {
    value?: string;
  }

  /**
   * Protobuf JSON representation for Int64Value
   */
  export type AsProtobufJSON = string;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class UInt64Value implements GrpcMessage {
  static id = 'google.protobuf.UInt64Value';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new UInt64Value();
    UInt64Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: UInt64Value) {
    _instance.value = _instance.value || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: UInt64Value,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readUint64String();
          break;
        default:
          _reader.skipField();
      }
    }

    UInt64Value.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: UInt64Value,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeUint64String(1, _instance.value);
    }
  }

  private _value?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of UInt64Value to deeply clone from
   */
  constructor(_value?: RecursivePartial<UInt64Value.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    UInt64Value.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    UInt64Value.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): UInt64Value.AsObject {
    return {
      value: this.value,
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
  ): UInt64Value.AsProtobufJSON {
    return this.value;
  }
}
export module UInt64Value {
  /**
   * Standard JavaScript object representation for UInt64Value
   */
  export interface AsObject {
    value?: string;
  }

  /**
   * Protobuf JSON representation for UInt64Value
   */
  export type AsProtobufJSON = string;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Int32Value implements GrpcMessage {
  static id = 'google.protobuf.Int32Value';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Int32Value();
    Int32Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Int32Value) {
    _instance.value = _instance.value || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Int32Value,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    Int32Value.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Int32Value, _writer: BinaryWriter) {
    if (_instance.value) {
      _writer.writeInt32(1, _instance.value);
    }
  }

  private _value?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Int32Value to deeply clone from
   */
  constructor(_value?: RecursivePartial<Int32Value.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    Int32Value.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Int32Value.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Int32Value.AsObject {
    return {
      value: this.value,
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
  ): Int32Value.AsProtobufJSON {
    return this.value;
  }
}
export module Int32Value {
  /**
   * Standard JavaScript object representation for Int32Value
   */
  export interface AsObject {
    value?: number;
  }

  /**
   * Protobuf JSON representation for Int32Value
   */
  export type AsProtobufJSON = number;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class UInt32Value implements GrpcMessage {
  static id = 'google.protobuf.UInt32Value';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new UInt32Value();
    UInt32Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: UInt32Value) {
    _instance.value = _instance.value || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: UInt32Value,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readUint32();
          break;
        default:
          _reader.skipField();
      }
    }

    UInt32Value.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: UInt32Value,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeUint32(1, _instance.value);
    }
  }

  private _value?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of UInt32Value to deeply clone from
   */
  constructor(_value?: RecursivePartial<UInt32Value.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    UInt32Value.refineValues(this);
  }
  get value(): number | undefined {
    return this._value;
  }
  set value(value: number | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    UInt32Value.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): UInt32Value.AsObject {
    return {
      value: this.value,
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
  ): UInt32Value.AsProtobufJSON {
    return this.value;
  }
}
export module UInt32Value {
  /**
   * Standard JavaScript object representation for UInt32Value
   */
  export interface AsObject {
    value?: number;
  }

  /**
   * Protobuf JSON representation for UInt32Value
   */
  export type AsProtobufJSON = number;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class BoolValue implements GrpcMessage {
  static id = 'google.protobuf.BoolValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BoolValue();
    BoolValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BoolValue) {
    _instance.value = _instance.value || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BoolValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    BoolValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: BoolValue, _writer: BinaryWriter) {
    if (_instance.value) {
      _writer.writeBool(1, _instance.value);
    }
  }

  private _value?: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BoolValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<BoolValue.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    BoolValue.refineValues(this);
  }
  get value(): boolean | undefined {
    return this._value;
  }
  set value(value: boolean | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BoolValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BoolValue.AsObject {
    return {
      value: this.value,
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
  ): BoolValue.AsProtobufJSON {
    return this.value;
  }
}
export module BoolValue {
  /**
   * Standard JavaScript object representation for BoolValue
   */
  export interface AsObject {
    value?: boolean;
  }

  /**
   * Protobuf JSON representation for BoolValue
   */
  export type AsProtobufJSON = boolean;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class StringValue implements GrpcMessage {
  static id = 'google.protobuf.StringValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new StringValue();
    StringValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: StringValue) {
    _instance.value = _instance.value || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: StringValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    StringValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: StringValue,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeString(1, _instance.value);
    }
  }

  private _value?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of StringValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<StringValue.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    StringValue.refineValues(this);
  }
  get value(): string | undefined {
    return this._value;
  }
  set value(value: string | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    StringValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): StringValue.AsObject {
    return {
      value: this.value,
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
  ): StringValue.AsProtobufJSON {
    return this.value;
  }
}
export module StringValue {
  /**
   * Standard JavaScript object representation for StringValue
   */
  export interface AsObject {
    value?: string;
  }

  /**
   * Protobuf JSON representation for StringValue
   */
  export type AsProtobufJSON = string;
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class BytesValue implements GrpcMessage {
  static id = 'google.protobuf.BytesValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BytesValue();
    BytesValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BytesValue) {
    _instance.value = _instance.value || new Uint8Array();
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BytesValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readBytes();
          break;
        default:
          _reader.skipField();
      }
    }

    BytesValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: BytesValue, _writer: BinaryWriter) {
    if (_instance.value && _instance.value.length) {
      _writer.writeBytes(1, _instance.value);
    }
  }

  private _value?: Uint8Array;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BytesValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<BytesValue.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    BytesValue.refineValues(this);
  }
  get value(): Uint8Array | undefined {
    return this._value;
  }
  set value(value: Uint8Array | undefined) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BytesValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BytesValue.AsObject {
    return {
      value: this.value ? this.value.subarray(0) : new Uint8Array(),
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
  ): BytesValue.AsProtobufJSON {
    return this.value ? uint8ArrayToBase64(this.value) : '';
  }
}
export module BytesValue {
  /**
   * Standard JavaScript object representation for BytesValue
   */
  export interface AsObject {
    value?: Uint8Array;
  }

  /**
   * Protobuf JSON representation for BytesValue
   */
  export type AsProtobufJSON = string;
}
