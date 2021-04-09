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

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Timestamp implements GrpcMessage {
  static id = 'google.protobuf.Timestamp';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Timestamp();
    Timestamp.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static fromDate(date: Date) {
    const timestamp = new Timestamp();

    timestamp.fromDate(date);

    return timestamp;
  }

  static fromISOString(isoDate: string) {
    const timestamp = new Timestamp();

    timestamp.fromISOString(isoDate);

    return timestamp;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Timestamp) {
    _instance.seconds = _instance.seconds || '0';
    _instance.nanos = _instance.nanos || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Timestamp,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.seconds = _reader.readInt64String();
          break;
        case 2:
          _instance.nanos = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    Timestamp.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Timestamp, _writer: BinaryWriter) {
    if (_instance.seconds) {
      _writer.writeInt64String(1, _instance.seconds);
    }
    if (_instance.nanos) {
      _writer.writeInt32(2, _instance.nanos);
    }
  }

  private _seconds?: string;
  private _nanos?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Timestamp to deeply clone from
   */
  constructor(_value?: RecursivePartial<Timestamp.AsObject>) {
    _value = _value || {};
    this.seconds = _value.seconds;
    this.nanos = _value.nanos;
    Timestamp.refineValues(this);
  }
  get seconds(): string | undefined {
    return this._seconds;
  }
  set seconds(value: string | undefined) {
    this._seconds = value;
  }
  get nanos(): number | undefined {
    return this._nanos;
  }
  set nanos(value: number | undefined) {
    this._nanos = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Timestamp.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Timestamp.AsObject {
    return {
      seconds: this.seconds,
      nanos: this.nanos,
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
  ): Timestamp.AsProtobufJSON {
    return this.toISOString();
  }

  fromDate(date: Date) {
    this.seconds = '' + Math.floor(date.getTime() / 1e3);
    this.nanos = date.getMilliseconds() * 1e6;
  }

  toDate() {
    return new Date(
      parseInt(this.seconds || '0') * 1e3 + (this.nanos || 0) / 1e6
    );
  }

  fromISOString(isoDate: string) {
    this.fromDate(new Date(isoDate));
  }

  toISOString() {
    return this.toDate().toISOString();
  }
}
export module Timestamp {
  /**
   * Standard JavaScript object representation for Timestamp
   */
  export interface AsObject {
    seconds?: string;
    nanos?: number;
  }

  /**
   * Protobuf JSON representation for Timestamp
   */
  export type AsProtobufJSON = string;
}
