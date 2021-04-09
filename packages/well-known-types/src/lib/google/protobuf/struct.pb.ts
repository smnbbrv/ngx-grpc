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
export enum NullValue {
  NULL_VALUE = 0,
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Struct implements GrpcMessage {
  static id = 'google.protobuf.Struct';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Struct();
    Struct.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Struct) {
    _instance.fields = _instance.fields || {};
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Struct, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const msg_1 = {} as any;
          _reader.readMessage(
            msg_1,
            Struct.FieldsEntry.deserializeBinaryFromReader
          );
          _instance.fields = _instance.fields || {};
          _instance.fields[msg_1.key] = msg_1.value;
          break;
        default:
          _reader.skipField();
      }
    }

    Struct.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Struct, _writer: BinaryWriter) {
    if (!!_instance.fields) {
      const keys_1 = Object.keys(_instance.fields as any);

      if (keys_1.length) {
        const repeated_1 = keys_1
          .map((key) => ({ key: key, value: (_instance.fields as any)[key] }))
          .reduce((r, v) => [...r, v], [] as any[]);

        _writer.writeRepeatedMessage(
          1,
          repeated_1,
          Struct.FieldsEntry.serializeBinaryToWriter
        );
      }
    }
  }

  private _fields?: { [prop: string]: Value };

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Struct to deeply clone from
   */
  constructor(_value?: RecursivePartial<Struct.AsObject>) {
    _value = _value || {};
    (this.fields = _value!.fields
      ? Object.keys(_value!.fields).reduce(
          (r, k) => ({
            ...r,
            [k]: _value!.fields![k] ? new Value(_value!.fields![k]) : undefined,
          }),
          {}
        )
      : {}),
      Struct.refineValues(this);
  }
  get fields(): { [prop: string]: Value } | undefined {
    return this._fields;
  }
  set fields(value: { [prop: string]: Value } | undefined) {
    this._fields = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Struct.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Struct.AsObject {
    return {
      fields: this.fields
        ? Object.keys(this.fields).reduce(
            (r, k) => ({
              ...r,
              [k]: this.fields![k] ? this.fields![k].toObject() : undefined,
            }),
            {}
          )
        : {},
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
  ): Struct.AsProtobufJSON {
    return this.fields
      ? Object.keys(this.fields).reduce(
          (r, k) => ({
            ...r,
            [k]: this.fields![k] ? this.fields![k].toProtobufJSON(options) : {},
          }),
          {}
        )
      : {};
  }
}
export module Struct {
  /**
   * Standard JavaScript object representation for Struct
   */
  export interface AsObject {
    fields?: { [prop: string]: Value };
  }

  /**
   * Protobuf JSON representation for Struct
   */
  export type AsProtobufJSON = { [prop: string]: Value.AsProtobufJSON };

  /**
   * Message implementation for google.protobuf.FieldsEntry
   */
  export class FieldsEntry implements GrpcMessage {
    static id = 'google.protobuf.FieldsEntry';

    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource) {
      const instance = new FieldsEntry();
      FieldsEntry.deserializeBinaryFromReader(
        instance,
        new BinaryReader(bytes)
      );
      return instance;
    }

    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: FieldsEntry) {
      _instance.key = _instance.key || '';
      _instance.value = _instance.value || undefined;
    }

    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(
      _instance: FieldsEntry,
      _reader: BinaryReader
    ) {
      while (_reader.nextField()) {
        if (_reader.isEndGroup()) break;

        switch (_reader.getFieldNumber()) {
          case 1:
            _instance.key = _reader.readString();
            break;
          case 2:
            _instance.value = new Value();
            _reader.readMessage(
              _instance.value,
              Value.deserializeBinaryFromReader
            );
            break;
          default:
            _reader.skipField();
        }
      }

      FieldsEntry.refineValues(_instance);
    }

    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(
      _instance: FieldsEntry,
      _writer: BinaryWriter
    ) {
      if (_instance.key) {
        _writer.writeString(1, _instance.key);
      }
      if (_instance.value) {
        _writer.writeMessage(
          2,
          _instance.value as any,
          Value.serializeBinaryToWriter
        );
      }
    }

    private _key?: string;
    private _value?: Value;

    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of FieldsEntry to deeply clone from
     */
    constructor(_value?: RecursivePartial<FieldsEntry.AsObject>) {
      _value = _value || {};
      this.key = _value.key;
      this.value = _value.value ? new Value(_value.value) : undefined;
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

    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
      const writer = new BinaryWriter();
      FieldsEntry.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    }

    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): FieldsEntry.AsObject {
      return {
        key: this.key,
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
    ): FieldsEntry.AsProtobufJSON {
      return {
        key: this.key,
        value: this.value ? this.value.toProtobufJSON(options) : null,
      };
    }
  }
  export module FieldsEntry {
    /**
     * Standard JavaScript object representation for FieldsEntry
     */
    export interface AsObject {
      key?: string;
      value?: Value.AsObject;
    }

    /**
     * Protobuf JSON representation for FieldsEntry
     */
    export interface AsProtobufJSON {
      key?: string;
      value?: Value.AsProtobufJSON | null;
    }
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Value implements GrpcMessage {
  static id = 'google.protobuf.Value';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Value();
    Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Value) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Value, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.nullValue = _reader.readEnum();
          break;
        case 2:
          _instance.numberValue = _reader.readDouble();
          break;
        case 3:
          _instance.stringValue = _reader.readString();
          break;
        case 4:
          _instance.boolValue = _reader.readBool();
          break;
        case 5:
          _instance.structValue = new Struct();
          _reader.readMessage(
            _instance.structValue,
            Struct.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.listValue = new ListValue();
          _reader.readMessage(
            _instance.listValue,
            ListValue.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    Value.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Value, _writer: BinaryWriter) {
    if (_instance.nullValue || _instance.nullValue === 0) {
      _writer.writeEnum(1, _instance.nullValue);
    }
    if (_instance.numberValue || _instance.numberValue === 0) {
      _writer.writeDouble(2, _instance.numberValue);
    }
    if (_instance.stringValue || _instance.stringValue === '') {
      _writer.writeString(3, _instance.stringValue);
    }
    if (_instance.boolValue || _instance.boolValue === false) {
      _writer.writeBool(4, _instance.boolValue);
    }
    if (_instance.structValue) {
      _writer.writeMessage(
        5,
        _instance.structValue as any,
        Struct.serializeBinaryToWriter
      );
    }
    if (_instance.listValue) {
      _writer.writeMessage(
        6,
        _instance.listValue as any,
        ListValue.serializeBinaryToWriter
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
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Value to deeply clone from
   */
  constructor(_value?: RecursivePartial<Value.AsObject>) {
    _value = _value || {};
    this.nullValue = _value.nullValue;
    this.numberValue = _value.numberValue;
    this.stringValue = _value.stringValue;
    this.boolValue = _value.boolValue;
    this.structValue = _value.structValue
      ? new Struct(_value.structValue)
      : undefined;
    this.listValue = _value.listValue
      ? new ListValue(_value.listValue)
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

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Value.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Value.AsObject {
    return {
      nullValue: this.nullValue,
      numberValue: this.numberValue,
      stringValue: this.stringValue,
      boolValue: this.boolValue,
      structValue: this.structValue ? this.structValue.toObject() : undefined,
      listValue: this.listValue ? this.listValue.toObject() : undefined,
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
  ): Value.AsProtobufJSON {
    switch (this.kind) {
      case Value.KindCase.nullValue:
        return null;
      case Value.KindCase.numberValue:
        return this.numberValue!;
      case Value.KindCase.stringValue:
        return this.stringValue!;
      case Value.KindCase.boolValue:
        return this.boolValue!;
      case Value.KindCase.structValue:
        return this.structValue
          ? this.structValue.toProtobufJSON(options)
          : null;
      case Value.KindCase.listValue:
        return this.listValue ? this.listValue.toProtobufJSON(options) : null;
      default:
        return null; // yes, according to standard should throw error, but no, it's not going to happen here
    }
  }
}
export module Value {
  /**
   * Standard JavaScript object representation for Value
   */
  export interface AsObject {
    nullValue?: NullValue;
    numberValue?: number;
    stringValue?: string;
    boolValue?: boolean;
    structValue?: Struct.AsObject;
    listValue?: ListValue.AsObject;
  }

  /**
   * Protobuf JSON representation for Value
   */
  export type AsProtobufJSON =
    | null
    | string
    | number
    | boolean
    | Struct.AsProtobufJSON
    | Value.AsProtobufJSON[];
  export enum KindCase {
    none = 0,
    nullValue = 1,
    numberValue = 2,
    stringValue = 3,
    boolValue = 4,
    structValue = 5,
    listValue = 6,
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class ListValue implements GrpcMessage {
  static id = 'google.protobuf.ListValue';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ListValue();
    ListValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ListValue) {
    _instance.values = _instance.values || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ListValue,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Value();
          _reader.readMessage(
            messageInitializer1,
            Value.deserializeBinaryFromReader
          );
          (_instance.values = _instance.values || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ListValue.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ListValue, _writer: BinaryWriter) {
    if (_instance.values && _instance.values.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.values as any,
        Value.serializeBinaryToWriter
      );
    }
  }

  private _values?: Value[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ListValue to deeply clone from
   */
  constructor(_value?: RecursivePartial<ListValue.AsObject>) {
    _value = _value || {};
    this.values = (_value.values || []).map((m) => new Value(m));
    ListValue.refineValues(this);
  }
  get values(): Value[] | undefined {
    return this._values;
  }
  set values(value: Value[] | undefined) {
    this._values = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ListValue.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ListValue.AsObject {
    return {
      values: (this.values || []).map((m) => m.toObject()),
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
  ): ListValue.AsProtobufJSON {
    return (this.values || []).map((v) =>
      v ? v.toProtobufJSON(options) : null
    );
  }
}
export module ListValue {
  /**
   * Standard JavaScript object representation for ListValue
   */
  export interface AsObject {
    values?: Value.AsObject[];
  }

  /**
   * Protobuf JSON representation for ListValue
   */
  export type AsProtobufJSON = Value.AsProtobufJSON[];
}
