/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  GrpcMessageClass,
  GrpcMessagePool,
  RecursivePartial,
  ToProtobufJSONOptions,
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Any implements GrpcMessage {
  static id = 'google.protobuf.Any';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Any();
    Any.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  private static prefix = 'type.googleapis.com/';

  /**
   * Create a new Any instance with a packed message
   */
  static pack(msg: GrpcMessage) {
    const any = new Any();

    any.pack(msg);

    return any;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Any) {
    _instance.typeUrl = _instance.typeUrl || '';
    _instance.value = _instance.value || new Uint8Array();
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Any, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.typeUrl = _reader.readString();
          break;
        case 2:
          _instance.value = _reader.readBytes();
          break;
        default:
          _reader.skipField();
      }
    }

    Any.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Any, _writer: BinaryWriter) {
    if (_instance.typeUrl) {
      _writer.writeString(1, _instance.typeUrl);
    }
    if (_instance.value && _instance.value.length) {
      _writer.writeBytes(2, _instance.value);
    }
  }

  private _typeUrl?: string;
  private _value?: Uint8Array;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Any to deeply clone from
   */
  constructor(_value?: RecursivePartial<Any.AsObject>) {
    _value = _value || {};
    this.typeUrl = _value.typeUrl;
    this.value = _value.value;
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

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Any.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Any.AsObject {
    return {
      typeUrl: this.typeUrl,
      value: this.value ? this.value.subarray(0) : new Uint8Array(),
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
  ): Any.AsProtobufJSON {
    if (!options?.messagePool) {
      throw new Error(`Message pool is required to cast Any to JSON`);
    }

    const msg = this.unpack(options.messagePool);

    if (!msg) {
      return { '@type': this.typeUrl! };
    }

    const json = msg.toProtobufJSON(options);

    if (typeof json !== 'object') {
      return { '@type': this.typeUrl!, value: json };
    }

    return { ...json, '@type': this.typeUrl! };
  }

  /**
   * Get the packed message id based on typeUrl.
   * If no typeUrl is provided null is returned.
   */
  getPackedMessageId() {
    if (!this.typeUrl) {
      return null;
    }

    if (!this.typeUrl.startsWith(Any.prefix)) {
      throw new Error(`Type URL does not start with ${Any.prefix}`);
    }

    return this.typeUrl.substr(Any.prefix.length);
  }

  /**
   * Get the type of the packed message.
   * Requires predefined GrpcMessagePool with expected message types within.
   * If no type is found within the pool the error is thrown, unless throwWhenNotInThePool is set to false; in this case null will be returned.
   */
  getPackedMessageType(
    messagePool: GrpcMessagePool,
    throwWhenNotInThePool = true
  ) {
    const id = this.getPackedMessageId();

    if (!id) {
      return null;
    }

    const msgClass = messagePool.get(id);

    if (!msgClass) {
      if (throwWhenNotInThePool) {
        throw new Error(
          `Message with identifier '${this.typeUrl}' is not present in message pool`
        );
      } else {
        return null;
      }
    }

    return msgClass;
  }

  /**
   * Unpack the current value into a message.
   * Requires predefined GrpcMessagePool with expected message types within.
   * If no type is found within the pool the error is thrown.
   */
  unpack<M extends GrpcMessage>(messagePool: GrpcMessagePool): M {
    const messageClass = this.getPackedMessageType(messagePool);

    if (!messageClass) {
      throw new Error(`Message type cannot be resolved`);
    }

    if (!this.value) {
      throw new Error(`Cannot unpack value that is unset`);
    }

    return messageClass.deserializeBinary(this.value) as M;
  }

  /**
   * Pack the given message into current Any instance
   */
  pack(msg: GrpcMessage) {
    const { id } = msg.constructor as GrpcMessageClass<any>;

    if (!id) {
      throw new Error(`Message is invalid or does not have an id`);
    }

    this.typeUrl = `${Any.prefix}${id}`;
    this.value = msg.serializeBinary();
  }
}
export module Any {
  /**
   * Standard JavaScript object representation for Any
   */
  export interface AsObject {
    typeUrl?: string;
    value?: Uint8Array;
  }

  /**
   * Protobuf JSON representation for Any
   */
  export type AsProtobufJSON = {
    '@type': string;
    value?: string;
    [prop: string]: any;
  };
}
