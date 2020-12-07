import 'jest';
import * as oneOf from '../out/oneof.pb';

describe('data-types.proto', () => {

  it('should create OneofTest', () => {
    const msg = oneOf.OneofTest.deserializeBinary('');

    expect(msg instanceof oneOf.OneofTest).toBeTruthy();
  });

  it('should assign "none" to the enum getter if no value is given', () => {
    const msg = oneOf.OneofTest.deserializeBinary('');

    expect(msg.oneOf).toBe(oneOf.OneofTest.OneOfCase.none);
    expect(msg.testString).toBeUndefined();
    expect(msg.testMessage).toBeUndefined();
  });

  it('should assign a proper enum type to the enum getter and nullify others after new assignment', () => {
    const msg = oneOf.OneofTest.deserializeBinary('');

    msg.testString = '123';

    expect(msg.oneOf).toBe(oneOf.OneofTest.OneOfCase.testString);
    expect(msg.testString).toBe('123');
    expect(msg.testInt).toBeUndefined();
    expect(msg.testMessage).toBeUndefined();

    const message = new oneOf.OneofTestSub();

    msg.testMessage = message;

    expect(msg.oneOf).toBe(oneOf.OneofTest.OneOfCase.testMessage);
    expect(msg.testString).toBeUndefined();
    expect(msg.testMessage).toBe(message);
  });

  it('should handle int64 correctly', () => {
    const msg = new oneOf.OneofTest({ testInt: '0' });
    expect(msg.oneOf).toBe(oneOf.OneofTest.OneOfCase.testInt);
    expect(msg.testInt).toBe('0');
    expect(msg.testString).toBeUndefined();
    expect(msg.testMessage).toBeUndefined();
  });
});
