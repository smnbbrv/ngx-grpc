import { GrpcMessagePool } from '@ngx-grpc/common';
import 'jest';
import { TestMessage } from '../../out/data-types.pb';
import { Any } from '../../out/google/protobuf/any.pb';
import { Empty } from '../../out/google/protobuf/empty.pb';
import { Timestamp } from '../../out/google/protobuf/timestamp.pb';
import { TestRequest } from '../../out/no-package.pb';

describe('Any', () => {

  let testAny: Any;

  it('should parse typeUrl and return message id', () => {
    testAny = new Any();
    expect(testAny.getPackedMessageId()).toBeNull();

    testAny = Any.pack(new Empty());
    expect(testAny.getPackedMessageId()).toBe('google.protobuf.Empty');

    testAny = Any.pack(new TestMessage({ string: 'someString' }));
    expect(testAny.getPackedMessageId()).toBe('test.datatypes.TestMessage');

    testAny = Any.pack(new TestRequest({ message: 'someMessage' }));
    expect(testAny.getPackedMessageId()).toBe('TestRequest');
  });

  it('should create Any by packing a message', () => {
    testAny = new Any();
    expect(testAny.typeUrl).toBe('');

    testAny = Any.pack(new Empty());
    expect(testAny.typeUrl).toBe('type.googleapis.com/google.protobuf.Empty');
    expect(Empty.deserializeBinary(testAny.value || new Uint8Array()).toObject()).toEqual({});

    testAny = Any.pack(new TestMessage({ string: 'someString' }));
    expect(testAny.typeUrl).toBe('type.googleapis.com/test.datatypes.TestMessage');
    expect(TestMessage.deserializeBinary(testAny.value || new Uint8Array()).string).toBe('someString');

    testAny = Any.pack(new TestRequest({ message: 'someMessage' }));
    expect(testAny.typeUrl).toBe('type.googleapis.com/TestRequest');
    expect(TestRequest.deserializeBinary(testAny.value || new Uint8Array()).message).toBe('someMessage');
  });

  it('should pack into existing Any', () => {
    testAny = new Any();

    testAny.pack(new Empty());
    expect(testAny.typeUrl).toBe('type.googleapis.com/google.protobuf.Empty');
    expect(Empty.deserializeBinary(testAny.value || new Uint8Array()).toObject()).toEqual({});

    testAny.pack(new TestMessage({ string: 'someString' }));
    expect(testAny.typeUrl).toBe('type.googleapis.com/test.datatypes.TestMessage');
    expect(TestMessage.deserializeBinary(testAny.value || new Uint8Array()).string).toBe('someString');

    testAny.pack(new TestRequest({ message: 'someMessage' }));
    expect(testAny.typeUrl).toBe('type.googleapis.com/TestRequest');
    expect(TestRequest.deserializeBinary(testAny.value || new Uint8Array()).message).toBe('someMessage');
  });

  it('should find message in pool', () => {
    const pool = new GrpcMessagePool([Empty, TestMessage, TestRequest]);

    testAny = new Any();
    expect(testAny.getPackedMessageType(pool)).toBe(null);

    testAny = Any.pack(new Empty());
    expect(testAny.getPackedMessageType(pool)).toBe(Empty);

    testAny = Any.pack(new TestMessage({ string: 'someString' }));
    expect(testAny.getPackedMessageType(pool)).toBe(TestMessage);

    testAny = Any.pack(new TestRequest({ message: 'someMessage' }));
    expect(testAny.getPackedMessageType(pool)).toBe(TestRequest);

    testAny = Any.pack(new Timestamp()); // the type not provided in GrpcMessagePool
    expect(() => testAny.getPackedMessageType(pool)).toThrow();
  });

  it('should unpack', () => {
    const pool = new GrpcMessagePool([Empty, TestMessage, TestRequest]);

    testAny = Any.pack(new Empty());
    expect(testAny.unpack<Empty>(pool)).toEqual({});

    testAny = Any.pack(new TestMessage({ string: 'someString' }));
    expect(testAny.unpack<TestMessage>(pool).string).toBe('someString');

    testAny = Any.pack(new TestRequest({ message: 'someMessage' }));
    expect(testAny.unpack<TestRequest>(pool).message).toBe('someMessage');

    testAny = Any.pack(new Timestamp()); // the type not provided in GrpcMessagePool
    expect(() => testAny.unpack<Timestamp>(pool)).toThrow();
  });

});

