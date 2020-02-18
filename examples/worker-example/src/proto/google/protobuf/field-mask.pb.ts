/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class FieldMask implements GrpcMessage {
  static toBinary(instance: FieldMask) {
    const writer = new BinaryWriter();
    FieldMask.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FieldMask();
    FieldMask.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FieldMask) {
    instance.paths = instance.paths || [];
  }

  static fromBinaryReader(instance: FieldMask, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          (instance.paths = instance.paths || []).push(reader.readString());
          break;
        default:
          reader.skipField();
      }
    }

    FieldMask.refineValues(instance);
  }

  static toBinaryWriter(instance: FieldMask, writer: BinaryWriter) {
    if (instance.paths && instance.paths.length) {
      writer.writeRepeatedString(1, instance.paths);
    }
  }

  private _paths?: string[];

  /**
   * Creates an object and applies default Protobuf values
   * @param FieldMask value
   */
  constructor(value?: RecursivePartial<FieldMask>) {
    value = value || {};
    this.paths = (value.paths || []).slice();
    FieldMask.refineValues(this);
  }
  get paths(): string[] | undefined {
    return this._paths;
  }
  set paths(value: string[] | undefined) {
    this._paths = value;
  }
  toObject() {
    return {
      paths: (this.paths || []).slice()
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FieldMask {}
