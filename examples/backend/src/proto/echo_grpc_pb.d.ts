// package: echo
// file: echo.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as echo_pb from "./echo_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IEchoServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    echoOnce: IEchoServiceService_IEchoOnce;
    echoStream: IEchoServiceService_IEchoStream;
}

interface IEchoServiceService_IEchoOnce extends grpc.MethodDefinition<echo_pb.EchoRequest, echo_pb.EchoResponse> {
    path: string; // "/echo.EchoService/EchoOnce"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<echo_pb.EchoRequest>;
    requestDeserialize: grpc.deserialize<echo_pb.EchoRequest>;
    responseSerialize: grpc.serialize<echo_pb.EchoResponse>;
    responseDeserialize: grpc.deserialize<echo_pb.EchoResponse>;
}
interface IEchoServiceService_IEchoStream extends grpc.MethodDefinition<echo_pb.EchoRequest, echo_pb.EchoResponse> {
    path: string; // "/echo.EchoService/EchoStream"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<echo_pb.EchoRequest>;
    requestDeserialize: grpc.deserialize<echo_pb.EchoRequest>;
    responseSerialize: grpc.serialize<echo_pb.EchoResponse>;
    responseDeserialize: grpc.deserialize<echo_pb.EchoResponse>;
}

export const EchoServiceService: IEchoServiceService;

export interface IEchoServiceServer {
    echoOnce: grpc.handleUnaryCall<echo_pb.EchoRequest, echo_pb.EchoResponse>;
    echoStream: grpc.handleServerStreamingCall<echo_pb.EchoRequest, echo_pb.EchoResponse>;
}

export interface IEchoServiceClient {
    echoOnce(request: echo_pb.EchoRequest, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    echoOnce(request: echo_pb.EchoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    echoOnce(request: echo_pb.EchoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    echoStream(request: echo_pb.EchoRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<echo_pb.EchoResponse>;
    echoStream(request: echo_pb.EchoRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<echo_pb.EchoResponse>;
}

export class EchoServiceClient extends grpc.Client implements IEchoServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public echoOnce(request: echo_pb.EchoRequest, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    public echoOnce(request: echo_pb.EchoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    public echoOnce(request: echo_pb.EchoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: echo_pb.EchoResponse) => void): grpc.ClientUnaryCall;
    public echoStream(request: echo_pb.EchoRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<echo_pb.EchoResponse>;
    public echoStream(request: echo_pb.EchoRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<echo_pb.EchoResponse>;
}
