/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '../../../google/protobuf/descriptor.pb';
export class Version implements GrpcMessage {
  static toBinary(instance: Version) {
    const writer = new BinaryWriter();
    Version.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new Version();
    Version.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: Version) {
    instance.major = instance.major || 0;
    instance.minor = instance.minor || 0;
    instance.patch = instance.patch || 0;
    instance.suffix = instance.suffix || '';
  }

  static fromBinaryReader(instance: Version, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.major = reader.readInt32();
          break;
        case 2:
          instance.minor = reader.readInt32();
          break;
        case 3:
          instance.patch = reader.readInt32();
          break;
        case 4:
          instance.suffix = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    Version.refineValues(instance);
  }

  static toBinaryWriter(instance: Version, writer: BinaryWriter) {
    if (instance.major) {
      writer.writeInt32(1, instance.major);
    }
    if (instance.minor) {
      writer.writeInt32(2, instance.minor);
    }
    if (instance.patch) {
      writer.writeInt32(3, instance.patch);
    }
    if (instance.suffix) {
      writer.writeString(4, instance.suffix);
    }
  }

  private _major?: number;
  private _minor?: number;
  private _patch?: number;
  private _suffix?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param Version value
   */
  constructor(value?: RecursivePartial<Version>) {
    value = value || {};
    this.major = value.major;
    this.minor = value.minor;
    this.patch = value.patch;
    this.suffix = value.suffix;
    Version.refineValues(this);
  }
  get major(): number | undefined {
    return this._major;
  }
  set major(value: number | undefined) {
    this._major = value;
  }
  get minor(): number | undefined {
    return this._minor;
  }
  set minor(value: number | undefined) {
    this._minor = value;
  }
  get patch(): number | undefined {
    return this._patch;
  }
  set patch(value: number | undefined) {
    this._patch = value;
  }
  get suffix(): string | undefined {
    return this._suffix;
  }
  set suffix(value: string | undefined) {
    this._suffix = value;
  }
  toObject() {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      suffix: this.suffix
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module Version {}
export class CodeGeneratorRequest implements GrpcMessage {
  static toBinary(instance: CodeGeneratorRequest) {
    const writer = new BinaryWriter();
    CodeGeneratorRequest.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new CodeGeneratorRequest();
    CodeGeneratorRequest.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: CodeGeneratorRequest) {
    instance.fileToGenerate = instance.fileToGenerate || [];
    instance.parameter = instance.parameter || '';
    instance.protoFile = instance.protoFile || [];
    instance.compilerVersion = instance.compilerVersion || undefined;
  }

  static fromBinaryReader(
    instance: CodeGeneratorRequest,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          (instance.fileToGenerate = instance.fileToGenerate || []).push(
            reader.readString()
          );
          break;
        case 2:
          instance.parameter = reader.readString();
          break;
        case 15:
          const messageInitializer15 = new googleProtobuf000.FileDescriptorProto();
          reader.readMessage(
            messageInitializer15,
            googleProtobuf000.FileDescriptorProto.fromBinaryReader
          );
          (instance.protoFile = instance.protoFile || []).push(
            messageInitializer15
          );
          break;
        case 3:
          instance.compilerVersion = new Version();
          reader.readMessage(
            instance.compilerVersion,
            Version.fromBinaryReader
          );
          break;
        default:
          reader.skipField();
      }
    }

    CodeGeneratorRequest.refineValues(instance);
  }

  static toBinaryWriter(instance: CodeGeneratorRequest, writer: BinaryWriter) {
    if (instance.fileToGenerate && instance.fileToGenerate.length) {
      writer.writeRepeatedString(1, instance.fileToGenerate);
    }
    if (instance.parameter) {
      writer.writeString(2, instance.parameter);
    }
    if (instance.protoFile && instance.protoFile.length) {
      writer.writeRepeatedMessage(
        15,
        instance.protoFile as any,
        googleProtobuf000.FileDescriptorProto.toBinaryWriter
      );
    }
    if (instance.compilerVersion) {
      writer.writeMessage(
        3,
        instance.compilerVersion as any,
        Version.toBinaryWriter
      );
    }
  }

  private _fileToGenerate?: string[];
  private _parameter?: string;
  private _protoFile?: googleProtobuf000.FileDescriptorProto[];
  private _compilerVersion?: Version;

