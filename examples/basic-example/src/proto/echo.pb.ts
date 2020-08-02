/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for echo.EchoRequest
 */
export class EchoRequest implements GrpcMessage {
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
   * @param instance message instance
   */
  static refineValues(instance: EchoRequest) {
    instance.message = instance.message || '';
    instance.shouldThrow = instance.shouldThrow || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param instance message instance
   * @param reader binary reader instance
   */
  static deserializeBinaryFromReader(
    instance: EchoRequest,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.message = reader.readString();
          break;
        case 2:
          instance.shouldThrow = reader.readBool();
          break;
        default:
          reader.skipField();
      }
    }

    EchoRequest.refineValues(instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param instance message instance
   * @param writer binary writer instance
   */
  static serializeBinaryToWriter(instance: EchoRequest, writer: BinaryWriter) {
    if (instance.message) {
      writer.writeString(1, instance.message);
    }
    if (instance.shouldThrow) {
      writer.writeBool(2, instance.shouldThrow);
    }
  }

  private _message?: string;
  private _shouldThrow?: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param value initial values object or instance of EchoRequest to deeply clone from
   */
  constructor(value?: RecursivePartial<EchoRequest>) {
    value = value || {};
    this.message = value.message;
    this.shouldThrow = value.shouldThrow;
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
    };
  }

  /**
   * JSON serializer
   * Only intended to be used by `JSON.stringify` function. If you want to cast message to standard JavaScript object, use `toObject()` instead
   */
  toJSON() {
    return this.toObject();
  }
}
export module EchoRequest {
  /**
   * Standard JavaScript object representation for EchoRequest
   */
  export interface AsObject {
    message?: string;
    shouldThrow?: boolean;
  }
}

/**
 * Message implementation for echo.EchoResponse
 */
export class EchoResponse implements GrpcMessage {
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
   * @param instance message instance
   */
  static refineValues(instance: EchoResponse) {
    instance.message = instance.message || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param instance message instance
   * @param reader binary reader instance
   */
  static deserializeBinaryFromReader(
    instance: EchoResponse,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.message = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    EchoResponse.refineValues(instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param instance message instance
   * @param writer binary writer instance
   */
  static serializeBinaryToWriter(instance: EchoResponse, writer: BinaryWriter) {
    if (instance.message) {
      writer.writeString(1, instance.message);
    }
  }

  private _message?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param value initial values object or instance of EchoResponse to deeply clone from
   */
  constructor(value?: RecursivePartial<EchoResponse>) {
    value = value || {};
    this.message = value.message;
    EchoResponse.refineValues(this);
  }
  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
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
    };
  }

  /**
   * JSON serializer
   * Only intended to be used by `JSON.stringify` function. If you want to cast message to standard JavaScript object, use `toObject()` instead
   */
  toJSON() {
    return this.toObject();
  }
}
export module EchoResponse {
  /**
   * Standard JavaScript object representation for EchoResponse
   */
  export interface AsObject {
    message?: string;
  }
}
