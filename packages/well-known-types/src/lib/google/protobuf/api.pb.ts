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
import * as googleProtobuf000 from '../../google/protobuf/any.pb';
import * as googleProtobuf001 from '../../google/protobuf/source-context.pb';
import * as googleProtobuf002 from '../../google/protobuf/type.pb';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Api implements GrpcMessage {
  static id = 'google.protobuf.Api';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Api();
    Api.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Api) {
    _instance.name = _instance.name || '';
    _instance.methods = _instance.methods || [];
    _instance.options = _instance.options || [];
    _instance.version = _instance.version || '';
    _instance.sourceContext = _instance.sourceContext || undefined;
    _instance.mixins = _instance.mixins || [];
    _instance.syntax = _instance.syntax || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Api, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          const messageInitializer2 = new Method();
          _reader.readMessage(
            messageInitializer2,
            Method.deserializeBinaryFromReader
          );
          (_instance.methods = _instance.methods || []).push(
            messageInitializer2
          );
          break;
        case 3:
          const messageInitializer3 = new googleProtobuf002.Option();
          _reader.readMessage(
            messageInitializer3,
            googleProtobuf002.Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer3
          );
          break;
        case 4:
          _instance.version = _reader.readString();
          break;
        case 5:
          _instance.sourceContext = new googleProtobuf001.SourceContext();
          _reader.readMessage(
            _instance.sourceContext,
            googleProtobuf001.SourceContext.deserializeBinaryFromReader
          );
          break;
        case 6:
          const messageInitializer6 = new Mixin();
          _reader.readMessage(
            messageInitializer6,
            Mixin.deserializeBinaryFromReader
          );
          (_instance.mixins = _instance.mixins || []).push(messageInitializer6);
          break;
        case 7:
          _instance.syntax = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    Api.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Api, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.methods && _instance.methods.length) {
      _writer.writeRepeatedMessage(
        2,
        _instance.methods as any,
        Method.serializeBinaryToWriter
      );
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.options as any,
        googleProtobuf002.Option.serializeBinaryToWriter
      );
    }
    if (_instance.version) {
      _writer.writeString(4, _instance.version);
    }
    if (_instance.sourceContext) {
      _writer.writeMessage(
        5,
        _instance.sourceContext as any,
        googleProtobuf001.SourceContext.serializeBinaryToWriter
      );
    }
    if (_instance.mixins && _instance.mixins.length) {
      _writer.writeRepeatedMessage(
        6,
        _instance.mixins as any,
        Mixin.serializeBinaryToWriter
      );
    }
    if (_instance.syntax) {
      _writer.writeEnum(7, _instance.syntax);
    }
  }

  private _name?: string;
  private _methods?: Method[];
  private _options?: googleProtobuf002.Option[];
  private _version?: string;
  private _sourceContext?: googleProtobuf001.SourceContext;
  private _mixins?: Mixin[];
  private _syntax?: googleProtobuf002.Syntax;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Api to deeply clone from
   */
  constructor(_value?: RecursivePartial<Api.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.methods = (_value.methods || []).map((m) => new Method(m));
    this.options = (_value.options || []).map(
      (m) => new googleProtobuf002.Option(m)
    );
    this.version = _value.version;
    this.sourceContext = _value.sourceContext
      ? new googleProtobuf001.SourceContext(_value.sourceContext)
      : undefined;
    this.mixins = (_value.mixins || []).map((m) => new Mixin(m));
    this.syntax = _value.syntax;
    Api.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get methods(): Method[] | undefined {
    return this._methods;
  }
  set methods(value: Method[] | undefined) {
    this._methods = value;
  }
  get options(): googleProtobuf002.Option[] | undefined {
    return this._options;
  }
  set options(value: googleProtobuf002.Option[] | undefined) {
    this._options = value;
  }
  get version(): string | undefined {
    return this._version;
  }
  set version(value: string | undefined) {
    this._version = value;
  }
  get sourceContext(): googleProtobuf001.SourceContext | undefined {
    return this._sourceContext;
  }
  set sourceContext(value: googleProtobuf001.SourceContext | undefined) {
    this._sourceContext = value;
  }
  get mixins(): Mixin[] | undefined {
    return this._mixins;
  }
  set mixins(value: Mixin[] | undefined) {
    this._mixins = value;
  }
  get syntax(): googleProtobuf002.Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: googleProtobuf002.Syntax | undefined) {
    this._syntax = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Api.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Api.AsObject {
    return {
      name: this.name,
      methods: (this.methods || []).map((m) => m.toObject()),
      options: (this.options || []).map((m) => m.toObject()),
      version: this.version,
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      mixins: (this.mixins || []).map((m) => m.toObject()),
      syntax: this.syntax,
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
  ): Api.AsProtobufJSON {
    return {
      name: this.name,
      methods: (this.methods || []).map((m) => m.toProtobufJSON(options)),
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
      version: this.version,
      sourceContext: this.sourceContext
        ? this.sourceContext.toProtobufJSON(options)
        : null,
      mixins: (this.mixins || []).map((m) => m.toProtobufJSON(options)),
      syntax: googleProtobuf002.Syntax[this.syntax ?? 0],
    };
  }
}
export module Api {
  /**
   * Standard JavaScript object representation for Api
   */
  export interface AsObject {
    name?: string;
    methods?: Method.AsObject[];
    options?: googleProtobuf002.Option.AsObject[];
    version?: string;
    sourceContext?: googleProtobuf001.SourceContext.AsObject;
    mixins?: Mixin.AsObject[];
    syntax?: googleProtobuf002.Syntax;
  }

  /**
   * Protobuf JSON representation for Api
   */
  export interface AsProtobufJSON {
    name?: string;
    methods?: Method.AsProtobufJSON[] | null;
    options?: googleProtobuf002.Option.AsProtobufJSON[] | null;
    version?: string;
    sourceContext?: googleProtobuf001.SourceContext.AsProtobufJSON | null;
    mixins?: Mixin.AsProtobufJSON[] | null;
    syntax?: string;
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Method implements GrpcMessage {
  static id = 'google.protobuf.Method';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Method();
    Method.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Method) {
    _instance.name = _instance.name || '';
    _instance.requestTypeUrl = _instance.requestTypeUrl || '';
    _instance.requestStreaming = _instance.requestStreaming || false;
    _instance.responseTypeUrl = _instance.responseTypeUrl || '';
    _instance.responseStreaming = _instance.responseStreaming || false;
    _instance.options = _instance.options || [];
    _instance.syntax = _instance.syntax || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Method, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.requestTypeUrl = _reader.readString();
          break;
        case 3:
          _instance.requestStreaming = _reader.readBool();
          break;
        case 4:
          _instance.responseTypeUrl = _reader.readString();
          break;
        case 5:
          _instance.responseStreaming = _reader.readBool();
          break;
        case 6:
          const messageInitializer6 = new googleProtobuf002.Option();
          _reader.readMessage(
            messageInitializer6,
            googleProtobuf002.Option.deserializeBinaryFromReader
          );
          (_instance.options = _instance.options || []).push(
            messageInitializer6
          );
          break;
        case 7:
          _instance.syntax = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    Method.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Method, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.requestTypeUrl) {
      _writer.writeString(2, _instance.requestTypeUrl);
    }
    if (_instance.requestStreaming) {
      _writer.writeBool(3, _instance.requestStreaming);
    }
    if (_instance.responseTypeUrl) {
      _writer.writeString(4, _instance.responseTypeUrl);
    }
    if (_instance.responseStreaming) {
      _writer.writeBool(5, _instance.responseStreaming);
    }
    if (_instance.options && _instance.options.length) {
      _writer.writeRepeatedMessage(
        6,
        _instance.options as any,
        googleProtobuf002.Option.serializeBinaryToWriter
      );
    }
    if (_instance.syntax) {
      _writer.writeEnum(7, _instance.syntax);
    }
  }

  private _name?: string;
  private _requestTypeUrl?: string;
  private _requestStreaming?: boolean;
  private _responseTypeUrl?: string;
  private _responseStreaming?: boolean;
  private _options?: googleProtobuf002.Option[];
  private _syntax?: googleProtobuf002.Syntax;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Method to deeply clone from
   */
  constructor(_value?: RecursivePartial<Method.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.requestTypeUrl = _value.requestTypeUrl;
    this.requestStreaming = _value.requestStreaming;
    this.responseTypeUrl = _value.responseTypeUrl;
    this.responseStreaming = _value.responseStreaming;
    this.options = (_value.options || []).map(
      (m) => new googleProtobuf002.Option(m)
    );
    this.syntax = _value.syntax;
    Method.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get requestTypeUrl(): string | undefined {
    return this._requestTypeUrl;
  }
  set requestTypeUrl(value: string | undefined) {
    this._requestTypeUrl = value;
  }
  get requestStreaming(): boolean | undefined {
    return this._requestStreaming;
  }
  set requestStreaming(value: boolean | undefined) {
    this._requestStreaming = value;
  }
  get responseTypeUrl(): string | undefined {
    return this._responseTypeUrl;
  }
  set responseTypeUrl(value: string | undefined) {
    this._responseTypeUrl = value;
  }
  get responseStreaming(): boolean | undefined {
    return this._responseStreaming;
  }
  set responseStreaming(value: boolean | undefined) {
    this._responseStreaming = value;
  }
  get options(): googleProtobuf002.Option[] | undefined {
    return this._options;
  }
  set options(value: googleProtobuf002.Option[] | undefined) {
    this._options = value;
  }
  get syntax(): googleProtobuf002.Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: googleProtobuf002.Syntax | undefined) {
    this._syntax = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Method.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Method.AsObject {
    return {
      name: this.name,
      requestTypeUrl: this.requestTypeUrl,
      requestStreaming: this.requestStreaming,
      responseTypeUrl: this.responseTypeUrl,
      responseStreaming: this.responseStreaming,
      options: (this.options || []).map((m) => m.toObject()),
      syntax: this.syntax,
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
  ): Method.AsProtobufJSON {
    return {
      name: this.name,
      requestTypeUrl: this.requestTypeUrl,
      requestStreaming: this.requestStreaming,
      responseTypeUrl: this.responseTypeUrl,
      responseStreaming: this.responseStreaming,
      options: (this.options || []).map((m) => m.toProtobufJSON(options)),
      syntax: googleProtobuf002.Syntax[this.syntax ?? 0],
    };
  }
}
export module Method {
  /**
   * Standard JavaScript object representation for Method
   */
  export interface AsObject {
    name?: string;
    requestTypeUrl?: string;
    requestStreaming?: boolean;
    responseTypeUrl?: string;
    responseStreaming?: boolean;
    options?: googleProtobuf002.Option.AsObject[];
    syntax?: googleProtobuf002.Syntax;
  }

  /**
   * Protobuf JSON representation for Method
   */
  export interface AsProtobufJSON {
    name?: string;
    requestTypeUrl?: string;
    requestStreaming?: boolean;
    responseTypeUrl?: string;
    responseStreaming?: boolean;
    options?: googleProtobuf002.Option.AsProtobufJSON[] | null;
    syntax?: string;
  }
}

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Mixin implements GrpcMessage {
  static id = 'google.protobuf.Mixin';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Mixin();
    Mixin.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Mixin) {
    _instance.name = _instance.name || '';
    _instance.root = _instance.root || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Mixin, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.root = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Mixin.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Mixin, _writer: BinaryWriter) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.root) {
      _writer.writeString(2, _instance.root);
    }
  }

  private _name?: string;
  private _root?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Mixin to deeply clone from
   */
  constructor(_value?: RecursivePartial<Mixin.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.root = _value.root;
    Mixin.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get root(): string | undefined {
    return this._root;
  }
  set root(value: string | undefined) {
    this._root = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Mixin.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Mixin.AsObject {
    return {
      name: this.name,
      root: this.root,
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
  ): Mixin.AsProtobufJSON {
    return {
      name: this.name,
      root: this.root,
    };
  }
}
export module Mixin {
  /**
   * Standard JavaScript object representation for Mixin
   */
  export interface AsObject {
    name?: string;
    root?: string;
  }

  /**
   * Protobuf JSON representation for Mixin
   */
  export interface AsProtobufJSON {
    name?: string;
    root?: string;
  }
}
