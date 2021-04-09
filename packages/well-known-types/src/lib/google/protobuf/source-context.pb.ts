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
export class SourceContext implements GrpcMessage {
  static id = 'google.protobuf.SourceContext';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SourceContext();
    SourceContext.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SourceContext) {
    _instance.fileName = _instance.fileName || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SourceContext,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.fileName = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    SourceContext.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: SourceContext,
    _writer: BinaryWriter
  ) {
    if (_instance.fileName) {
      _writer.writeString(1, _instance.fileName);
    }
  }

  private _fileName?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SourceContext to deeply clone from
   */
  constructor(_value?: RecursivePartial<SourceContext.AsObject>) {
    _value = _value || {};
    this.fileName = _value.fileName;
    SourceContext.refineValues(this);
  }
  get fileName(): string | undefined {
    return this._fileName;
  }
  set fileName(value: string | undefined) {
    this._fileName = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SourceContext.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SourceContext.AsObject {
    return {
      fileName: this.fileName,
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
  ): SourceContext.AsProtobufJSON {
    return {
      fileName: this.fileName,
    };
  }
}
export module SourceContext {
  /**
   * Standard JavaScript object representation for SourceContext
   */
  export interface AsObject {
    fileName?: string;
  }

  /**
   * Protobuf JSON representation for SourceContext
   */
  export interface AsProtobufJSON {
    fileName?: string;
  }
}
