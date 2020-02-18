/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class SourceContext implements GrpcMessage {
  static toBinary(instance: SourceContext) {
    const writer = new BinaryWriter();
    SourceContext.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new SourceContext();
    SourceContext.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: SourceContext) {
    instance.fileName = instance.fileName || '';
  }

  static fromBinaryReader(instance: SourceContext, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.fileName = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    SourceContext.refineValues(instance);
  }

  static toBinaryWriter(instance: SourceContext, writer: BinaryWriter) {
    if (instance.fileName) {
      writer.writeString(1, instance.fileName);
    }
  }

  private _fileName?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param SourceContext value
   */
  constructor(value?: RecursivePartial<SourceContext>) {
    value = value || {};
    this.fileName = value.fileName;
    SourceContext.refineValues(this);
  }
  get fileName(): string | undefined {
    return this._fileName;
  }
  set fileName(value: string | undefined) {
    this._fileName = value;
  }
  toObject() {
    return {
      fileName: this.fileName
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module SourceContext {}
