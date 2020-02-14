/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class EchoRequest implements GrpcMessage {
  static toBinary(instance: EchoRequest) {
    const writer = new BinaryWriter();
    EchoRequest.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EchoRequest();
    EchoRequest.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EchoRequest) {
    instance.message = instance.message || '';
    instance.shouldThrow = instance.shouldThrow || false;
  }

  static fromBinaryReader(instance: EchoRequest, reader: BinaryReader) {
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

  static toBinaryWriter(instance: EchoRequest, writer: BinaryWriter) {
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
   * Creates an object and applies default Protobuf values
   * @param EchoRequest value
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
  toObject() {
    return {
      message: this.message,
      shouldThrow: this.shouldThrow
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EchoRequest {}
export class EchoResponse implements GrpcMessage {
  static toBinary(instance: EchoResponse) {
    const writer = new BinaryWriter();
    EchoResponse.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EchoResponse();
    EchoResponse.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EchoResponse) {
    instance.message = instance.message || '';
  }

  static fromBinaryReader(instance: EchoResponse, reader: BinaryReader) {
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

  static toBinaryWriter(instance: EchoResponse, writer: BinaryWriter) {
    if (instance.message) {
      writer.writeString(1, instance.message);
    }
  }

  private _message?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param EchoResponse value
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
  toObject() {
    return {
      message: this.message
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EchoResponse {}
