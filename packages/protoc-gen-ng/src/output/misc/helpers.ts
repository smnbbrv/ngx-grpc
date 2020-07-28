import { Proto } from '../../input/proto';
import { ProtoMessage } from '../../input/proto-message';
import { ProtoMessageField } from '../../input/proto-message-field';
import { ProtoMessageFieldCardinality, ProtoMessageFieldType } from '../../input/types';

export function isFieldMap(proto: Proto, field: ProtoMessageField) {
  if (isFieldMessage(field)) {
    const msg = proto.resolveTypeMetadata(field.typeName).message;

    if (msg && msg.options.mapEntry) {
      return true;
    }
  }

  return false;
}

export function getMapKeyValueFields(proto: Proto, field: ProtoMessageField) {
  const msg = proto.resolveTypeMetadata(field.typeName).message as ProtoMessage;
  const key = msg.fieldList.find(f => f.name === 'key') as ProtoMessageField;
  const value = msg.fieldList.find(f => f.name === 'value') as ProtoMessageField;

  return [key, value];
}

export function isFieldMessage(field: ProtoMessageField) {
  return field.type === ProtoMessageFieldType.message || field.type === ProtoMessageFieldType.group;
}

export function getDataType(proto: Proto, field: ProtoMessageField) {
  if (isFieldMap(proto, field)) {
    const [key, value] = getMapKeyValueFields(proto, field);

    return `{ [prop: ${key.type === ProtoMessageFieldType.string ? 'string' : 'number'}]: ${getDataType(proto, value)}; }`;
  }

  const suffix = field.label === ProtoMessageFieldCardinality.repeated ? '[]' : '';

  if (field.type === ProtoMessageFieldType.enum || isFieldMessage(field)) {
    return proto.getRelativeTypeName(field.typeName) + suffix;
  }

  switch (field.type) {
    case ProtoMessageFieldType.string:
    case ProtoMessageFieldType.fixed64:
    case ProtoMessageFieldType.int64:
    case ProtoMessageFieldType.sfixed64:
    case ProtoMessageFieldType.sint64:
    case ProtoMessageFieldType.uint64:
      return 'string' + suffix;
    case ProtoMessageFieldType.bool:
      return 'boolean' + suffix;
    case ProtoMessageFieldType.bytes:
      return 'Uint8Array' + suffix;
    case ProtoMessageFieldType.double:
    case ProtoMessageFieldType.fixed32:
    case ProtoMessageFieldType.float:
    case ProtoMessageFieldType.int32:
    case ProtoMessageFieldType.sfixed32:
    case ProtoMessageFieldType.sint32:
    case ProtoMessageFieldType.uint32:
      return 'number' + suffix;
    default: throw new Error('Unknown data type ' + field.type);
  }
}
