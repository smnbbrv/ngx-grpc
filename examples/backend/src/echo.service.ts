import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Metadata, sendUnaryData, ServerUnaryCall, ServerWritableStream, ServiceError, status } from 'grpc';
import { IEchoServiceServer } from './proto/echo_grpc_pb';
import { EchoRequest, EchoResponse } from './proto/echo_pb';

function createTimestamp(date: Date) {
  const ts = new Timestamp();

  ts.fromDate(date);

  return ts;
}

export class EchoServiceServiceImpl implements IEchoServiceServer {

  echoStream = async (call: ServerWritableStream<EchoRequest>) => {
    const message = call.request.getMessage();

    console.log(`Received message: ${message}`);

    for (let i = 0; i < 5; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (call.cancelled) {
            console.log('Request is cancelled');
            reject();

            return;
          }

          const messageBack = `Response ${i + 1} for "${message}"`;

          console.log(`Responding with: ${messageBack}`);

          const response = new EchoResponse();

          response.setMessage(messageBack);
          response.setTimestamp(createTimestamp(new Date()));

          call.write(response);

          if (call.request.getShouldthrow()) {
            call.emit('error', { code: status.INTERNAL, message: 'Internal error' });

            reject();
            return;
          }

          resolve();
        }, 1000);
      });
    }

    const meta = new Metadata();

    meta.set('x-custom-header-1', 'bla');

    call.end(meta);
  }

  echoOnce = (call: ServerUnaryCall<EchoRequest>, callback: sendUnaryData<EchoResponse>) => {
    const message = call.request.getMessage();

    console.log(`Received message: ${message}`);

    if (call.request.getShouldthrow()) {
      const trailer = new Metadata();

      trailer.set('x-custom-header-1', 'wow');

      const metadata = new Metadata();

      trailer.set('x-custom-header-1', 'wow,');

      callback({ code: status.INTERNAL, details: 'Internal error', metadata } as ServiceError, null, trailer);

      return;
    }

    const response = new EchoResponse();
    const messageBack = `Response for "${message}"`;

    response.setMessage(messageBack);
    response.setTimestamp(createTimestamp(new Date()));

    console.log(`Responding with: ${messageBack}`);

    callback(null, response);
  }

}
