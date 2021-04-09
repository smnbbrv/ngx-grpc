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
export class FieldMask implements GrpcMessage {
  static id = 'google.protobuf.FieldMask';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new FieldMask();
    FieldMask.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: FieldMask) {
    _instance.paths = _instance.paths || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: FieldMask,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          (_instance.paths = _instance.paths || []).push(_reader.readString());
          break;
        default:
          _reader.skipField();
      }
    }

    FieldMask.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: FieldMask, _writer: BinaryWriter) {
    if (_instance.paths && _instance.paths.length) {
      _writer.writeRepeatedString(1, _instance.paths);
    }
  }

  private _paths?: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of FieldMask to deeply clone from
   */
  constructor(_value?: RecursivePartial<FieldMask.AsObject>) {
    _value = _value || {};
    this.paths = (_value.paths || []).slice();
    FieldMask.refineValues(this);
  }
  get paths(): string[] | undefined {
    return this._paths;
  }
  set paths(value: string[] | undefined) {
    this._paths = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    FieldMask.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): FieldMask.AsObject {
    return {
      paths: (this.paths || []).slice(),
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
  ): FieldMask.AsProtobufJSON {
    return this.paths.join(',');
  }
}
export module FieldMask {
  /**
   * Standard JavaScript object representation for FieldMask
   */
  export interface AsObject {
    paths?: string[];
  }

  /**
   * Protobuf JSON representation for FieldMask
   */
  export type AsProtobufJSON = string;
}
