import 'jest';
import { Timestamp } from '../../out/google/protobuf/timestamp.pb';

describe('Timestamp', () => {

  it('should create Timestamp from date', () => {
    let timestamp = Timestamp.fromDate(new Date(0));

    expect(timestamp instanceof Timestamp).toBeTruthy();
    expect(timestamp.seconds).toBe('0');
    expect(timestamp.nanos).toBe(0);

    timestamp = Timestamp.fromDate(new Date(946684800015));

    expect(timestamp instanceof Timestamp).toBeTruthy();
    expect(timestamp.seconds).toBe('946684800');
    expect(timestamp.nanos).toBe(15000000);
  });

  it('should create Timestamp from ISO date / string', () => {
    let timestamp = Timestamp.fromISOString('1970-01-01T00:00:00.000Z');

    expect(timestamp instanceof Timestamp).toBeTruthy();
    expect(timestamp.seconds).toBe('0');
    expect(timestamp.nanos).toBe(0);

    timestamp = Timestamp.fromISOString('2000-01-01T00:00:00.015Z');

    expect(timestamp instanceof Timestamp).toBeTruthy();
    expect(timestamp.seconds).toBe('946684800');
    expect(timestamp.nanos).toBe(15000000);
  });

});
