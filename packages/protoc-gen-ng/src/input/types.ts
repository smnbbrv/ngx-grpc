// https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/type.proto

export enum ProtoMessageFieldType {
  unknown = 0,
  double = 1,
  float = 2,
  int64 = 3,
  uint64 = 4,
  int32 = 5,
  fixed64 = 6,
  fixed32 = 7,
  bool = 8,
  string = 9,
  group = 10,
  message = 11,
  bytes = 12,
  uint32 = 13,
  enum = 14,
  sfixed32 = 15,
  sfixed64 = 16,
  sint32 = 17,
  sint64 = 18,
}

export enum ProtoMessageFieldCardinality {
  unknown = 0,
  optional = 1,
  required = 2,
  repeated = 3,
}
