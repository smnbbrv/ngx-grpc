/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '../../google/protobuf/source-context.pb';
import * as googleProtobuf001 from '../../google/protobuf/type.pb';
export class Api implements GrpcMessage {
  static toBinary(instance: Api) {
    const writer = new BinaryWriter();
    Api.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Api();
    Api.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Api) {
    instance.name = instance.name || '';
    instance.methods = instance.methods || [];
    instance.options = instance.options || [];
    instance.version = instance.version || '';
    instance.sourceContext = instance.sourceContext || undefined;
    instance.mixins = instance.mixins || [];
    instance.syntax = instance.syntax || 0;
  }

  static fromBinaryReader(instance: Api, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new Method();
          reader.readMessage(messageInitializer2, Method.fromBinaryReader);
          (instance.methods = instance.methods || []).push(messageInitializer2);
          break;
        case 3:
          const messageInitializer3 = new googleProtobuf001.Option();
          reader.readMessage(
            messageInitializer3,
            googleProtobuf001.Option.fromBinaryReader
          );
          (instance.options = instance.options || []).push(messageInitializer3);
          break;
        case 4:
          instance.version = reader.readString();
          break;
        case 5:
          instance.sourceContext = new googleProtobuf000.SourceContext();
          reader.readMessage(
            instance.sourceContext,
            googleProtobuf000.SourceContext.fromBinaryReader
          );
          break;
        case 6:
          const messageInitializer6 = new Mixin();
          reader.readMessage(messageInitializer6, Mixin.fromBinaryReader);
          (instance.mixins = instance.mixins || []).push(messageInitializer6);
          break;
        case 7:
          instance.syntax = reader.readEnum();
          break;
        default:
          reader.skipField();
      }
    }

    Api.refineValues(instance);
  }

  static toBinaryWriter(instance: Api, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.methods && instance.methods.length) {
      writer.writeRepeatedMessage(
        2,
        instance.methods as any,
        Method.toBinaryWriter
      );
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        3,
        instance.options as any,
        googleProtobuf001.Option.toBinaryWriter
      );
    }
    if (instance.version) {
      writer.writeString(4, instance.version);
    }
    if (instance.sourceContext) {
      writer.writeMessage(
        5,
        instance.sourceContext as any,
        googleProtobuf000.SourceContext.toBinaryWriter
      );
    }
    if (instance.mixins && instance.mixins.length) {
      writer.writeRepeatedMessage(
        6,
        instance.mixins as any,
        Mixin.toBinaryWriter
      );
    }
    if (instance.syntax) {
      writer.writeEnum(7, instance.syntax);
    }
  }

  private _name?: string;
  private _methods?: Method[];
  private _options?: googleProtobuf001.Option[];
  private _version?: string;
  private _sourceContext?: googleProtobuf000.SourceContext;
  private _mixins?: Mixin[];
  private _syntax?: googleProtobuf001.Syntax;

  /**
   * Creates an object and applies default Protobuf values
   * @param Api value
   */
  constructor(value?: RecursivePartial<Api>) {
    value = value || {};
    this.name = value.name;
    this.methods = (value.methods || []).map(m => new Method(m));
    this.options = (value.options || []).map(
      m => new googleProtobuf001.Option(m)
    );
    this.version = value.version;
    this.sourceContext = value.sourceContext
      ? new googleProtobuf000.SourceContext(value.sourceContext)
      : undefined;
    this.mixins = (value.mixins || []).map(m => new Mixin(m));
    this.syntax = value.syntax;
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
  get options(): googleProtobuf001.Option[] | undefined {
    return this._options;
  }
  set options(value: googleProtobuf001.Option[] | undefined) {
    this._options = value;
  }
  get version(): string | undefined {
    return this._version;
  }
  set version(value: string | undefined) {
    this._version = value;
  }
  get sourceContext(): googleProtobuf000.SourceContext | undefined {
    return this._sourceContext;
  }
  set sourceContext(value: googleProtobuf000.SourceContext | undefined) {
    this._sourceContext = value;
  }
  get mixins(): Mixin[] | undefined {
    return this._mixins;
  }
  set mixins(value: Mixin[] | undefined) {
    this._mixins = value;
  }
  get syntax(): googleProtobuf001.Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: googleProtobuf001.Syntax | undefined) {
    this._syntax = value;
  }
  toObject() {
    return {
      name: this.name,
      methods: (this.methods || []).map(m => m.toObject()),
      options: (this.options || []).map(m => m.toObject()),
      version: this.version,
      sourceContext: this.sourceContext
        ? this.sourceContext.toObject()
        : undefined,
      mixins: (this.mixins || []).map(m => m.toObject()),
      syntax: this.syntax
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Api {}
export class Method implements GrpcMessage {
  static toBinary(instance: Method) {
    const writer = new BinaryWriter();
    Method.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Method();
    Method.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Method) {
    instance.name = instance.name || '';
    instance.requestTypeUrl = instance.requestTypeUrl || '';
    instance.requestStreaming = instance.requestStreaming || false;
    instance.responseTypeUrl = instance.responseTypeUrl || '';
    instance.responseStreaming = instance.responseStreaming || false;
    instance.options = instance.options || [];
    instance.syntax = instance.syntax || 0;
  }

  static fromBinaryReader(instance: Method, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.requestTypeUrl = reader.readString();
          break;
        case 3:
          instance.requestStreaming = reader.readBool();
          break;
        case 4:
          instance.responseTypeUrl = reader.readString();
          break;
        case 5:
          instance.responseStreaming = reader.readBool();
          break;
        case 6:
          const messageInitializer6 = new googleProtobuf001.Option();
          reader.readMessage(
            messageInitializer6,
            googleProtobuf001.Option.fromBinaryReader
          );
          (instance.options = instance.options || []).push(messageInitializer6);
          break;
        case 7:
          instance.syntax = reader.readEnum();
          break;
        default:
          reader.skipField();
      }
    }

    Method.refineValues(instance);
  }

  static toBinaryWriter(instance: Method, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.requestTypeUrl) {
      writer.writeString(2, instance.requestTypeUrl);
    }
    if (instance.requestStreaming) {
      writer.writeBool(3, instance.requestStreaming);
    }
    if (instance.responseTypeUrl) {
      writer.writeString(4, instance.responseTypeUrl);
    }
    if (instance.responseStreaming) {
      writer.writeBool(5, instance.responseStreaming);
    }
    if (instance.options && instance.options.length) {
      writer.writeRepeatedMessage(
        6,
        instance.options as any,
        googleProtobuf001.Option.toBinaryWriter
      );
    }
    if (instance.syntax) {
      writer.writeEnum(7, instance.syntax);
    }
  }

  private _name?: string;
  private _requestTypeUrl?: string;
  private _requestStreaming?: boolean;
  private _responseTypeUrl?: string;
  private _responseStreaming?: boolean;
  private _options?: googleProtobuf001.Option[];
  private _syntax?: googleProtobuf001.Syntax;

  /**
   * Creates an object and applies default Protobuf values
   * @param Method value
   */
  constructor(value?: RecursivePartial<Method>) {
    value = value || {};
    this.name = value.name;
    this.requestTypeUrl = value.requestTypeUrl;
    this.requestStreaming = value.requestStreaming;
    this.responseTypeUrl = value.responseTypeUrl;
    this.responseStreaming = value.responseStreaming;
    this.options = (value.options || []).map(
      m => new googleProtobuf001.Option(m)
    );
    this.syntax = value.syntax;
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
  get options(): googleProtobuf001.Option[] | undefined {
    return this._options;
  }
  set options(value: googleProtobuf001.Option[] | undefined) {
    this._options = value;
  }
  get syntax(): googleProtobuf001.Syntax | undefined {
    return this._syntax;
  }
  set syntax(value: googleProtobuf001.Syntax | undefined) {
    this._syntax = value;
  }
  toObject() {
    return {
      name: this.name,
      requestTypeUrl: this.requestTypeUrl,
      requestStreaming: this.requestStreaming,
      responseTypeUrl: this.responseTypeUrl,
      responseStreaming: this.responseStreaming,
      options: (this.options || []).map(m => m.toObject()),
      syntax: this.syntax
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Method {}
export class Mixin implements GrpcMessage {
  static toBinary(instance: Mixin) {
    const writer = new BinaryWriter();
    Mixin.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Mixin();
    Mixin.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Mixin) {
    instance.name = instance.name || '';
    instance.root = instance.root || '';
  }

  static fromBinaryReader(instance: Mixin, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.root = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    Mixin.refineValues(instance);
  }

  static toBinaryWriter(instance: Mixin, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.root) {
      writer.writeString(2, instance.root);
    }
  }

  private _name?: string;
  private _root?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param Mixin value
   */
  constructor(value?: RecursivePartial<Mixin>) {
    value = value || {};
    this.name = value.name;
    this.root = value.root;
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
  toObject() {
    return {
      name: this.name,
      root: this.root
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Mixin {}
