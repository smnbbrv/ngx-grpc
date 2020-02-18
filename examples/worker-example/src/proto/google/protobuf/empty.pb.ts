/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class Empty implements GrpcMessage {
  static toBinary(instance: Empty) {
    const writer = new BinaryWriter();
    Empty.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Empty();
    Empty.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Empty) {}

  static fromBinaryReader(instance: Empty, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        default:
          reader.skipField();
      }
    }

    Empty.refineValues(instance);
  }

  static toBinaryWriter(instance: Empty, writer: BinaryWriter) {}

  /**
   * Creates an object and applies default Protobuf values
   * @param Empty value
   */
  constructor(value?: RecursivePartial<Empty>) {
    value = value || {};
    Empty.refineValues(this);
  }
  toObject() {
    return {};
  }
  toJSON() {
    return this.toObject();
  }
}
export module Empty {}
