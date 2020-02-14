/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class Duration implements GrpcMessage {
  static toBinary(instance: Duration) {
    const writer = new BinaryWriter();
    Duration.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Duration();
    Duration.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Duration) {
    instance.seconds = instance.seconds || '0';
    instance.nanos = instance.nanos || 0;
  }

  static fromBinaryReader(instance: Duration, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.seconds = reader.readInt64String();
          break;
        case 2:
          instance.nanos = reader.readInt32();
          break;
        default:
          reader.skipField();
      }
    }

    Duration.refineValues(instance);
  }

  static toBinaryWriter(instance: Duration, writer: BinaryWriter) {
    if (instance.seconds) {
      writer.writeInt64String(1, instance.seconds);
    }
    if (instance.nanos) {
      writer.writeInt32(2, instance.nanos);
    }
  }

  private _seconds?: string;
  private _nanos?: number;

  /**
   * Creates an object and applies default Protobuf values
   * @param Duration value
   */
  constructor(value?: RecursivePartial<Duration>) {
    value = value || {};
    this.seconds = value.seconds;
    this.nanos = value.nanos;
    Duration.refineValues(this);
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
  toObject() {
    return {
      seconds: this.seconds,
      nanos: this.nanos
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Duration {}