  /**
   * Creates an object and applies default Protobuf values
   * @param CodeGeneratorRequest value
   */
  constructor(value?: RecursivePartial<CodeGeneratorRequest>) {
    value = value || {};
    this.fileToGenerate = (value.fileToGenerate || []).slice();
    this.parameter = value.parameter;
    this.protoFile = (value.protoFile || []).map(
      m => new googleProtobuf000.FileDescriptorProto(m)
    );
    this.compilerVersion = value.compilerVersion
      ? new Version(value.compilerVersion)
      : undefined;
    CodeGeneratorRequest.refineValues(this);
  }
  get fileToGenerate(): string[] | undefined {
    return this._fileToGenerate;
  }
  set fileToGenerate(value: string[] | undefined) {
    this._fileToGenerate = value;
  }
  get parameter(): string | undefined {
    return this._parameter;
  }
  set parameter(value: string | undefined) {
    this._parameter = value;
  }
  get protoFile(): googleProtobuf000.FileDescriptorProto[] | undefined {
    return this._protoFile;
  }
  set protoFile(value: googleProtobuf000.FileDescriptorProto[] | undefined) {
    this._protoFile = value;
  }
  get compilerVersion(): Version | undefined {
    return this._compilerVersion;
  }
  set compilerVersion(value: Version | undefined) {
    this._compilerVersion = value;
  }
  toObject() {
    return {
      fileToGenerate: (this.fileToGenerate || []).slice(),
      parameter: this.parameter,
      protoFile: (this.protoFile || []).map(m => m.toObject()),
      compilerVersion: this.compilerVersion
        ? this.compilerVersion.toObject()
        : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module CodeGeneratorRequest {}
export class CodeGeneratorResponse implements GrpcMessage {
  static toBinary(instance: CodeGeneratorResponse) {
    const writer = new BinaryWriter();
    CodeGeneratorResponse.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new CodeGeneratorResponse();
    CodeGeneratorResponse.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: CodeGeneratorResponse) {
    instance.error = instance.error || '';
    instance.file = instance.file || [];
  }

  static fromBinaryReader(
    instance: CodeGeneratorResponse,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.error = reader.readString();
          break;
        case 15:
          const messageInitializer15 = new CodeGeneratorResponse.File();
          reader.readMessage(
            messageInitializer15,
            CodeGeneratorResponse.File.fromBinaryReader
          );
          (instance.file = instance.file || []).push(messageInitializer15);
          break;
        default:
          reader.skipField();
      }
    }

    CodeGeneratorResponse.refineValues(instance);
  }

  static toBinaryWriter(instance: CodeGeneratorResponse, writer: BinaryWriter) {
    if (instance.error) {
      writer.writeString(1, instance.error);
    }
    if (instance.file && instance.file.length) {
      writer.writeRepeatedMessage(
        15,
        instance.file as any,
        CodeGeneratorResponse.File.toBinaryWriter
      );
    }
  }

  private _error?: string;
  private _file?: CodeGeneratorResponse.File[];

  /**
   * Creates an object and applies default Protobuf values
   * @param CodeGeneratorResponse value
   */
  constructor(value?: RecursivePartial<CodeGeneratorResponse>) {
    value = value || {};
    this.error = value.error;
    this.file = (value.file || []).map(m => new CodeGeneratorResponse.File(m));
    CodeGeneratorResponse.refineValues(this);
  }
  get error(): string | undefined {
    return this._error;
  }
  set error(value: string | undefined) {
    this._error = value;
  }
  get file(): CodeGeneratorResponse.File[] | undefined {
    return this._file;
  }
  set file(value: CodeGeneratorResponse.File[] | undefined) {
    this._file = value;
  }
  toObject() {
    return {
      error: this.error,
      file: (this.file || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module CodeGeneratorResponse {
  export class File implements GrpcMessage {
    static toBinary(instance: File) {
      const writer = new BinaryWriter();
      File.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new File();
      File.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: File) {
      instance.name = instance.name || '';
      instance.insertionPoint = instance.insertionPoint || '';
      instance.content = instance.content || '';
    }

    static fromBinaryReader(instance: File, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.name = reader.readString();
            break;
          case 2:
            instance.insertionPoint = reader.readString();
            break;
          case 15:
            instance.content = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }

      File.refineValues(instance);
    }

    static toBinaryWriter(instance: File, writer: BinaryWriter) {
      if (instance.name) {
        writer.writeString(1, instance.name);
      }
      if (instance.insertionPoint) {
        writer.writeString(2, instance.insertionPoint);
      }
      if (instance.content) {
        writer.writeString(15, instance.content);
      }
    }

    private _name?: string;
    private _insertionPoint?: string;
    private _content?: string;

    /**
     * Creates an object and applies default Protobuf values
     * @param File value
     */
    constructor(value?: RecursivePartial<File>) {
      value = value || {};
      this.name = value.name;
      this.insertionPoint = value.insertionPoint;
      this.content = value.content;
      File.refineValues(this);
    }
    get name(): string | undefined {
      return this._name;
    }
    set name(value: string | undefined) {
      this._name = value;
    }
    get insertionPoint(): string | undefined {
      return this._insertionPoint;
    }
    set insertionPoint(value: string | undefined) {
      this._insertionPoint = value;
    }
    get content(): string | undefined {
      return this._content;
    }
    set content(value: string | undefined) {
      this._content = value;
    }
    toObject() {
      return {
        name: this.name,
        insertionPoint: this.insertionPoint,
        content: this.content
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module File {}
}
