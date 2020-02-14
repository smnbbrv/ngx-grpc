import { Metadata, sendUnaryData, ServerUnaryCall, ServerWritableStream, ServiceError, status } from 'grpc';
import { IEchoServiceServer } from './proto/echo_grpc_pb';
import { EchoRequest, EchoResponse } from './proto/echo_pb';

export class EchoServiceServiceImpl implements IEchoServiceServer {

  echoStream = async (call: ServerWritableStream<EchoRequest>) => {
    const message = call.request.getMessage();

    console.log(`Received message: ${message}`);

    await Promise.all([1, 2, 3, 4, 5].map(n => {
      return new Promise(res => {
        setTimeout(() => {
          const messageBack = `Modified ${message}: ${n}`;

          console.log(`Responding with: ${messageBack}`);

          const response = new EchoResponse();

          response.setMessage(messageBack);

          call.write(response);

          call.emit('error', { code: status.UNAUTHENTICATED, message: 'Please auth!!!' });
        }, n * 1000);
      });
    }));

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

      callback({ code: status.ALREADY_EXISTS, details: 'hz', metadata } as ServiceError, null, trailer);

      return;
    }

    const response = new EchoResponse();
    const messageBack = `Modified ${message}`;

    response.setMessage(messageBack);

    console.log(`Responding with: ${messageBack}`);

    callback(null, response);
  }

}
