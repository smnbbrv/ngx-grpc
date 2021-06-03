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
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
/**
 * Message implementation for echo.EchoRequest
 */
export class EchoRequest implements GrpcMessage {
  static id = 'echo.EchoRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new EchoRequest();
    EchoRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: EchoRequest) {
    _instance.message = _instance.message || '';
    _instance.shouldThrow = _instance.shouldThrow || false;
    _instance.timestamp = _instance.timestamp || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: EchoRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.message = _reader.readString();
          break;
        case 2:
          _instance.shouldThrow = _reader.readBool();
          break;
        case 3:
          _instance.timestamp = new googleProtobuf000.Timestamp();
          _reader.readMessage(
            _instance.timestamp,
            googleProtobuf000.Timestamp.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    EchoRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: EchoRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.message) {
      _writer.writeString(1, _instance.message);
    }
    if (_instance.shouldThrow) {
      _writer.writeBool(2, _instance.shouldThrow);
    }
    if (_instance.timestamp) {
      _writer.writeMessage(
        3,
        _instance.timestamp as any,
        googleProtobuf000.Timestamp.serializeBinaryToWriter
      );
    }
  }

  private _message?: string;
  private _shouldThrow?: boolean;
  private _timestamp?: googleProtobuf000.Timestamp;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of EchoRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<EchoRequest.AsObject>) {
    _value = _value || {};
    this.message = _value.message;
    this.shouldThrow = _value.shouldThrow;
    this.timestamp = _value.timestamp
      ? new googleProtobuf000.Timestamp(_value.timestamp)
      : undefined;
    EchoRequest.refineValues(this);
  }
  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
  }
  get shouldThrow(): boolean | undefined {
    return this._shouldThrow;
  }
  set shouldThrow(value: boolean | undefined) {
    this._shouldThrow = value;
  }
  get timestamp(): googleProtobuf000.Timestamp | undefined {
    return this._timestamp;
  }
  set timestamp(value: googleProtobuf000.Timestamp | undefined) {
    this._timestamp = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    EchoRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): EchoRequest.AsObject {
    return {
      message: this.message,
      shouldThrow: this.shouldThrow,
      timestamp: this.timestamp ? this.timestamp.toObject() : undefined,
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
  ): EchoRequest.AsProtobufJSON {
    return {
      message: this.message,
      shouldThrow: this.shouldThrow,
      timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
    };
  }
}
export module EchoRequest {
  /**
   * Standard JavaScript object representation for EchoRequest
   */
  export interface AsObject {
    message?: string;
    shouldThrow?: boolean;
    timestamp?: googleProtobuf000.Timestamp.AsObject;
  }

  /**
   * Protobuf JSON representation for EchoRequest
   */
  export interface AsProtobufJSON {
    message?: string;
    shouldThrow?: boolean;
    timestamp?: googleProtobuf000.Timestamp.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for echo.EchoResponse
 */
export class EchoResponse implements GrpcMessage {
  static id = 'echo.EchoResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new EchoResponse();
    EchoResponse.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: EchoResponse) {
    _instance.message = _instance.message || '';
    _instance.timestamp = _instance.timestamp || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: EchoResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.message = _reader.readString();
          break;
        case 2:
          _instance.timestamp = new googleProtobuf000.Timestamp();
          _reader.readMessage(
            _instance.timestamp,
            googleProtobuf000.Timestamp.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    EchoResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: EchoResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.message) {
      _writer.writeString(1, _instance.message);
    }
    if (_instance.timestamp) {
      _writer.writeMessage(
        2,
        _instance.timestamp as any,
        googleProtobuf000.Timestamp.serializeBinaryToWriter
      );
    }
  }

  private _message?: string;
  private _timestamp?: googleProtobuf000.Timestamp;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of EchoResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<EchoResponse.AsObject>) {
    _value = _value || {};
    this.message = _value.message;
    this.timestamp = _value.timestamp
      ? new googleProtobuf000.Timestamp(_value.timestamp)
      : undefined;
    EchoResponse.refineValues(this);
  }
  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
  }
  get timestamp(): googleProtobuf000.Timestamp | undefined {
    return this._timestamp;
  }
  set timestamp(value: googleProtobuf000.Timestamp | undefined) {
    this._timestamp = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    EchoResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): EchoResponse.AsObject {
    return {
      message: this.message,
      timestamp: this.timestamp ? this.timestamp.toObject() : undefined,
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
  ): EchoResponse.AsProtobufJSON {
    return {
      message: this.message,
      timestamp: this.timestamp ? this.timestamp.toProtobufJSON(options) : null,
    };
  }
}
export module EchoResponse {
  /**
   * Standard JavaScript object representation for EchoResponse
   */
  export interface AsObject {
    message?: string;
    timestamp?: googleProtobuf000.Timestamp.AsObject;
  }

  /**
   * Protobuf JSON representation for EchoResponse
   */
  export interface AsProtobufJSON {
    message?: string;
    timestamp?: googleProtobuf000.Timestamp.AsProtobufJSON | null;
  }
}
