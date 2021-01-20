import 'jest';
import * as dataTypesWebGrpc from '../out-grpc-web/data-types_pb';
import * as dataTypes from '../out/data-types.pb';

describe('data-types.proto', () => {
  it('should produce TestEnum', () => {
    expect(dataTypes.TestEnum).toBeTruthy();
    expect(dataTypes.TestEnum.value0).toBe(0);
    expect(dataTypes.TestEnum.value1).toBe(1);
    expect(dataTypes.TestEnum.value2).toBe(2);
  });

  it('should preserve enum values case', () => {
    expect(dataTypes.TestEnum).toBeTruthy();
    expect(dataTypes.TestEnum.value0).toBe(0);
    expect(dataTypes.TestEnum.value1).toBe(1);
    expect(dataTypes.TestEnum.value2).toBe(2);
    expect(dataTypes.TestEnum.VALUE3).toBe(3);
  });

  it('should produce TestSubMessage', () => {
    expect(dataTypes.TestSubMessage).toBeTruthy();
  });

  it('should implement proper TestSubMessage reader', () => {
    const msg = dataTypes.TestSubMessage.deserializeBinary('');

    expect(msg instanceof dataTypes.TestSubMessage).toBeTruthy();

    expect(msg.string).toBe('');
  });

  it('should implement proper TestTreeItemMessage reader', () => {
    const msg = dataTypes.TestTreeItemMessage.deserializeBinary('');

    expect(msg instanceof dataTypes.TestTreeItemMessage).toBeTruthy();

    expect(msg.sub).toBe(undefined);
  });

  it('should implement proper TestMessage reader', () => {
    const msg = dataTypes.TestMessage.deserializeBinary('');

    expect(msg instanceof dataTypes.TestMessage).toBeTruthy();

    expect(msg.string).toBe('');
    expect(msg.int32).toBe(0);
    expect(msg.bool).toBe(false);
    expect(msg.subMessage).toBe(undefined);
    expect(msg.double).toBe(0);
    expect(msg.float).toBe(0);
    expect(
      msg.bytes instanceof Uint8Array && msg.bytes.length === 0,
    ).toBeTruthy();
    expect(msg.int64).toBe('0');
    expect(msg.enum).toBe(0);
    expect(msg.fixed32).toBe(0);
    expect(msg.fixed64).toBe('0');
    expect(msg.uint32).toBe(0);
    expect(msg.uint64).toBe('0');
    expect(msg.mapStringString).toEqual({});
    expect(msg.mapInt64Sub).toEqual({});
    expect(msg.mapBoolString).toEqual({});
  });

  it('should implement proper RepeatedTestMessage reader', () => {
    const msg = dataTypes.RepeatedTestMessage.deserializeBinary('');

    expect(msg instanceof dataTypes.RepeatedTestMessage).toBeTruthy();

    expect(msg.string).toEqual([]);
    expect(msg.int32).toEqual([]);
    expect(msg.bool).toEqual([]);
    expect(msg.subMessage).toEqual([]);
    expect(msg.double).toEqual([]);
    expect(msg.float).toEqual([]);
    expect(msg.bytes).toEqual([]);
    expect(msg.int64).toEqual([]);
    expect(msg.enum).toEqual([]);
    expect(msg.fixed32).toEqual([]);
    expect(msg.fixed64).toEqual([]);
    expect(msg.uint32).toEqual([]);
    expect(msg.uint64).toEqual([]);
  });

  it('should have toObject that creates a message snapshot', () => {
    const msg = new dataTypes.TestMessage();
    const msgRepeated = new dataTypes.RepeatedTestMessage();

    expect(msg.toObject()).toEqual({
      string: '',
      int32: 0,
      bool: false,
      subMessage: undefined,
      double: 0,
      float: 0,
      bytes: new Uint8Array(),
      int64: '0',
      enum: 0,
      fixed32: 0,
      fixed64: '0',
      uint32: 0,
      uint64: '0',
      mapStringString: {},
      mapInt64Sub: {},
      mapBoolString: {},
    });

    expect(msgRepeated.toObject()).toEqual({
      string: [],
      int32: [],
      bool: [],
      subMessage: [],
      double: [],
      float: [],
      bytes: [],
      int64: [],
      enum: [],
      fixed32: [],
      fixed64: [],
      uint32: [],
      uint64: [],
    });
  });

  it('should serialize non-trivial values consistently with web-grpc', () => {
    const msg = new dataTypes.TestMessage({
      string: 'someString',
      int32: 32,
      bool: true,
      subMessage: new dataTypes.TestSubMessage({
        string: 'someSubString',
      }),
      double: 0.1,
      float: 0.2,
      bytes: Uint8Array.from([1, 2, 3]),
      int64: '64',
      enum: dataTypes.TestEnum.value1,
      fixed32: 32,
      fixed64: '64',
      uint32: 32,
      uint64: '64',
      mapStringString: {
        stringKey: 'stringValue',
      },
      mapInt64Sub: {
        64: new dataTypes.TestSubMessage({ string: 'someSubString' }),
      },
      mapBoolString: {
        1: 'true',
      },
    });

    const msgWebGrpc = dataTypesWebGrpc.TestMessage.deserializeBinary(
      msg.serializeBinary(),
    );
    expect(msgWebGrpc.getString()).toEqual('someString');
    expect(msgWebGrpc.getInt32()).toEqual(32);
    expect(msgWebGrpc.getBool()).toEqual(true);
    expect(msgWebGrpc.getSubmessage()?.getString()).toEqual('someSubString');
    expect(msgWebGrpc.getDouble()).toBeCloseTo(0.1, 2);
    expect(msgWebGrpc.getFloat()).toBeCloseTo(0.2, 2);
    expect(msgWebGrpc.getBytes()).toEqual(Uint8Array.from([1, 2, 3]));
    expect(msgWebGrpc.getInt64()).toEqual(64);
    expect(msgWebGrpc.getEnum()).toEqual(dataTypesWebGrpc.TestEnum.VALUE1);
    expect(msgWebGrpc.getFixed32()).toEqual(32);
    expect(msgWebGrpc.getFixed64()).toEqual(64);
    expect(msgWebGrpc.getMapStringStringMap().get('stringKey')).toEqual(
      'stringValue',
    );

    expect(
      msgWebGrpc
        .getMapInt64SubMap()
        .get(64)
        ?.getString(),
    ).toEqual('someSubString');
    expect(msgWebGrpc.getMapBoolStringMap().get(true)).toEqual('true');
  });

  it('should allow getting and setting maps with int64 keys', () => {
    const msgWebGrpc = new dataTypesWebGrpc.TestMessage();
    const int64Map = msgWebGrpc.getMapInt64SubMap();
    const subMsg = new dataTypesWebGrpc.TestSubMessage();
    const testString = 'someSubString';
    subMsg.setString(testString);
    int64Map.set(64, subMsg);
    expect(
      msgWebGrpc
        .getMapInt64SubMap()
        .get(64)
        ?.getString(),
    ).toEqual(testString);
  });

  it('should correctly produce protobuf JSON for non-repeated fields', () => {
    const notNullValues = new dataTypes.TestMessage({
      bool: true,
      bytes: new Uint8Array(),
      double: 12.3,
      float: 12.3,
      enum: dataTypes.TestEnum.value1,
      fixed32: 12,
      fixed64: '12',
      int32: 12,
      int64: '12',
      string: 'abc12',
      oneofstring: 'abc12',
      mapBoolString: {
        [1]: 'true',
      },
      mapInt64Sub: {
        [2]: new dataTypes.TestSubMessage({ string: 'str' }),
      },
      mapStringString: {
        ['key']: 'value',
      },
      uint32: 12,
      uint64: '12',
      subMessage: new dataTypes.TestSubMessage({
        string: 'test',
      }),
    });

    expect(notNullValues.toProtobufJSON()).toEqual({
      bool: true,
      bytes: '',
      double: 12.3,
      float: 12.3,
      enum: 'value1',
      fixed32: 12,
      fixed64: '12',
      int32: 12,
      int64: '12',
      string: 'abc12',
      oneofstring: 'abc12',
      oneofenum: null,
      mapBoolString: {
        1: 'true',
      },
      mapInt64Sub: {
        2: {
          string: 'str',
        },
      },
      mapStringString: {
        key: 'value',
      },
      uint32: 12,
      uint64: '12',
      subMessage: {
        string: 'test',
      },
    });

    const nullValues = new dataTypes.TestMessage();

    expect(nullValues.toProtobufJSON()).toEqual({
      bool: false,
      bytes: '',
      double: 0,
      float: 0,
      enum: 'value0',
      fixed32: 0,
      fixed64: '0',
      int32: 0,
      int64: '0',
      string: '',
      mapBoolString: {},
      mapInt64Sub: {},
      mapStringString: {},
      uint32: 0,
      uint64: '0',
      oneofenum: null,
      oneofstring: null,
      subMessage: null,
    });
  });

  it('should correctly produce protobuf JSON for repeated fields', () => {
    const msg = new dataTypes.RepeatedTestMessage({
      bool: [true],
      bytes: [new Uint8Array()],
      double: [12.3],
      float: [12.3],
      enum: [dataTypes.TestEnum.value1],
      fixed32: [12],
      fixed64: ['12'],
      int32: [12],
      int64: ['12'],
      string: ['abc12'],
      uint32: [12],
      uint64: ['12'],
      subMessage: [new dataTypes.TestSubMessage({ string: 'test' })],
    });

    expect(msg.toProtobufJSON()).toEqual({
      bool: [true],
      bytes: [''],
      double: [12.3],
      float: [12.3],
      enum: ['value1'],
      fixed32: [12],
      fixed64: ['12'],
      int32: [12],
      int64: ['12'],
      string: ['abc12'],
      uint32: [12],
      uint64: ['12'],
      subMessage: [{ string: 'test' }],
    });
  });


});
