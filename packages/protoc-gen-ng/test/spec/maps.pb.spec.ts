import 'jest';
import * as maps from '../out/maps.pb';

describe('maps.proto', () => {
  it('should create and toObject the maps with messages', () => {
    const msg = new maps.MessageWithMap({
      mapStringMsg: {
        key2: new maps.MapSubMessage(),
      }
    });

    expect(msg.toObject()).toEqual({
      mapStringBytes: {},
      mapStringString: {},
      mapStringMsg: {
        key2: {
          string: '',
        },
      },
    });
  });
});
