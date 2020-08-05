import 'jest';
import * as empty from '../out/google/protobuf/empty.pb';

describe('empty.proto', () => {
  it('should compile with no errors', () => {
    const msg = new empty.Empty();

    expect(msg.toObject()).toEqual({});
  });
});
