import * as structGoogle from 'google-protobuf/google/protobuf/struct_pb';
import 'jest';
import * as struct from '../out/google/protobuf/struct.pb';

describe('struct.proto', () => {
  it('should serialize non-trivial scalar values consistentl wiht web-grpc', () => {
    const msg = new struct.Struct({
      fields: {
        someDouble: new struct.Value({
          numberValue: 3,
        }),
        someString: new struct.Value({
          stringValue: 'someStringValue',
        }),
        someBool: new struct.Value({
          boolValue: true,
        }),
      },
    });

    expect(msg.fields?.someDouble.numberValue).toEqual(3);
    expect(msg.fields?.someString.stringValue).toEqual('someStringValue');
    expect(msg.fields?.someBool.boolValue).toEqual(true);

    const msgWebGrpc = structGoogle.Struct.deserializeBinary(
      msg.serializeBinary(),
    );

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someDouble')
        ?.getNumberValue(),
    ).toEqual(3);

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someString')
        ?.getStringValue(),
    ).toEqual('someStringValue');

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someBool')
        ?.getBoolValue(),
    ).toEqual(true);

    // finally, use the convenience method provided by google's supplied struct_pb
    // to convert the struct to json directly and check that everything
    // is as expected
    const convertedToJson = msgWebGrpc.toJavaScript();

    expect(convertedToJson).toEqual({
      someDouble: 3,
      someString: 'someStringValue',
      someBool: true,
    });
  });

  it('should serialize trivial scalar values consistentl wiht web-grpc', () => {
    const msg = new struct.Struct({
      fields: {
        someNull: new struct.Value({
          nullValue: struct.NullValue.NULL_VALUE,
        }),
        someDouble: new struct.Value({
          numberValue: 0,
        }),
        someString: new struct.Value({
          stringValue: '',
        }),
        someBool: new struct.Value({
          boolValue: false,
        }),
      },
    });

    expect(msg.fields?.someDouble.numberValue).toEqual(0);
    expect(msg.fields?.someString.stringValue).toEqual('');
    expect(msg.fields?.someBool.boolValue).toEqual(false);

    const msgWebGrpc = structGoogle.Struct.deserializeBinary(
      msg.serializeBinary(),
    );

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someDouble')
        ?.getNumberValue(),
    ).toEqual(0);

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someString')
        ?.getStringValue(),
    ).toEqual('');

    expect(
      msgWebGrpc
        .getFieldsMap()
        .get('someBool')
        ?.getBoolValue(),
    ).toEqual(false);

    // finally, use the convenience method provided by google's supplied struct_pb
    // to convert the struct to json directly and check that everything
    // is as expected
    const convertedToJson = msgWebGrpc.toJavaScript();

    expect(convertedToJson).toEqual({
      someNull: null,
      someDouble: 0,
      someString: '',
      someBool: false,
    });
  });
});
