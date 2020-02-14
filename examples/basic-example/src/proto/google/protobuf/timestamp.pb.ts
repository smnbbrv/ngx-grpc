/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class Timestamp implements GrpcMessage {
  static toBinary(instance: Timestamp) {
    const writer = new BinaryWriter();
    Timestamp.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Timestamp();
    Timestamp.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static fromDate(date: Date) {
    var timestamp = new Timestamp();
    timestamp.fromDate(date);
    return timestamp;
  }

  static fromISOString(isoDate: string) {
    var timestamp = new Timestamp();
    timestamp.fromISOString(isoDate);
    return timestamp;
  }

  static refineValues(instance: Timestamp) {
    instance.seconds = instance.seconds || '0';
    instance.nanos = instance.nanos || 0;
  }

  static fromBinaryReader(instance: Timestamp, reader: BinaryReader) {
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

    Timestamp.refineValues(instance);
  }

  static toBinaryWriter(instance: Timestamp, writer: BinaryWriter) {
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
   * @param Timestamp value
   */
  constructor(value?: RecursivePartial<Timestamp>) {
    value = value || {};
    this.seconds = value.seconds;
    this.nanos = value.nanos;
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
  toObject() {
    return {
      seconds: this.seconds,
      nanos: this.nanos
    };
  }
  toJSON() {
    return this.toObject();
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
export module Timestamp {}
