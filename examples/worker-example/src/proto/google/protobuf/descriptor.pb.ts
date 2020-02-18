/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcMessage, RecursivePartial } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export class FileDescriptorSet implements GrpcMessage {
  static toBinary(instance: FileDescriptorSet) {
    const writer = new BinaryWriter();
    FileDescriptorSet.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FileDescriptorSet();
    FileDescriptorSet.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FileDescriptorSet) {
    instance.file = instance.file || [];
  }

  static fromBinaryReader(instance: FileDescriptorSet, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new FileDescriptorProto();
          reader.readMessage(
            messageInitializer1,
            FileDescriptorProto.fromBinaryReader
          );
          (instance.file = instance.file || []).push(messageInitializer1);
          break;
        default:
          reader.skipField();
      }
    }

    FileDescriptorSet.refineValues(instance);
  }

  static toBinaryWriter(instance: FileDescriptorSet, writer: BinaryWriter) {
    if (instance.file && instance.file.length) {
      writer.writeRepeatedMessage(
        1,
        instance.file as any,
        FileDescriptorProto.toBinaryWriter
      );
    }
  }

  private _file?: FileDescriptorProto[];

  /**
   * Creates an object and applies default Protobuf values
   * @param FileDescriptorSet value
   */
  constructor(value?: RecursivePartial<FileDescriptorSet>) {
    value = value || {};
    this.file = (value.file || []).map(m => new FileDescriptorProto(m));
    FileDescriptorSet.refineValues(this);
  }
  get file(): FileDescriptorProto[] | undefined {
    return this._file;
  }
  set file(value: FileDescriptorProto[] | undefined) {
    this._file = value;
  }
  toObject() {
    return {
      file: (this.file || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FileDescriptorSet {}
export class FileDescriptorProto implements GrpcMessage {
  static toBinary(instance: FileDescriptorProto) {
    const writer = new BinaryWriter();
    FileDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FileDescriptorProto();
    FileDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FileDescriptorProto) {
    instance.name = instance.name || '';
    instance.package = instance.package || '';
    instance.dependency = instance.dependency || [];
    instance.publicDependency = instance.publicDependency || [];
    instance.weakDependency = instance.weakDependency || [];
    instance.messageType = instance.messageType || [];
    instance.enumType = instance.enumType || [];
    instance.service = instance.service || [];
    instance.extension = instance.extension || [];
    instance.options = instance.options || undefined;
    instance.sourceCodeInfo = instance.sourceCodeInfo || undefined;
    instance.syntax = instance.syntax || '';
  }

  static fromBinaryReader(instance: FileDescriptorProto, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.package = reader.readString();
          break;
        case 3:
          (instance.dependency = instance.dependency || []).push(
            reader.readString()
          );
          break;
        case 10:
          (instance.publicDependency = instance.publicDependency || []).push(
            reader.readInt32()
          );
          break;
        case 11:
          (instance.weakDependency = instance.weakDependency || []).push(
            reader.readInt32()
          );
          break;
        case 4:
          const messageInitializer4 = new DescriptorProto();
          reader.readMessage(
            messageInitializer4,
            DescriptorProto.fromBinaryReader
          );
          (instance.messageType = instance.messageType || []).push(
            messageInitializer4
          );
          break;
        case 5:
          const messageInitializer5 = new EnumDescriptorProto();
          reader.readMessage(
            messageInitializer5,
            EnumDescriptorProto.fromBinaryReader
          );
          (instance.enumType = instance.enumType || []).push(
            messageInitializer5
          );
          break;
        case 6:
          const messageInitializer6 = new ServiceDescriptorProto();
          reader.readMessage(
            messageInitializer6,
            ServiceDescriptorProto.fromBinaryReader
          );
          (instance.service = instance.service || []).push(messageInitializer6);
          break;
        case 7:
          const messageInitializer7 = new FieldDescriptorProto();
          reader.readMessage(
            messageInitializer7,
            FieldDescriptorProto.fromBinaryReader
          );
          (instance.extension = instance.extension || []).push(
            messageInitializer7
          );
          break;
        case 8:
          instance.options = new FileOptions();
          reader.readMessage(instance.options, FileOptions.fromBinaryReader);
          break;
        case 9:
          instance.sourceCodeInfo = new SourceCodeInfo();
          reader.readMessage(
            instance.sourceCodeInfo,
            SourceCodeInfo.fromBinaryReader
          );
          break;
        case 12:
          instance.syntax = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    FileDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: FileDescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.package) {
      writer.writeString(2, instance.package);
    }
    if (instance.dependency && instance.dependency.length) {
      writer.writeRepeatedString(3, instance.dependency);
    }
    if (instance.publicDependency && instance.publicDependency.length) {
      writer.writeRepeatedInt32(10, instance.publicDependency);
    }
    if (instance.weakDependency && instance.weakDependency.length) {
      writer.writeRepeatedInt32(11, instance.weakDependency);
    }
    if (instance.messageType && instance.messageType.length) {
      writer.writeRepeatedMessage(
        4,
        instance.messageType as any,
        DescriptorProto.toBinaryWriter
      );
    }
    if (instance.enumType && instance.enumType.length) {
      writer.writeRepeatedMessage(
        5,
        instance.enumType as any,
        EnumDescriptorProto.toBinaryWriter
      );
    }
    if (instance.service && instance.service.length) {
      writer.writeRepeatedMessage(
        6,
        instance.service as any,
        ServiceDescriptorProto.toBinaryWriter
      );
    }
    if (instance.extension && instance.extension.length) {
      writer.writeRepeatedMessage(
        7,
        instance.extension as any,
        FieldDescriptorProto.toBinaryWriter
      );
    }
    if (instance.options) {
      writer.writeMessage(
        8,
        instance.options as any,
        FileOptions.toBinaryWriter
      );
    }
    if (instance.sourceCodeInfo) {
      writer.writeMessage(
        9,
        instance.sourceCodeInfo as any,
        SourceCodeInfo.toBinaryWriter
      );
    }
    if (instance.syntax) {
      writer.writeString(12, instance.syntax);
    }
  }

  private _name?: string;
  private _package?: string;
  private _dependency?: string[];
  private _publicDependency?: number[];
  private _weakDependency?: number[];
  private _messageType?: DescriptorProto[];
  private _enumType?: EnumDescriptorProto[];
  private _service?: ServiceDescriptorProto[];
  private _extension?: FieldDescriptorProto[];
  private _options?: FileOptions;
  private _sourceCodeInfo?: SourceCodeInfo;
  private _syntax?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param FileDescriptorProto value
   */
  constructor(value?: RecursivePartial<FileDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.package = value.package;
    this.dependency = (value.dependency || []).slice();
    this.publicDependency = (value.publicDependency || []).slice();
    this.weakDependency = (value.weakDependency || []).slice();
    this.messageType = (value.messageType || []).map(
      m => new DescriptorProto(m)
    );
    this.enumType = (value.enumType || []).map(m => new EnumDescriptorProto(m));
    this.service = (value.service || []).map(
      m => new ServiceDescriptorProto(m)
    );
    this.extension = (value.extension || []).map(
      m => new FieldDescriptorProto(m)
    );
    this.options = value.options ? new FileOptions(value.options) : undefined;
    this.sourceCodeInfo = value.sourceCodeInfo
      ? new SourceCodeInfo(value.sourceCodeInfo)
      : undefined;
    this.syntax = value.syntax;
    FileDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get package(): string | undefined {
    return this._package;
  }
  set package(value: string | undefined) {
    this._package = value;
  }
  get dependency(): string[] | undefined {
    return this._dependency;
  }
  set dependency(value: string[] | undefined) {
    this._dependency = value;
  }
  get publicDependency(): number[] | undefined {
    return this._publicDependency;
  }
  set publicDependency(value: number[] | undefined) {
    this._publicDependency = value;
  }
  get weakDependency(): number[] | undefined {
    return this._weakDependency;
  }
  set weakDependency(value: number[] | undefined) {
    this._weakDependency = value;
  }
  get messageType(): DescriptorProto[] | undefined {
    return this._messageType;
  }
  set messageType(value: DescriptorProto[] | undefined) {
    this._messageType = value;
  }
  get enumType(): EnumDescriptorProto[] | undefined {
    return this._enumType;
  }
  set enumType(value: EnumDescriptorProto[] | undefined) {
    this._enumType = value;
  }
  get service(): ServiceDescriptorProto[] | undefined {
    return this._service;
  }
  set service(value: ServiceDescriptorProto[] | undefined) {
    this._service = value;
  }
  get extension(): FieldDescriptorProto[] | undefined {
    return this._extension;
  }
  set extension(value: FieldDescriptorProto[] | undefined) {
    this._extension = value;
  }
  get options(): FileOptions | undefined {
    return this._options;
  }
  set options(value: FileOptions | undefined) {
    this._options = value;
  }
  get sourceCodeInfo(): SourceCodeInfo | undefined {
    return this._sourceCodeInfo;
  }
  set sourceCodeInfo(value: SourceCodeInfo | undefined) {
    this._sourceCodeInfo = value;
  }
  get syntax(): string | undefined {
    return this._syntax;
  }
  set syntax(value: string | undefined) {
    this._syntax = value;
  }
  toObject() {
    return {
      name: this.name,
      package: this.package,
      dependency: (this.dependency || []).slice(),
      publicDependency: (this.publicDependency || []).slice(),
      weakDependency: (this.weakDependency || []).slice(),
      messageType: (this.messageType || []).map(m => m.toObject()),
      enumType: (this.enumType || []).map(m => m.toObject()),
      service: (this.service || []).map(m => m.toObject()),
      extension: (this.extension || []).map(m => m.toObject()),
      options: this.options ? this.options.toObject() : undefined,
      sourceCodeInfo: this.sourceCodeInfo
        ? this.sourceCodeInfo.toObject()
        : undefined,
      syntax: this.syntax
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FileDescriptorProto {}
export class DescriptorProto implements GrpcMessage {
  static toBinary(instance: DescriptorProto) {
    const writer = new BinaryWriter();
    DescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new DescriptorProto();
    DescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: DescriptorProto) {
    instance.name = instance.name || '';
    instance.field = instance.field || [];
    instance.extension = instance.extension || [];
    instance.nestedType = instance.nestedType || [];
    instance.enumType = instance.enumType || [];
    instance.extensionRange = instance.extensionRange || [];
    instance.oneofDecl = instance.oneofDecl || [];
    instance.options = instance.options || undefined;
    instance.reservedRange = instance.reservedRange || [];
    instance.reservedName = instance.reservedName || [];
  }

  static fromBinaryReader(instance: DescriptorProto, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new FieldDescriptorProto();
          reader.readMessage(
            messageInitializer2,
            FieldDescriptorProto.fromBinaryReader
          );
          (instance.field = instance.field || []).push(messageInitializer2);
          break;
        case 6:
          const messageInitializer6 = new FieldDescriptorProto();
          reader.readMessage(
            messageInitializer6,
            FieldDescriptorProto.fromBinaryReader
          );
          (instance.extension = instance.extension || []).push(
            messageInitializer6
          );
          break;
        case 3:
          const messageInitializer3 = new DescriptorProto();
          reader.readMessage(
            messageInitializer3,
            DescriptorProto.fromBinaryReader
          );
          (instance.nestedType = instance.nestedType || []).push(
            messageInitializer3
          );
          break;
        case 4:
          const messageInitializer4 = new EnumDescriptorProto();
          reader.readMessage(
            messageInitializer4,
            EnumDescriptorProto.fromBinaryReader
          );
          (instance.enumType = instance.enumType || []).push(
            messageInitializer4
          );
          break;
        case 5:
          const messageInitializer5 = new DescriptorProto.ExtensionRange();
          reader.readMessage(
            messageInitializer5,
            DescriptorProto.ExtensionRange.fromBinaryReader
          );
          (instance.extensionRange = instance.extensionRange || []).push(
            messageInitializer5
          );
          break;
        case 8:
          const messageInitializer8 = new OneofDescriptorProto();
          reader.readMessage(
            messageInitializer8,
            OneofDescriptorProto.fromBinaryReader
          );
          (instance.oneofDecl = instance.oneofDecl || []).push(
            messageInitializer8
          );
          break;
        case 7:
          instance.options = new MessageOptions();
          reader.readMessage(instance.options, MessageOptions.fromBinaryReader);
          break;
        case 9:
          const messageInitializer9 = new DescriptorProto.ReservedRange();
          reader.readMessage(
            messageInitializer9,
            DescriptorProto.ReservedRange.fromBinaryReader
          );
          (instance.reservedRange = instance.reservedRange || []).push(
            messageInitializer9
          );
          break;
        case 10:
          (instance.reservedName = instance.reservedName || []).push(
            reader.readString()
          );
          break;
        default:
          reader.skipField();
      }
    }

    DescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: DescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.field && instance.field.length) {
      writer.writeRepeatedMessage(
        2,
        instance.field as any,
        FieldDescriptorProto.toBinaryWriter
      );
    }
    if (instance.extension && instance.extension.length) {
      writer.writeRepeatedMessage(
        6,
        instance.extension as any,
        FieldDescriptorProto.toBinaryWriter
      );
    }
    if (instance.nestedType && instance.nestedType.length) {
      writer.writeRepeatedMessage(
        3,
        instance.nestedType as any,
        DescriptorProto.toBinaryWriter
      );
    }
    if (instance.enumType && instance.enumType.length) {
      writer.writeRepeatedMessage(
        4,
        instance.enumType as any,
        EnumDescriptorProto.toBinaryWriter
      );
    }
    if (instance.extensionRange && instance.extensionRange.length) {
      writer.writeRepeatedMessage(
        5,
        instance.extensionRange as any,
        DescriptorProto.ExtensionRange.toBinaryWriter
      );
    }
    if (instance.oneofDecl && instance.oneofDecl.length) {
      writer.writeRepeatedMessage(
        8,
        instance.oneofDecl as any,
        OneofDescriptorProto.toBinaryWriter
      );
    }
    if (instance.options) {
      writer.writeMessage(
        7,
        instance.options as any,
        MessageOptions.toBinaryWriter
      );
    }
    if (instance.reservedRange && instance.reservedRange.length) {
      writer.writeRepeatedMessage(
        9,
        instance.reservedRange as any,
        DescriptorProto.ReservedRange.toBinaryWriter
      );
    }
    if (instance.reservedName && instance.reservedName.length) {
      writer.writeRepeatedString(10, instance.reservedName);
    }
  }

  private _name?: string;
  private _field?: FieldDescriptorProto[];
  private _extension?: FieldDescriptorProto[];
  private _nestedType?: DescriptorProto[];
  private _enumType?: EnumDescriptorProto[];
  private _extensionRange?: DescriptorProto.ExtensionRange[];
  private _oneofDecl?: OneofDescriptorProto[];
  private _options?: MessageOptions;
  private _reservedRange?: DescriptorProto.ReservedRange[];
  private _reservedName?: string[];

  /**
   * Creates an object and applies default Protobuf values
   * @param DescriptorProto value
   */
  constructor(value?: RecursivePartial<DescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.field = (value.field || []).map(m => new FieldDescriptorProto(m));
    this.extension = (value.extension || []).map(
      m => new FieldDescriptorProto(m)
    );
    this.nestedType = (value.nestedType || []).map(m => new DescriptorProto(m));
    this.enumType = (value.enumType || []).map(m => new EnumDescriptorProto(m));
    this.extensionRange = (value.extensionRange || []).map(
      m => new DescriptorProto.ExtensionRange(m)
    );
    this.oneofDecl = (value.oneofDecl || []).map(
      m => new OneofDescriptorProto(m)
    );
    this.options = value.options
      ? new MessageOptions(value.options)
      : undefined;
    this.reservedRange = (value.reservedRange || []).map(
      m => new DescriptorProto.ReservedRange(m)
    );
    this.reservedName = (value.reservedName || []).slice();
    DescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get field(): FieldDescriptorProto[] | undefined {
    return this._field;
  }
  set field(value: FieldDescriptorProto[] | undefined) {
    this._field = value;
  }
  get extension(): FieldDescriptorProto[] | undefined {
    return this._extension;
  }
  set extension(value: FieldDescriptorProto[] | undefined) {
    this._extension = value;
  }
  get nestedType(): DescriptorProto[] | undefined {
    return this._nestedType;
  }
  set nestedType(value: DescriptorProto[] | undefined) {
    this._nestedType = value;
  }
  get enumType(): EnumDescriptorProto[] | undefined {
    return this._enumType;
  }
  set enumType(value: EnumDescriptorProto[] | undefined) {
    this._enumType = value;
  }
  get extensionRange(): DescriptorProto.ExtensionRange[] | undefined {
    return this._extensionRange;
  }
  set extensionRange(value: DescriptorProto.ExtensionRange[] | undefined) {
    this._extensionRange = value;
  }
  get oneofDecl(): OneofDescriptorProto[] | undefined {
    return this._oneofDecl;
  }
  set oneofDecl(value: OneofDescriptorProto[] | undefined) {
    this._oneofDecl = value;
  }
  get options(): MessageOptions | undefined {
    return this._options;
  }
  set options(value: MessageOptions | undefined) {
    this._options = value;
  }
  get reservedRange(): DescriptorProto.ReservedRange[] | undefined {
    return this._reservedRange;
  }
  set reservedRange(value: DescriptorProto.ReservedRange[] | undefined) {
    this._reservedRange = value;
  }
  get reservedName(): string[] | undefined {
    return this._reservedName;
  }
  set reservedName(value: string[] | undefined) {
    this._reservedName = value;
  }
  toObject() {
    return {
      name: this.name,
      field: (this.field || []).map(m => m.toObject()),
      extension: (this.extension || []).map(m => m.toObject()),
      nestedType: (this.nestedType || []).map(m => m.toObject()),
      enumType: (this.enumType || []).map(m => m.toObject()),
      extensionRange: (this.extensionRange || []).map(m => m.toObject()),
      oneofDecl: (this.oneofDecl || []).map(m => m.toObject()),
      options: this.options ? this.options.toObject() : undefined,
      reservedRange: (this.reservedRange || []).map(m => m.toObject()),
      reservedName: (this.reservedName || []).slice()
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module DescriptorProto {
  export class ExtensionRange implements GrpcMessage {
    static toBinary(instance: ExtensionRange) {
      const writer = new BinaryWriter();
      ExtensionRange.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new ExtensionRange();
      ExtensionRange.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: ExtensionRange) {
      instance.start = instance.start || 0;
      instance.end = instance.end || 0;
      instance.options = instance.options || undefined;
    }

    static fromBinaryReader(instance: ExtensionRange, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.start = reader.readInt32();
            break;
          case 2:
            instance.end = reader.readInt32();
            break;
          case 3:
            instance.options = new ExtensionRangeOptions();
            reader.readMessage(
              instance.options,
              ExtensionRangeOptions.fromBinaryReader
            );
            break;
          default:
            reader.skipField();
        }
      }

      ExtensionRange.refineValues(instance);
    }

    static toBinaryWriter(instance: ExtensionRange, writer: BinaryWriter) {
      if (instance.start) {
        writer.writeInt32(1, instance.start);
      }
      if (instance.end) {
        writer.writeInt32(2, instance.end);
      }
      if (instance.options) {
        writer.writeMessage(
          3,
          instance.options as any,
          ExtensionRangeOptions.toBinaryWriter
        );
      }
    }

    private _start?: number;
    private _end?: number;
    private _options?: ExtensionRangeOptions;

    /**
     * Creates an object and applies default Protobuf values
     * @param ExtensionRange value
     */
    constructor(value?: RecursivePartial<ExtensionRange>) {
      value = value || {};
      this.start = value.start;
      this.end = value.end;
      this.options = value.options
        ? new ExtensionRangeOptions(value.options)
        : undefined;
      ExtensionRange.refineValues(this);
    }
    get start(): number | undefined {
      return this._start;
    }
    set start(value: number | undefined) {
      this._start = value;
    }
    get end(): number | undefined {
      return this._end;
    }
    set end(value: number | undefined) {
      this._end = value;
    }
    get options(): ExtensionRangeOptions | undefined {
      return this._options;
    }
    set options(value: ExtensionRangeOptions | undefined) {
      this._options = value;
    }
    toObject() {
      return {
        start: this.start,
        end: this.end,
        options: this.options ? this.options.toObject() : undefined
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module ExtensionRange {}
  export class ReservedRange implements GrpcMessage {
    static toBinary(instance: ReservedRange) {
      const writer = new BinaryWriter();
      ReservedRange.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new ReservedRange();
      ReservedRange.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: ReservedRange) {
      instance.start = instance.start || 0;
      instance.end = instance.end || 0;
    }

    static fromBinaryReader(instance: ReservedRange, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.start = reader.readInt32();
            break;
          case 2:
            instance.end = reader.readInt32();
            break;
          default:
            reader.skipField();
        }
      }

      ReservedRange.refineValues(instance);
    }

    static toBinaryWriter(instance: ReservedRange, writer: BinaryWriter) {
      if (instance.start) {
        writer.writeInt32(1, instance.start);
      }
      if (instance.end) {
        writer.writeInt32(2, instance.end);
      }
    }

    private _start?: number;
    private _end?: number;

    /**
     * Creates an object and applies default Protobuf values
     * @param ReservedRange value
     */
    constructor(value?: RecursivePartial<ReservedRange>) {
      value = value || {};
      this.start = value.start;
      this.end = value.end;
      ReservedRange.refineValues(this);
    }
    get start(): number | undefined {
      return this._start;
    }
    set start(value: number | undefined) {
      this._start = value;
    }
    get end(): number | undefined {
      return this._end;
    }
    set end(value: number | undefined) {
      this._end = value;
    }
    toObject() {
      return {
        start: this.start,
        end: this.end
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module ReservedRange {}
}
export class ExtensionRangeOptions implements GrpcMessage {
  static toBinary(instance: ExtensionRangeOptions) {
    const writer = new BinaryWriter();
    ExtensionRangeOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new ExtensionRangeOptions();
    ExtensionRangeOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: ExtensionRangeOptions) {
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(
    instance: ExtensionRangeOptions,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    ExtensionRangeOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: ExtensionRangeOptions, writer: BinaryWriter) {
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param ExtensionRangeOptions value
   */
  constructor(value?: RecursivePartial<ExtensionRangeOptions>) {
    value = value || {};
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    ExtensionRangeOptions.refineValues(this);
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module ExtensionRangeOptions {}
export class FieldDescriptorProto implements GrpcMessage {
  static toBinary(instance: FieldDescriptorProto) {
    const writer = new BinaryWriter();
    FieldDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FieldDescriptorProto();
    FieldDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FieldDescriptorProto) {
    instance.name = instance.name || '';
    instance.number = instance.number || 0;
    instance.label = instance.label || 0;
    instance.type = instance.type || 0;
    instance.typeName = instance.typeName || '';
    instance.extendee = instance.extendee || '';
    instance.defaultValue = instance.defaultValue || '';
    instance.oneofIndex = instance.oneofIndex || 0;
    instance.jsonName = instance.jsonName || '';
    instance.options = instance.options || undefined;
  }

  static fromBinaryReader(
    instance: FieldDescriptorProto,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 3:
          instance.number = reader.readInt32();
          break;
        case 4:
          instance.label = reader.readEnum();
          break;
        case 5:
          instance.type = reader.readEnum();
          break;
        case 6:
          instance.typeName = reader.readString();
          break;
        case 2:
          instance.extendee = reader.readString();
          break;
        case 7:
          instance.defaultValue = reader.readString();
          break;
        case 9:
          instance.oneofIndex = reader.readInt32();
          break;
        case 10:
          instance.jsonName = reader.readString();
          break;
        case 8:
          instance.options = new FieldOptions();
          reader.readMessage(instance.options, FieldOptions.fromBinaryReader);
          break;
        default:
          reader.skipField();
      }
    }

    FieldDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: FieldDescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.number) {
      writer.writeInt32(3, instance.number);
    }
    if (instance.label) {
      writer.writeEnum(4, instance.label);
    }
    if (instance.type) {
      writer.writeEnum(5, instance.type);
    }
    if (instance.typeName) {
      writer.writeString(6, instance.typeName);
    }
    if (instance.extendee) {
      writer.writeString(2, instance.extendee);
    }
    if (instance.defaultValue) {
      writer.writeString(7, instance.defaultValue);
    }
    if (instance.oneofIndex) {
      writer.writeInt32(9, instance.oneofIndex);
    }
    if (instance.jsonName) {
      writer.writeString(10, instance.jsonName);
    }
    if (instance.options) {
      writer.writeMessage(
        8,
        instance.options as any,
        FieldOptions.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _number?: number;
  private _label?: FieldDescriptorProto.Label;
  private _type?: FieldDescriptorProto.Type;
  private _typeName?: string;
  private _extendee?: string;
  private _defaultValue?: string;
  private _oneofIndex?: number;
  private _jsonName?: string;
  private _options?: FieldOptions;

  /**
   * Creates an object and applies default Protobuf values
   * @param FieldDescriptorProto value
   */
  constructor(value?: RecursivePartial<FieldDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.number = value.number;
    this.label = value.label;
    this.type = value.type;
    this.typeName = value.typeName;
    this.extendee = value.extendee;
    this.defaultValue = value.defaultValue;
    this.oneofIndex = value.oneofIndex;
    this.jsonName = value.jsonName;
    this.options = value.options ? new FieldOptions(value.options) : undefined;
    FieldDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get number(): number | undefined {
    return this._number;
  }
  set number(value: number | undefined) {
    this._number = value;
  }
  get label(): FieldDescriptorProto.Label | undefined {
    return this._label;
  }
  set label(value: FieldDescriptorProto.Label | undefined) {
    this._label = value;
  }
  get type(): FieldDescriptorProto.Type | undefined {
    return this._type;
  }
  set type(value: FieldDescriptorProto.Type | undefined) {
    this._type = value;
  }
  get typeName(): string | undefined {
    return this._typeName;
  }
  set typeName(value: string | undefined) {
    this._typeName = value;
  }
  get extendee(): string | undefined {
    return this._extendee;
  }
  set extendee(value: string | undefined) {
    this._extendee = value;
  }
  get defaultValue(): string | undefined {
    return this._defaultValue;
  }
  set defaultValue(value: string | undefined) {
    this._defaultValue = value;
  }
  get oneofIndex(): number | undefined {
    return this._oneofIndex;
  }
  set oneofIndex(value: number | undefined) {
    this._oneofIndex = value;
  }
  get jsonName(): string | undefined {
    return this._jsonName;
  }
  set jsonName(value: string | undefined) {
    this._jsonName = value;
  }
  get options(): FieldOptions | undefined {
    return this._options;
  }
  set options(value: FieldOptions | undefined) {
    this._options = value;
  }
  toObject() {
    return {
      name: this.name,
      number: this.number,
      label: this.label,
      type: this.type,
      typeName: this.typeName,
      extendee: this.extendee,
      defaultValue: this.defaultValue,
      oneofIndex: this.oneofIndex,
      jsonName: this.jsonName,
      options: this.options ? this.options.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FieldDescriptorProto {
  export enum Type {
    typeDouble = 1,
    typeFloat = 2,
    typeInt64 = 3,
    typeUint64 = 4,
    typeInt32 = 5,
    typeFixed64 = 6,
    typeFixed32 = 7,
    typeBool = 8,
    typeString = 9,
    typeGroup = 10,
    typeMessage = 11,
    typeBytes = 12,
    typeUint32 = 13,
    typeEnum = 14,
    typeSfixed32 = 15,
    typeSfixed64 = 16,
    typeSint32 = 17,
    typeSint64 = 18
  }
  export enum Label {
    labelOptional = 1,
    labelRequired = 2,
    labelRepeated = 3
  }
}
export class OneofDescriptorProto implements GrpcMessage {
  static toBinary(instance: OneofDescriptorProto) {
    const writer = new BinaryWriter();
    OneofDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new OneofDescriptorProto();
    OneofDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: OneofDescriptorProto) {
    instance.name = instance.name || '';
    instance.options = instance.options || undefined;
  }

  static fromBinaryReader(
    instance: OneofDescriptorProto,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.options = new OneofOptions();
          reader.readMessage(instance.options, OneofOptions.fromBinaryReader);
          break;
        default:
          reader.skipField();
      }
    }

    OneofDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: OneofDescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.options) {
      writer.writeMessage(
        2,
        instance.options as any,
        OneofOptions.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _options?: OneofOptions;

  /**
   * Creates an object and applies default Protobuf values
   * @param OneofDescriptorProto value
   */
  constructor(value?: RecursivePartial<OneofDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.options = value.options ? new OneofOptions(value.options) : undefined;
    OneofDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get options(): OneofOptions | undefined {
    return this._options;
  }
  set options(value: OneofOptions | undefined) {
    this._options = value;
  }
  toObject() {
    return {
      name: this.name,
      options: this.options ? this.options.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module OneofDescriptorProto {}
export class EnumDescriptorProto implements GrpcMessage {
  static toBinary(instance: EnumDescriptorProto) {
    const writer = new BinaryWriter();
    EnumDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EnumDescriptorProto();
    EnumDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EnumDescriptorProto) {
    instance.name = instance.name || '';
    instance.value = instance.value || [];
    instance.options = instance.options || undefined;
    instance.reservedRange = instance.reservedRange || [];
    instance.reservedName = instance.reservedName || [];
  }

  static fromBinaryReader(instance: EnumDescriptorProto, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new EnumValueDescriptorProto();
          reader.readMessage(
            messageInitializer2,
            EnumValueDescriptorProto.fromBinaryReader
          );
          (instance.value = instance.value || []).push(messageInitializer2);
          break;
        case 3:
          instance.options = new EnumOptions();
          reader.readMessage(instance.options, EnumOptions.fromBinaryReader);
          break;
        case 4:
          const messageInitializer4 = new EnumDescriptorProto.EnumReservedRange();
          reader.readMessage(
            messageInitializer4,
            EnumDescriptorProto.EnumReservedRange.fromBinaryReader
          );
          (instance.reservedRange = instance.reservedRange || []).push(
            messageInitializer4
          );
          break;
        case 5:
          (instance.reservedName = instance.reservedName || []).push(
            reader.readString()
          );
          break;
        default:
          reader.skipField();
      }
    }

    EnumDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: EnumDescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.value && instance.value.length) {
      writer.writeRepeatedMessage(
        2,
        instance.value as any,
        EnumValueDescriptorProto.toBinaryWriter
      );
    }
    if (instance.options) {
      writer.writeMessage(
        3,
        instance.options as any,
        EnumOptions.toBinaryWriter
      );
    }
    if (instance.reservedRange && instance.reservedRange.length) {
      writer.writeRepeatedMessage(
        4,
        instance.reservedRange as any,
        EnumDescriptorProto.EnumReservedRange.toBinaryWriter
      );
    }
    if (instance.reservedName && instance.reservedName.length) {
      writer.writeRepeatedString(5, instance.reservedName);
    }
  }

  private _name?: string;
  private _value?: EnumValueDescriptorProto[];
  private _options?: EnumOptions;
  private _reservedRange?: EnumDescriptorProto.EnumReservedRange[];
  private _reservedName?: string[];

  /**
   * Creates an object and applies default Protobuf values
   * @param EnumDescriptorProto value
   */
  constructor(value?: RecursivePartial<EnumDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.value = (value.value || []).map(m => new EnumValueDescriptorProto(m));
    this.options = value.options ? new EnumOptions(value.options) : undefined;
    this.reservedRange = (value.reservedRange || []).map(
      m => new EnumDescriptorProto.EnumReservedRange(m)
    );
    this.reservedName = (value.reservedName || []).slice();
    EnumDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get value(): EnumValueDescriptorProto[] | undefined {
    return this._value;
  }
  set value(value: EnumValueDescriptorProto[] | undefined) {
    this._value = value;
  }
  get options(): EnumOptions | undefined {
    return this._options;
  }
  set options(value: EnumOptions | undefined) {
    this._options = value;
  }
  get reservedRange(): EnumDescriptorProto.EnumReservedRange[] | undefined {
    return this._reservedRange;
  }
  set reservedRange(
    value: EnumDescriptorProto.EnumReservedRange[] | undefined
  ) {
    this._reservedRange = value;
  }
  get reservedName(): string[] | undefined {
    return this._reservedName;
  }
  set reservedName(value: string[] | undefined) {
    this._reservedName = value;
  }
  toObject() {
    return {
      name: this.name,
      value: (this.value || []).map(m => m.toObject()),
      options: this.options ? this.options.toObject() : undefined,
      reservedRange: (this.reservedRange || []).map(m => m.toObject()),
      reservedName: (this.reservedName || []).slice()
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EnumDescriptorProto {
  export class EnumReservedRange implements GrpcMessage {
    static toBinary(instance: EnumReservedRange) {
      const writer = new BinaryWriter();
      EnumReservedRange.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new EnumReservedRange();
      EnumReservedRange.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: EnumReservedRange) {
      instance.start = instance.start || 0;
      instance.end = instance.end || 0;
    }

    static fromBinaryReader(instance: EnumReservedRange, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.start = reader.readInt32();
            break;
          case 2:
            instance.end = reader.readInt32();
            break;
          default:
            reader.skipField();
        }
      }

      EnumReservedRange.refineValues(instance);
    }

    static toBinaryWriter(instance: EnumReservedRange, writer: BinaryWriter) {
      if (instance.start) {
        writer.writeInt32(1, instance.start);
      }
      if (instance.end) {
        writer.writeInt32(2, instance.end);
      }
    }

    private _start?: number;
    private _end?: number;

    /**
     * Creates an object and applies default Protobuf values
     * @param EnumReservedRange value
     */
    constructor(value?: RecursivePartial<EnumReservedRange>) {
      value = value || {};
      this.start = value.start;
      this.end = value.end;
      EnumReservedRange.refineValues(this);
    }
    get start(): number | undefined {
      return this._start;
    }
    set start(value: number | undefined) {
      this._start = value;
    }
    get end(): number | undefined {
      return this._end;
    }
    set end(value: number | undefined) {
      this._end = value;
    }
    toObject() {
      return {
        start: this.start,
        end: this.end
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module EnumReservedRange {}
}
export class EnumValueDescriptorProto implements GrpcMessage {
  static toBinary(instance: EnumValueDescriptorProto) {
    const writer = new BinaryWriter();
    EnumValueDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EnumValueDescriptorProto();
    EnumValueDescriptorProto.fromBinaryReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  static refineValues(instance: EnumValueDescriptorProto) {
    instance.name = instance.name || '';
    instance.number = instance.number || 0;
    instance.options = instance.options || undefined;
  }

  static fromBinaryReader(
    instance: EnumValueDescriptorProto,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.number = reader.readInt32();
          break;
        case 3:
          instance.options = new EnumValueOptions();
          reader.readMessage(
            instance.options,
            EnumValueOptions.fromBinaryReader
          );
          break;
        default:
          reader.skipField();
      }
    }

    EnumValueDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(
    instance: EnumValueDescriptorProto,
    writer: BinaryWriter
  ) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.number) {
      writer.writeInt32(2, instance.number);
    }
    if (instance.options) {
      writer.writeMessage(
        3,
        instance.options as any,
        EnumValueOptions.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _number?: number;
  private _options?: EnumValueOptions;

  /**
   * Creates an object and applies default Protobuf values
   * @param EnumValueDescriptorProto value
   */
  constructor(value?: RecursivePartial<EnumValueDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.number = value.number;
    this.options = value.options
      ? new EnumValueOptions(value.options)
      : undefined;
    EnumValueDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get number(): number | undefined {
    return this._number;
  }
  set number(value: number | undefined) {
    this._number = value;
  }
  get options(): EnumValueOptions | undefined {
    return this._options;
  }
  set options(value: EnumValueOptions | undefined) {
    this._options = value;
  }
  toObject() {
    return {
      name: this.name,
      number: this.number,
      options: this.options ? this.options.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EnumValueDescriptorProto {}
export class ServiceDescriptorProto implements GrpcMessage {
  static toBinary(instance: ServiceDescriptorProto) {
    const writer = new BinaryWriter();
    ServiceDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new ServiceDescriptorProto();
    ServiceDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: ServiceDescriptorProto) {
    instance.name = instance.name || '';
    instance.method = instance.method || [];
    instance.options = instance.options || undefined;
  }

  static fromBinaryReader(
    instance: ServiceDescriptorProto,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          const messageInitializer2 = new MethodDescriptorProto();
          reader.readMessage(
            messageInitializer2,
            MethodDescriptorProto.fromBinaryReader
          );
          (instance.method = instance.method || []).push(messageInitializer2);
          break;
        case 3:
          instance.options = new ServiceOptions();
          reader.readMessage(instance.options, ServiceOptions.fromBinaryReader);
          break;
        default:
          reader.skipField();
      }
    }

    ServiceDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(
    instance: ServiceDescriptorProto,
    writer: BinaryWriter
  ) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.method && instance.method.length) {
      writer.writeRepeatedMessage(
        2,
        instance.method as any,
        MethodDescriptorProto.toBinaryWriter
      );
    }
    if (instance.options) {
      writer.writeMessage(
        3,
        instance.options as any,
        ServiceOptions.toBinaryWriter
      );
    }
  }

  private _name?: string;
  private _method?: MethodDescriptorProto[];
  private _options?: ServiceOptions;

  /**
   * Creates an object and applies default Protobuf values
   * @param ServiceDescriptorProto value
   */
  constructor(value?: RecursivePartial<ServiceDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.method = (value.method || []).map(m => new MethodDescriptorProto(m));
    this.options = value.options
      ? new ServiceOptions(value.options)
      : undefined;
    ServiceDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get method(): MethodDescriptorProto[] | undefined {
    return this._method;
  }
  set method(value: MethodDescriptorProto[] | undefined) {
    this._method = value;
  }
  get options(): ServiceOptions | undefined {
    return this._options;
  }
  set options(value: ServiceOptions | undefined) {
    this._options = value;
  }
  toObject() {
    return {
      name: this.name,
      method: (this.method || []).map(m => m.toObject()),
      options: this.options ? this.options.toObject() : undefined
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module ServiceDescriptorProto {}
export class MethodDescriptorProto implements GrpcMessage {
  static toBinary(instance: MethodDescriptorProto) {
    const writer = new BinaryWriter();
    MethodDescriptorProto.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new MethodDescriptorProto();
    MethodDescriptorProto.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: MethodDescriptorProto) {
    instance.name = instance.name || '';
    instance.inputType = instance.inputType || '';
    instance.outputType = instance.outputType || '';
    instance.options = instance.options || undefined;
    instance.clientStreaming = instance.clientStreaming || false;
    instance.serverStreaming = instance.serverStreaming || false;
  }

  static fromBinaryReader(
    instance: MethodDescriptorProto,
    reader: BinaryReader
  ) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        case 2:
          instance.inputType = reader.readString();
          break;
        case 3:
          instance.outputType = reader.readString();
          break;
        case 4:
          instance.options = new MethodOptions();
          reader.readMessage(instance.options, MethodOptions.fromBinaryReader);
          break;
        case 5:
          instance.clientStreaming = reader.readBool();
          break;
        case 6:
          instance.serverStreaming = reader.readBool();
          break;
        default:
          reader.skipField();
      }
    }

    MethodDescriptorProto.refineValues(instance);
  }

  static toBinaryWriter(instance: MethodDescriptorProto, writer: BinaryWriter) {
    if (instance.name) {
      writer.writeString(1, instance.name);
    }
    if (instance.inputType) {
      writer.writeString(2, instance.inputType);
    }
    if (instance.outputType) {
      writer.writeString(3, instance.outputType);
    }
    if (instance.options) {
      writer.writeMessage(
        4,
        instance.options as any,
        MethodOptions.toBinaryWriter
      );
    }
    if (instance.clientStreaming) {
      writer.writeBool(5, instance.clientStreaming);
    }
    if (instance.serverStreaming) {
      writer.writeBool(6, instance.serverStreaming);
    }
  }

  private _name?: string;
  private _inputType?: string;
  private _outputType?: string;
  private _options?: MethodOptions;
  private _clientStreaming?: boolean;
  private _serverStreaming?: boolean;

  /**
   * Creates an object and applies default Protobuf values
   * @param MethodDescriptorProto value
   */
  constructor(value?: RecursivePartial<MethodDescriptorProto>) {
    value = value || {};
    this.name = value.name;
    this.inputType = value.inputType;
    this.outputType = value.outputType;
    this.options = value.options ? new MethodOptions(value.options) : undefined;
    this.clientStreaming = value.clientStreaming;
    this.serverStreaming = value.serverStreaming;
    MethodDescriptorProto.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get inputType(): string | undefined {
    return this._inputType;
  }
  set inputType(value: string | undefined) {
    this._inputType = value;
  }
  get outputType(): string | undefined {
    return this._outputType;
  }
  set outputType(value: string | undefined) {
    this._outputType = value;
  }
  get options(): MethodOptions | undefined {
    return this._options;
  }
  set options(value: MethodOptions | undefined) {
    this._options = value;
  }
  get clientStreaming(): boolean | undefined {
    return this._clientStreaming;
  }
  set clientStreaming(value: boolean | undefined) {
    this._clientStreaming = value;
  }
  get serverStreaming(): boolean | undefined {
    return this._serverStreaming;
  }
  set serverStreaming(value: boolean | undefined) {
    this._serverStreaming = value;
  }
  toObject() {
    return {
      name: this.name,
      inputType: this.inputType,
      outputType: this.outputType,
      options: this.options ? this.options.toObject() : undefined,
      clientStreaming: this.clientStreaming,
      serverStreaming: this.serverStreaming
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module MethodDescriptorProto {}
export class FileOptions implements GrpcMessage {
  static toBinary(instance: FileOptions) {
    const writer = new BinaryWriter();
    FileOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FileOptions();
    FileOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FileOptions) {
    instance.javaPackage = instance.javaPackage || '';
    instance.javaOuterClassname = instance.javaOuterClassname || '';
    instance.javaMultipleFiles = instance.javaMultipleFiles || false;
    instance.javaGenerateEqualsAndHash =
      instance.javaGenerateEqualsAndHash || false;
    instance.javaStringCheckUtf8 = instance.javaStringCheckUtf8 || false;
    instance.optimizeFor = instance.optimizeFor || 0;
    instance.goPackage = instance.goPackage || '';
    instance.ccGenericServices = instance.ccGenericServices || false;
    instance.javaGenericServices = instance.javaGenericServices || false;
    instance.pyGenericServices = instance.pyGenericServices || false;
    instance.phpGenericServices = instance.phpGenericServices || false;
    instance.deprecated = instance.deprecated || false;
    instance.ccEnableArenas = instance.ccEnableArenas || false;
    instance.objcClassPrefix = instance.objcClassPrefix || '';
    instance.csharpNamespace = instance.csharpNamespace || '';
    instance.swiftPrefix = instance.swiftPrefix || '';
    instance.phpClassPrefix = instance.phpClassPrefix || '';
    instance.phpNamespace = instance.phpNamespace || '';
    instance.phpMetadataNamespace = instance.phpMetadataNamespace || '';
    instance.rubyPackage = instance.rubyPackage || '';
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: FileOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.javaPackage = reader.readString();
          break;
        case 8:
          instance.javaOuterClassname = reader.readString();
          break;
        case 10:
          instance.javaMultipleFiles = reader.readBool();
          break;
        case 20:
          instance.javaGenerateEqualsAndHash = reader.readBool();
          break;
        case 27:
          instance.javaStringCheckUtf8 = reader.readBool();
          break;
        case 9:
          instance.optimizeFor = reader.readEnum();
          break;
        case 11:
          instance.goPackage = reader.readString();
          break;
        case 16:
          instance.ccGenericServices = reader.readBool();
          break;
        case 17:
          instance.javaGenericServices = reader.readBool();
          break;
        case 18:
          instance.pyGenericServices = reader.readBool();
          break;
        case 42:
          instance.phpGenericServices = reader.readBool();
          break;
        case 23:
          instance.deprecated = reader.readBool();
          break;
        case 31:
          instance.ccEnableArenas = reader.readBool();
          break;
        case 36:
          instance.objcClassPrefix = reader.readString();
          break;
        case 37:
          instance.csharpNamespace = reader.readString();
          break;
        case 39:
          instance.swiftPrefix = reader.readString();
          break;
        case 40:
          instance.phpClassPrefix = reader.readString();
          break;
        case 41:
          instance.phpNamespace = reader.readString();
          break;
        case 44:
          instance.phpMetadataNamespace = reader.readString();
          break;
        case 45:
          instance.rubyPackage = reader.readString();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    FileOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: FileOptions, writer: BinaryWriter) {
    if (instance.javaPackage) {
      writer.writeString(1, instance.javaPackage);
    }
    if (instance.javaOuterClassname) {
      writer.writeString(8, instance.javaOuterClassname);
    }
    if (instance.javaMultipleFiles) {
      writer.writeBool(10, instance.javaMultipleFiles);
    }
    if (instance.javaGenerateEqualsAndHash) {
      writer.writeBool(20, instance.javaGenerateEqualsAndHash);
    }
    if (instance.javaStringCheckUtf8) {
      writer.writeBool(27, instance.javaStringCheckUtf8);
    }
    if (instance.optimizeFor) {
      writer.writeEnum(9, instance.optimizeFor);
    }
    if (instance.goPackage) {
      writer.writeString(11, instance.goPackage);
    }
    if (instance.ccGenericServices) {
      writer.writeBool(16, instance.ccGenericServices);
    }
    if (instance.javaGenericServices) {
      writer.writeBool(17, instance.javaGenericServices);
    }
    if (instance.pyGenericServices) {
      writer.writeBool(18, instance.pyGenericServices);
    }
    if (instance.phpGenericServices) {
      writer.writeBool(42, instance.phpGenericServices);
    }
    if (instance.deprecated) {
      writer.writeBool(23, instance.deprecated);
    }
    if (instance.ccEnableArenas) {
      writer.writeBool(31, instance.ccEnableArenas);
    }
    if (instance.objcClassPrefix) {
      writer.writeString(36, instance.objcClassPrefix);
    }
    if (instance.csharpNamespace) {
      writer.writeString(37, instance.csharpNamespace);
    }
    if (instance.swiftPrefix) {
      writer.writeString(39, instance.swiftPrefix);
    }
    if (instance.phpClassPrefix) {
      writer.writeString(40, instance.phpClassPrefix);
    }
    if (instance.phpNamespace) {
      writer.writeString(41, instance.phpNamespace);
    }
    if (instance.phpMetadataNamespace) {
      writer.writeString(44, instance.phpMetadataNamespace);
    }
    if (instance.rubyPackage) {
      writer.writeString(45, instance.rubyPackage);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _javaPackage?: string;
  private _javaOuterClassname?: string;
  private _javaMultipleFiles?: boolean;
  private _javaGenerateEqualsAndHash?: boolean;
  private _javaStringCheckUtf8?: boolean;
  private _optimizeFor?: FileOptions.OptimizeMode;
  private _goPackage?: string;
  private _ccGenericServices?: boolean;
  private _javaGenericServices?: boolean;
  private _pyGenericServices?: boolean;
  private _phpGenericServices?: boolean;
  private _deprecated?: boolean;
  private _ccEnableArenas?: boolean;
  private _objcClassPrefix?: string;
  private _csharpNamespace?: string;
  private _swiftPrefix?: string;
  private _phpClassPrefix?: string;
  private _phpNamespace?: string;
  private _phpMetadataNamespace?: string;
  private _rubyPackage?: string;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param FileOptions value
   */
  constructor(value?: RecursivePartial<FileOptions>) {
    value = value || {};
    this.javaPackage = value.javaPackage;
    this.javaOuterClassname = value.javaOuterClassname;
    this.javaMultipleFiles = value.javaMultipleFiles;
    this.javaGenerateEqualsAndHash = value.javaGenerateEqualsAndHash;
    this.javaStringCheckUtf8 = value.javaStringCheckUtf8;
    this.optimizeFor = value.optimizeFor;
    this.goPackage = value.goPackage;
    this.ccGenericServices = value.ccGenericServices;
    this.javaGenericServices = value.javaGenericServices;
    this.pyGenericServices = value.pyGenericServices;
    this.phpGenericServices = value.phpGenericServices;
    this.deprecated = value.deprecated;
    this.ccEnableArenas = value.ccEnableArenas;
    this.objcClassPrefix = value.objcClassPrefix;
    this.csharpNamespace = value.csharpNamespace;
    this.swiftPrefix = value.swiftPrefix;
    this.phpClassPrefix = value.phpClassPrefix;
    this.phpNamespace = value.phpNamespace;
    this.phpMetadataNamespace = value.phpMetadataNamespace;
    this.rubyPackage = value.rubyPackage;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    FileOptions.refineValues(this);
  }
  get javaPackage(): string | undefined {
    return this._javaPackage;
  }
  set javaPackage(value: string | undefined) {
    this._javaPackage = value;
  }
  get javaOuterClassname(): string | undefined {
    return this._javaOuterClassname;
  }
  set javaOuterClassname(value: string | undefined) {
    this._javaOuterClassname = value;
  }
  get javaMultipleFiles(): boolean | undefined {
    return this._javaMultipleFiles;
  }
  set javaMultipleFiles(value: boolean | undefined) {
    this._javaMultipleFiles = value;
  }
  get javaGenerateEqualsAndHash(): boolean | undefined {
    return this._javaGenerateEqualsAndHash;
  }
  set javaGenerateEqualsAndHash(value: boolean | undefined) {
    this._javaGenerateEqualsAndHash = value;
  }
  get javaStringCheckUtf8(): boolean | undefined {
    return this._javaStringCheckUtf8;
  }
  set javaStringCheckUtf8(value: boolean | undefined) {
    this._javaStringCheckUtf8 = value;
  }
  get optimizeFor(): FileOptions.OptimizeMode | undefined {
    return this._optimizeFor;
  }
  set optimizeFor(value: FileOptions.OptimizeMode | undefined) {
    this._optimizeFor = value;
  }
  get goPackage(): string | undefined {
    return this._goPackage;
  }
  set goPackage(value: string | undefined) {
    this._goPackage = value;
  }
  get ccGenericServices(): boolean | undefined {
    return this._ccGenericServices;
  }
  set ccGenericServices(value: boolean | undefined) {
    this._ccGenericServices = value;
  }
  get javaGenericServices(): boolean | undefined {
    return this._javaGenericServices;
  }
  set javaGenericServices(value: boolean | undefined) {
    this._javaGenericServices = value;
  }
  get pyGenericServices(): boolean | undefined {
    return this._pyGenericServices;
  }
  set pyGenericServices(value: boolean | undefined) {
    this._pyGenericServices = value;
  }
  get phpGenericServices(): boolean | undefined {
    return this._phpGenericServices;
  }
  set phpGenericServices(value: boolean | undefined) {
    this._phpGenericServices = value;
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get ccEnableArenas(): boolean | undefined {
    return this._ccEnableArenas;
  }
  set ccEnableArenas(value: boolean | undefined) {
    this._ccEnableArenas = value;
  }
  get objcClassPrefix(): string | undefined {
    return this._objcClassPrefix;
  }
  set objcClassPrefix(value: string | undefined) {
    this._objcClassPrefix = value;
  }
  get csharpNamespace(): string | undefined {
    return this._csharpNamespace;
  }
  set csharpNamespace(value: string | undefined) {
    this._csharpNamespace = value;
  }
  get swiftPrefix(): string | undefined {
    return this._swiftPrefix;
  }
  set swiftPrefix(value: string | undefined) {
    this._swiftPrefix = value;
  }
  get phpClassPrefix(): string | undefined {
    return this._phpClassPrefix;
  }
  set phpClassPrefix(value: string | undefined) {
    this._phpClassPrefix = value;
  }
  get phpNamespace(): string | undefined {
    return this._phpNamespace;
  }
  set phpNamespace(value: string | undefined) {
    this._phpNamespace = value;
  }
  get phpMetadataNamespace(): string | undefined {
    return this._phpMetadataNamespace;
  }
  set phpMetadataNamespace(value: string | undefined) {
    this._phpMetadataNamespace = value;
  }
  get rubyPackage(): string | undefined {
    return this._rubyPackage;
  }
  set rubyPackage(value: string | undefined) {
    this._rubyPackage = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      javaPackage: this.javaPackage,
      javaOuterClassname: this.javaOuterClassname,
      javaMultipleFiles: this.javaMultipleFiles,
      javaGenerateEqualsAndHash: this.javaGenerateEqualsAndHash,
      javaStringCheckUtf8: this.javaStringCheckUtf8,
      optimizeFor: this.optimizeFor,
      goPackage: this.goPackage,
      ccGenericServices: this.ccGenericServices,
      javaGenericServices: this.javaGenericServices,
      pyGenericServices: this.pyGenericServices,
      phpGenericServices: this.phpGenericServices,
      deprecated: this.deprecated,
      ccEnableArenas: this.ccEnableArenas,
      objcClassPrefix: this.objcClassPrefix,
      csharpNamespace: this.csharpNamespace,
      swiftPrefix: this.swiftPrefix,
      phpClassPrefix: this.phpClassPrefix,
      phpNamespace: this.phpNamespace,
      phpMetadataNamespace: this.phpMetadataNamespace,
      rubyPackage: this.rubyPackage,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FileOptions {
  export enum OptimizeMode {
    speed = 1,
    codeSize = 2,
    liteRuntime = 3
  }
}
export class MessageOptions implements GrpcMessage {
  static toBinary(instance: MessageOptions) {
    const writer = new BinaryWriter();
    MessageOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new MessageOptions();
    MessageOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: MessageOptions) {
    instance.messageSetWireFormat = instance.messageSetWireFormat || false;
    instance.noStandardDescriptorAccessor =
      instance.noStandardDescriptorAccessor || false;
    instance.deprecated = instance.deprecated || false;
    instance.mapEntry = instance.mapEntry || false;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: MessageOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.messageSetWireFormat = reader.readBool();
          break;
        case 2:
          instance.noStandardDescriptorAccessor = reader.readBool();
          break;
        case 3:
          instance.deprecated = reader.readBool();
          break;
        case 7:
          instance.mapEntry = reader.readBool();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    MessageOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: MessageOptions, writer: BinaryWriter) {
    if (instance.messageSetWireFormat) {
      writer.writeBool(1, instance.messageSetWireFormat);
    }
    if (instance.noStandardDescriptorAccessor) {
      writer.writeBool(2, instance.noStandardDescriptorAccessor);
    }
    if (instance.deprecated) {
      writer.writeBool(3, instance.deprecated);
    }
    if (instance.mapEntry) {
      writer.writeBool(7, instance.mapEntry);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _messageSetWireFormat?: boolean;
  private _noStandardDescriptorAccessor?: boolean;
  private _deprecated?: boolean;
  private _mapEntry?: boolean;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param MessageOptions value
   */
  constructor(value?: RecursivePartial<MessageOptions>) {
    value = value || {};
    this.messageSetWireFormat = value.messageSetWireFormat;
    this.noStandardDescriptorAccessor = value.noStandardDescriptorAccessor;
    this.deprecated = value.deprecated;
    this.mapEntry = value.mapEntry;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    MessageOptions.refineValues(this);
  }
  get messageSetWireFormat(): boolean | undefined {
    return this._messageSetWireFormat;
  }
  set messageSetWireFormat(value: boolean | undefined) {
    this._messageSetWireFormat = value;
  }
  get noStandardDescriptorAccessor(): boolean | undefined {
    return this._noStandardDescriptorAccessor;
  }
  set noStandardDescriptorAccessor(value: boolean | undefined) {
    this._noStandardDescriptorAccessor = value;
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get mapEntry(): boolean | undefined {
    return this._mapEntry;
  }
  set mapEntry(value: boolean | undefined) {
    this._mapEntry = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      messageSetWireFormat: this.messageSetWireFormat,
      noStandardDescriptorAccessor: this.noStandardDescriptorAccessor,
      deprecated: this.deprecated,
      mapEntry: this.mapEntry,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module MessageOptions {}
export class FieldOptions implements GrpcMessage {
  static toBinary(instance: FieldOptions) {
    const writer = new BinaryWriter();
    FieldOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new FieldOptions();
    FieldOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: FieldOptions) {
    instance.ctype = instance.ctype || 0;
    instance.packed = instance.packed || false;
    instance.jstype = instance.jstype || 0;
    instance.lazy = instance.lazy || false;
    instance.deprecated = instance.deprecated || false;
    instance.weak = instance.weak || false;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: FieldOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.ctype = reader.readEnum();
          break;
        case 2:
          instance.packed = reader.readBool();
          break;
        case 6:
          instance.jstype = reader.readEnum();
          break;
        case 5:
          instance.lazy = reader.readBool();
          break;
        case 3:
          instance.deprecated = reader.readBool();
          break;
        case 10:
          instance.weak = reader.readBool();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    FieldOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: FieldOptions, writer: BinaryWriter) {
    if (instance.ctype) {
      writer.writeEnum(1, instance.ctype);
    }
    if (instance.packed) {
      writer.writeBool(2, instance.packed);
    }
    if (instance.jstype) {
      writer.writeEnum(6, instance.jstype);
    }
    if (instance.lazy) {
      writer.writeBool(5, instance.lazy);
    }
    if (instance.deprecated) {
      writer.writeBool(3, instance.deprecated);
    }
    if (instance.weak) {
      writer.writeBool(10, instance.weak);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _ctype?: FieldOptions.CType;
  private _packed?: boolean;
  private _jstype?: FieldOptions.JSType;
  private _lazy?: boolean;
  private _deprecated?: boolean;
  private _weak?: boolean;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param FieldOptions value
   */
  constructor(value?: RecursivePartial<FieldOptions>) {
    value = value || {};
    this.ctype = value.ctype;
    this.packed = value.packed;
    this.jstype = value.jstype;
    this.lazy = value.lazy;
    this.deprecated = value.deprecated;
    this.weak = value.weak;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    FieldOptions.refineValues(this);
  }
  get ctype(): FieldOptions.CType | undefined {
    return this._ctype;
  }
  set ctype(value: FieldOptions.CType | undefined) {
    this._ctype = value;
  }
  get packed(): boolean | undefined {
    return this._packed;
  }
  set packed(value: boolean | undefined) {
    this._packed = value;
  }
  get jstype(): FieldOptions.JSType | undefined {
    return this._jstype;
  }
  set jstype(value: FieldOptions.JSType | undefined) {
    this._jstype = value;
  }
  get lazy(): boolean | undefined {
    return this._lazy;
  }
  set lazy(value: boolean | undefined) {
    this._lazy = value;
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get weak(): boolean | undefined {
    return this._weak;
  }
  set weak(value: boolean | undefined) {
    this._weak = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      ctype: this.ctype,
      packed: this.packed,
      jstype: this.jstype,
      lazy: this.lazy,
      deprecated: this.deprecated,
      weak: this.weak,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module FieldOptions {
  export enum CType {
    string = 0,
    cord = 1,
    stringPiece = 2
  }
  export enum JSType {
    jsNormal = 0,
    jsString = 1,
    jsNumber = 2
  }
}
export class OneofOptions implements GrpcMessage {
  static toBinary(instance: OneofOptions) {
    const writer = new BinaryWriter();
    OneofOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new OneofOptions();
    OneofOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: OneofOptions) {
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: OneofOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    OneofOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: OneofOptions, writer: BinaryWriter) {
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param OneofOptions value
   */
  constructor(value?: RecursivePartial<OneofOptions>) {
    value = value || {};
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    OneofOptions.refineValues(this);
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module OneofOptions {}
export class EnumOptions implements GrpcMessage {
  static toBinary(instance: EnumOptions) {
    const writer = new BinaryWriter();
    EnumOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EnumOptions();
    EnumOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EnumOptions) {
    instance.allowAlias = instance.allowAlias || false;
    instance.deprecated = instance.deprecated || false;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: EnumOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 2:
          instance.allowAlias = reader.readBool();
          break;
        case 3:
          instance.deprecated = reader.readBool();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    EnumOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: EnumOptions, writer: BinaryWriter) {
    if (instance.allowAlias) {
      writer.writeBool(2, instance.allowAlias);
    }
    if (instance.deprecated) {
      writer.writeBool(3, instance.deprecated);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _allowAlias?: boolean;
  private _deprecated?: boolean;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param EnumOptions value
   */
  constructor(value?: RecursivePartial<EnumOptions>) {
    value = value || {};
    this.allowAlias = value.allowAlias;
    this.deprecated = value.deprecated;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    EnumOptions.refineValues(this);
  }
  get allowAlias(): boolean | undefined {
    return this._allowAlias;
  }
  set allowAlias(value: boolean | undefined) {
    this._allowAlias = value;
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      allowAlias: this.allowAlias,
      deprecated: this.deprecated,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EnumOptions {}
export class EnumValueOptions implements GrpcMessage {
  static toBinary(instance: EnumValueOptions) {
    const writer = new BinaryWriter();
    EnumValueOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new EnumValueOptions();
    EnumValueOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: EnumValueOptions) {
    instance.deprecated = instance.deprecated || false;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: EnumValueOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          instance.deprecated = reader.readBool();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    EnumValueOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: EnumValueOptions, writer: BinaryWriter) {
    if (instance.deprecated) {
      writer.writeBool(1, instance.deprecated);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _deprecated?: boolean;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param EnumValueOptions value
   */
  constructor(value?: RecursivePartial<EnumValueOptions>) {
    value = value || {};
    this.deprecated = value.deprecated;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    EnumValueOptions.refineValues(this);
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      deprecated: this.deprecated,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module EnumValueOptions {}
export class ServiceOptions implements GrpcMessage {
  static toBinary(instance: ServiceOptions) {
    const writer = new BinaryWriter();
    ServiceOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new ServiceOptions();
    ServiceOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: ServiceOptions) {
    instance.deprecated = instance.deprecated || false;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: ServiceOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 33:
          instance.deprecated = reader.readBool();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    ServiceOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: ServiceOptions, writer: BinaryWriter) {
    if (instance.deprecated) {
      writer.writeBool(33, instance.deprecated);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _deprecated?: boolean;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param ServiceOptions value
   */
  constructor(value?: RecursivePartial<ServiceOptions>) {
    value = value || {};
    this.deprecated = value.deprecated;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    ServiceOptions.refineValues(this);
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      deprecated: this.deprecated,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module ServiceOptions {}
export class MethodOptions implements GrpcMessage {
  static toBinary(instance: MethodOptions) {
    const writer = new BinaryWriter();
    MethodOptions.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new MethodOptions();
    MethodOptions.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: MethodOptions) {
    instance.deprecated = instance.deprecated || false;
    instance.idempotencyLevel = instance.idempotencyLevel || 0;
    instance.uninterpretedOption = instance.uninterpretedOption || [];
  }

  static fromBinaryReader(instance: MethodOptions, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 33:
          instance.deprecated = reader.readBool();
          break;
        case 34:
          instance.idempotencyLevel = reader.readEnum();
          break;
        case 999:
          const messageInitializer999 = new UninterpretedOption();
          reader.readMessage(
            messageInitializer999,
            UninterpretedOption.fromBinaryReader
          );
          (instance.uninterpretedOption =
            instance.uninterpretedOption || []).push(messageInitializer999);
          break;
        default:
          reader.skipField();
      }
    }

    MethodOptions.refineValues(instance);
  }

  static toBinaryWriter(instance: MethodOptions, writer: BinaryWriter) {
    if (instance.deprecated) {
      writer.writeBool(33, instance.deprecated);
    }
    if (instance.idempotencyLevel) {
      writer.writeEnum(34, instance.idempotencyLevel);
    }
    if (instance.uninterpretedOption && instance.uninterpretedOption.length) {
      writer.writeRepeatedMessage(
        999,
        instance.uninterpretedOption as any,
        UninterpretedOption.toBinaryWriter
      );
    }
  }

  private _deprecated?: boolean;
  private _idempotencyLevel?: MethodOptions.IdempotencyLevel;
  private _uninterpretedOption?: UninterpretedOption[];

  /**
   * Creates an object and applies default Protobuf values
   * @param MethodOptions value
   */
  constructor(value?: RecursivePartial<MethodOptions>) {
    value = value || {};
    this.deprecated = value.deprecated;
    this.idempotencyLevel = value.idempotencyLevel;
    this.uninterpretedOption = (value.uninterpretedOption || []).map(
      m => new UninterpretedOption(m)
    );
    MethodOptions.refineValues(this);
  }
  get deprecated(): boolean | undefined {
    return this._deprecated;
  }
  set deprecated(value: boolean | undefined) {
    this._deprecated = value;
  }
  get idempotencyLevel(): MethodOptions.IdempotencyLevel | undefined {
    return this._idempotencyLevel;
  }
  set idempotencyLevel(value: MethodOptions.IdempotencyLevel | undefined) {
    this._idempotencyLevel = value;
  }
  get uninterpretedOption(): UninterpretedOption[] | undefined {
    return this._uninterpretedOption;
  }
  set uninterpretedOption(value: UninterpretedOption[] | undefined) {
    this._uninterpretedOption = value;
  }
  toObject() {
    return {
      deprecated: this.deprecated,
      idempotencyLevel: this.idempotencyLevel,
      uninterpretedOption: (this.uninterpretedOption || []).map(m =>
        m.toObject()
      )
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module MethodOptions {
  export enum IdempotencyLevel {
    idempotencyUnknown = 0,
    noSideEffects = 1,
    idempotent = 2
  }
}
export class UninterpretedOption implements GrpcMessage {
  static toBinary(instance: UninterpretedOption) {
    const writer = new BinaryWriter();
    UninterpretedOption.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new UninterpretedOption();
    UninterpretedOption.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: UninterpretedOption) {
    instance.name = instance.name || [];
    instance.identifierValue = instance.identifierValue || '';
    instance.positiveIntValue = instance.positiveIntValue || '0';
    instance.negativeIntValue = instance.negativeIntValue || '0';
    instance.doubleValue = instance.doubleValue || 0;
    instance.stringValue = instance.stringValue || new Uint8Array();
    instance.aggregateValue = instance.aggregateValue || '';
  }

  static fromBinaryReader(instance: UninterpretedOption, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 2:
          const messageInitializer2 = new UninterpretedOption.NamePart();
          reader.readMessage(
            messageInitializer2,
            UninterpretedOption.NamePart.fromBinaryReader
          );
          (instance.name = instance.name || []).push(messageInitializer2);
          break;
        case 3:
          instance.identifierValue = reader.readString();
          break;
        case 4:
          instance.positiveIntValue = reader.readUint64String();
          break;
        case 5:
          instance.negativeIntValue = reader.readInt64String();
          break;
        case 6:
          instance.doubleValue = reader.readDouble();
          break;
        case 7:
          instance.stringValue = reader.readBytes();
          break;
        case 8:
          instance.aggregateValue = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    UninterpretedOption.refineValues(instance);
  }

  static toBinaryWriter(instance: UninterpretedOption, writer: BinaryWriter) {
    if (instance.name && instance.name.length) {
      writer.writeRepeatedMessage(
        2,
        instance.name as any,
        UninterpretedOption.NamePart.toBinaryWriter
      );
    }
    if (instance.identifierValue) {
      writer.writeString(3, instance.identifierValue);
    }
    if (instance.positiveIntValue) {
      writer.writeUint64String(4, instance.positiveIntValue);
    }
    if (instance.negativeIntValue) {
      writer.writeInt64String(5, instance.negativeIntValue);
    }
    if (instance.doubleValue) {
      writer.writeDouble(6, instance.doubleValue);
    }
    if (instance.stringValue && instance.stringValue.length) {
      writer.writeBytes(7, instance.stringValue);
    }
    if (instance.aggregateValue) {
      writer.writeString(8, instance.aggregateValue);
    }
  }

  private _name?: UninterpretedOption.NamePart[];
  private _identifierValue?: string;
  private _positiveIntValue?: string;
  private _negativeIntValue?: string;
  private _doubleValue?: number;
  private _stringValue?: Uint8Array;
  private _aggregateValue?: string;

  /**
   * Creates an object and applies default Protobuf values
   * @param UninterpretedOption value
   */
  constructor(value?: RecursivePartial<UninterpretedOption>) {
    value = value || {};
    this.name = (value.name || []).map(
      m => new UninterpretedOption.NamePart(m)
    );
    this.identifierValue = value.identifierValue;
    this.positiveIntValue = value.positiveIntValue;
    this.negativeIntValue = value.negativeIntValue;
    this.doubleValue = value.doubleValue;
    this.stringValue = value.stringValue;
    this.aggregateValue = value.aggregateValue;
    UninterpretedOption.refineValues(this);
  }
  get name(): UninterpretedOption.NamePart[] | undefined {
    return this._name;
  }
  set name(value: UninterpretedOption.NamePart[] | undefined) {
    this._name = value;
  }
  get identifierValue(): string | undefined {
    return this._identifierValue;
  }
  set identifierValue(value: string | undefined) {
    this._identifierValue = value;
  }
  get positiveIntValue(): string | undefined {
    return this._positiveIntValue;
  }
  set positiveIntValue(value: string | undefined) {
    this._positiveIntValue = value;
  }
  get negativeIntValue(): string | undefined {
    return this._negativeIntValue;
  }
  set negativeIntValue(value: string | undefined) {
    this._negativeIntValue = value;
  }
  get doubleValue(): number | undefined {
    return this._doubleValue;
  }
  set doubleValue(value: number | undefined) {
    this._doubleValue = value;
  }
  get stringValue(): Uint8Array | undefined {
    return this._stringValue;
  }
  set stringValue(value: Uint8Array | undefined) {
    this._stringValue = value;
  }
  get aggregateValue(): string | undefined {
    return this._aggregateValue;
  }
  set aggregateValue(value: string | undefined) {
    this._aggregateValue = value;
  }
  toObject() {
    return {
      name: (this.name || []).map(m => m.toObject()),
      identifierValue: this.identifierValue,
      positiveIntValue: this.positiveIntValue,
      negativeIntValue: this.negativeIntValue,
      doubleValue: this.doubleValue,
      stringValue: this.stringValue
        ? this.stringValue.subarray(0)
        : new Uint8Array(),
      aggregateValue: this.aggregateValue
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module UninterpretedOption {
  export class NamePart implements GrpcMessage {
    static toBinary(instance: NamePart) {
      const writer = new BinaryWriter();
      NamePart.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new NamePart();
      NamePart.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: NamePart) {
      instance.namePart = instance.namePart || '';
      instance.isExtension = instance.isExtension || false;
    }

    static fromBinaryReader(instance: NamePart, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            instance.namePart = reader.readString();
            break;
          case 2:
            instance.isExtension = reader.readBool();
            break;
          default:
            reader.skipField();
        }
      }

      NamePart.refineValues(instance);
    }

    static toBinaryWriter(instance: NamePart, writer: BinaryWriter) {
      if (instance.namePart) {
        writer.writeString(1, instance.namePart);
      }
      if (instance.isExtension) {
        writer.writeBool(2, instance.isExtension);
      }
    }

    private _namePart?: string;
    private _isExtension?: boolean;

    /**
     * Creates an object and applies default Protobuf values
     * @param NamePart value
     */
    constructor(value?: RecursivePartial<NamePart>) {
      value = value || {};
      this.namePart = value.namePart;
      this.isExtension = value.isExtension;
      NamePart.refineValues(this);
    }
    get namePart(): string | undefined {
      return this._namePart;
    }
    set namePart(value: string | undefined) {
      this._namePart = value;
    }
    get isExtension(): boolean | undefined {
      return this._isExtension;
    }
    set isExtension(value: boolean | undefined) {
      this._isExtension = value;
    }
    toObject() {
      return {
        namePart: this.namePart,
        isExtension: this.isExtension
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module NamePart {}
}
export class SourceCodeInfo implements GrpcMessage {
  static toBinary(instance: SourceCodeInfo) {
    const writer = new BinaryWriter();
    SourceCodeInfo.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new SourceCodeInfo();
    SourceCodeInfo.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: SourceCodeInfo) {
    instance.location = instance.location || [];
  }

  static fromBinaryReader(instance: SourceCodeInfo, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new SourceCodeInfo.Location();
          reader.readMessage(
            messageInitializer1,
            SourceCodeInfo.Location.fromBinaryReader
          );
          (instance.location = instance.location || []).push(
            messageInitializer1
          );
          break;
        default:
          reader.skipField();
      }
    }

    SourceCodeInfo.refineValues(instance);
  }

  static toBinaryWriter(instance: SourceCodeInfo, writer: BinaryWriter) {
    if (instance.location && instance.location.length) {
      writer.writeRepeatedMessage(
        1,
        instance.location as any,
        SourceCodeInfo.Location.toBinaryWriter
      );
    }
  }

  private _location?: SourceCodeInfo.Location[];

  /**
   * Creates an object and applies default Protobuf values
   * @param SourceCodeInfo value
   */
  constructor(value?: RecursivePartial<SourceCodeInfo>) {
    value = value || {};
    this.location = (value.location || []).map(
      m => new SourceCodeInfo.Location(m)
    );
    SourceCodeInfo.refineValues(this);
  }
  get location(): SourceCodeInfo.Location[] | undefined {
    return this._location;
  }
  set location(value: SourceCodeInfo.Location[] | undefined) {
    this._location = value;
  }
  toObject() {
    return {
      location: (this.location || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module SourceCodeInfo {
  export class Location implements GrpcMessage {
    static toBinary(instance: Location) {
      const writer = new BinaryWriter();
      Location.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new Location();
      Location.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: Location) {
      instance.path = instance.path || [];
      instance.span = instance.span || [];
      instance.leadingComments = instance.leadingComments || '';
      instance.trailingComments = instance.trailingComments || '';
      instance.leadingDetachedComments = instance.leadingDetachedComments || [];
    }

    static fromBinaryReader(instance: Location, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            (instance.path = instance.path || []).push(reader.readInt32());
            break;
          case 2:
            (instance.span = instance.span || []).push(reader.readInt32());
            break;
          case 3:
            instance.leadingComments = reader.readString();
            break;
          case 4:
            instance.trailingComments = reader.readString();
            break;
          case 6:
            (instance.leadingDetachedComments =
              instance.leadingDetachedComments || []).push(reader.readString());
            break;
          default:
            reader.skipField();
        }
      }

      Location.refineValues(instance);
    }

    static toBinaryWriter(instance: Location, writer: BinaryWriter) {
      if (instance.path && instance.path.length) {
        writer.writeRepeatedInt32(1, instance.path);
      }
      if (instance.span && instance.span.length) {
        writer.writeRepeatedInt32(2, instance.span);
      }
      if (instance.leadingComments) {
        writer.writeString(3, instance.leadingComments);
      }
      if (instance.trailingComments) {
        writer.writeString(4, instance.trailingComments);
      }
      if (
        instance.leadingDetachedComments &&
        instance.leadingDetachedComments.length
      ) {
        writer.writeRepeatedString(6, instance.leadingDetachedComments);
      }
    }

    private _path?: number[];
    private _span?: number[];
    private _leadingComments?: string;
    private _trailingComments?: string;
    private _leadingDetachedComments?: string[];

    /**
     * Creates an object and applies default Protobuf values
     * @param Location value
     */
    constructor(value?: RecursivePartial<Location>) {
      value = value || {};
      this.path = (value.path || []).slice();
      this.span = (value.span || []).slice();
      this.leadingComments = value.leadingComments;
      this.trailingComments = value.trailingComments;
      this.leadingDetachedComments = (
        value.leadingDetachedComments || []
      ).slice();
      Location.refineValues(this);
    }
    get path(): number[] | undefined {
      return this._path;
    }
    set path(value: number[] | undefined) {
      this._path = value;
    }
    get span(): number[] | undefined {
      return this._span;
    }
    set span(value: number[] | undefined) {
      this._span = value;
    }
    get leadingComments(): string | undefined {
      return this._leadingComments;
    }
    set leadingComments(value: string | undefined) {
      this._leadingComments = value;
    }
    get trailingComments(): string | undefined {
      return this._trailingComments;
    }
    set trailingComments(value: string | undefined) {
      this._trailingComments = value;
    }
    get leadingDetachedComments(): string[] | undefined {
      return this._leadingDetachedComments;
    }
    set leadingDetachedComments(value: string[] | undefined) {
      this._leadingDetachedComments = value;
    }
    toObject() {
      return {
        path: (this.path || []).slice(),
        span: (this.span || []).slice(),
        leadingComments: this.leadingComments,
        trailingComments: this.trailingComments,
        leadingDetachedComments: (this.leadingDetachedComments || []).slice()
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module Location {}
}
export class GeneratedCodeInfo implements GrpcMessage {
  static toBinary(instance: GeneratedCodeInfo) {
    const writer = new BinaryWriter();
    GeneratedCodeInfo.toBinaryWriter(instance, writer);
    return writer.getResultBuffer();
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new GeneratedCodeInfo();
    GeneratedCodeInfo.fromBinaryReader(instance, new BinaryReader(bytes));
    return instance;
  }

  static refineValues(instance: GeneratedCodeInfo) {
    instance.annotation = instance.annotation || [];
  }

  static fromBinaryReader(instance: GeneratedCodeInfo, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;

      switch (reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new GeneratedCodeInfo.Annotation();
          reader.readMessage(
            messageInitializer1,
            GeneratedCodeInfo.Annotation.fromBinaryReader
          );
          (instance.annotation = instance.annotation || []).push(
            messageInitializer1
          );
          break;
        default:
          reader.skipField();
      }
    }

    GeneratedCodeInfo.refineValues(instance);
  }

  static toBinaryWriter(instance: GeneratedCodeInfo, writer: BinaryWriter) {
    if (instance.annotation && instance.annotation.length) {
      writer.writeRepeatedMessage(
        1,
        instance.annotation as any,
        GeneratedCodeInfo.Annotation.toBinaryWriter
      );
    }
  }

  private _annotation?: GeneratedCodeInfo.Annotation[];

  /**
   * Creates an object and applies default Protobuf values
   * @param GeneratedCodeInfo value
   */
  constructor(value?: RecursivePartial<GeneratedCodeInfo>) {
    value = value || {};
    this.annotation = (value.annotation || []).map(
      m => new GeneratedCodeInfo.Annotation(m)
    );
    GeneratedCodeInfo.refineValues(this);
  }
  get annotation(): GeneratedCodeInfo.Annotation[] | undefined {
    return this._annotation;
  }
  set annotation(value: GeneratedCodeInfo.Annotation[] | undefined) {
    this._annotation = value;
  }
  toObject() {
    return {
      annotation: (this.annotation || []).map(m => m.toObject())
    };
  }
  toJSON() {
    return this.toObject();
  }
}
export module GeneratedCodeInfo {
  export class Annotation implements GrpcMessage {
    static toBinary(instance: Annotation) {
      const writer = new BinaryWriter();
      Annotation.toBinaryWriter(instance, writer);
      return writer.getResultBuffer();
    }

    static fromBinary(bytes: ByteSource) {
      const instance = new Annotation();
      Annotation.fromBinaryReader(instance, new BinaryReader(bytes));
      return instance;
    }

    static refineValues(instance: Annotation) {
      instance.path = instance.path || [];
      instance.sourceFile = instance.sourceFile || '';
      instance.begin = instance.begin || 0;
      instance.end = instance.end || 0;
    }

    static fromBinaryReader(instance: Annotation, reader: BinaryReader) {
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;

        switch (reader.getFieldNumber()) {
          case 1:
            (instance.path = instance.path || []).push(reader.readInt32());
            break;
          case 2:
            instance.sourceFile = reader.readString();
            break;
          case 3:
            instance.begin = reader.readInt32();
            break;
          case 4:
            instance.end = reader.readInt32();
            break;
          default:
            reader.skipField();
        }
      }

      Annotation.refineValues(instance);
    }

    static toBinaryWriter(instance: Annotation, writer: BinaryWriter) {
      if (instance.path && instance.path.length) {
        writer.writeRepeatedInt32(1, instance.path);
      }
      if (instance.sourceFile) {
        writer.writeString(2, instance.sourceFile);
      }
      if (instance.begin) {
        writer.writeInt32(3, instance.begin);
      }
      if (instance.end) {
        writer.writeInt32(4, instance.end);
      }
    }

    private _path?: number[];
    private _sourceFile?: string;
    private _begin?: number;
    private _end?: number;

    /**
     * Creates an object and applies default Protobuf values
     * @param Annotation value
     */
    constructor(value?: RecursivePartial<Annotation>) {
      value = value || {};
      this.path = (value.path || []).slice();
      this.sourceFile = value.sourceFile;
      this.begin = value.begin;
      this.end = value.end;
      Annotation.refineValues(this);
    }
    get path(): number[] | undefined {
      return this._path;
    }
    set path(value: number[] | undefined) {
      this._path = value;
    }
    get sourceFile(): string | undefined {
      return this._sourceFile;
    }
    set sourceFile(value: string | undefined) {
      this._sourceFile = value;
    }
    get begin(): number | undefined {
      return this._begin;
    }
    set begin(value: number | undefined) {
      this._begin = value;
    }
    get end(): number | undefined {
      return this._end;
    }
    set end(value: number | undefined) {
      this._end = value;
    }
    toObject() {
      return {
        path: (this.path || []).slice(),
        sourceFile: this.sourceFile,
        begin: this.begin,
        end: this.end
      };
    }
    toJSON() {
      return this.toObject();
    }
  }
  export module Annotation {}
}
