/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class Any implements GrpcMessage {
  static toBinary(instance: Any) {
    const writer = new BinaryWriter();
    Any.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Any();
    Any.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Any) {
    instance.typeUrl = instance.typeUrl || '';
    instance.value = instance.value || new Uint8Array();
  }

  static fromBinaryReader(instance: Any, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.typeUrl = reader.readString();
          break;
        case 2:
          instance.value = reader.readBytes();
          break;
        default:
          reader.skipField();
      }
    }

    Any.refineValues(instance);
  }

  static toBinaryWriter(instance: Any, writer: BinaryWriter) {
    if (instance.typeUrl) {
      writer.writeString(1, instance.typeUrl);
    }
    if (instance.value && instance.value.length) {
      writer.writeBytes(2, instance.value);
    }
  }

  private _typeUrl?: string;
  private _value?: Uint8Array;

  /**
   * Creates an object and applies default Protobuf values
   * @param Any value
   */
  constructor(value?: RecursivePartial<Any>) {
    value = value || {};
    this.typeUrl = value.typeUrl;
    this.value = value.value;
    Any.refineValues(this);
  }
  get typeUrl(): string | undefined {
    return this._typeUrl;
  }
  set typeUrl(value: string | undefined) {
    this._typeUrl = value;
  }
  get value(): Uint8Array | undefined {
    return this._value;
  }
  set value(value: Uint8Array | undefined) {
    this._value = value;
  }
  toObject() {
    return {
      typeUrl: this.typeUrl,
      value: this.value ? this.value.subarray(0) : new Uint8Array()
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Any {}
