import { Server, ServerCredentials } from 'grpc';
import { EchoServiceServiceImpl } from './echo.service';
import { EchoServiceService } from './proto/echo_grpc_pb';

const port = 6852;
const server = new Server();

server.addService(EchoServiceService, new EchoServiceServiceImpl());

server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure());
server.start();

console.log(`Server started on port ${port}`);
