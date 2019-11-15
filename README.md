# ngrpc

gRPC Angular code generator based on [grpc-web](https://github.com/grpc/grpc-web).

**Work in progress: breaking changes possible.**

## Features

- two-way binding thanks to properties instead of Java-like setters / getters
- client services are bound to dependency injection
- rxjs first-class support
- typescript first-class support
- JSDoc comments incl. `@deprecated` option for properties and [rpc / methods](https://stackoverflow.com/a/43380742/1990451). [Example](test/proto/deprecated.proto)
- easy to install and update thanks to npm package

## Installation

Installation consists of two parts

### Globally

Step 1. Install the plugin

```sh
npm i -g protoc-gen-ng
```

Step 2. Install `protoc` if you have none yet: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).

### In your Angular project

Install runtime dependencies:

```sh
npm i -S google-protobuf grpc-web
npm i -D @types/google-protobuf
```

- `google-protobuf` is required to encode / decode messages
- `grpc-web` implements the transport

### Configure your backend

Due to the browsers' limitations you would need to configure a special proxy in order to access your gRPC services.

Please configure your proxy according to [grpc-web docs](https://github.com/grpc/grpc-web#proxy-interoperability).

## Usage

### Generate code

Add to your `package.json` the following script:

```json
  "scripts": {
    ...
    "proto:generate": "protoc --plugin=protoc-gen-grpc_ng --ng_out=<OUTPUT_PATH> -I <PROTO_DIR_PATH> <PROTO_FILES>"
    ...
  }
```

Modify it as follows:

- `OUTPUT_PATH` - the path your code will be generated
- `PROTO_DIR_PATH` - the root path of your proto files
- `PROTO_FILES` - list of proto files to use

Example:

```json
  "scripts": {
    ...
    "proto:generate": "protoc --plugin=protoc-gen-grpc_ng --ng_out=./src/proto -I ../proto ../proto/*"
    ...
  }
```

### Configure the clients

Every service has an injected configuration. You can create those services manually or use them as native Angular services.

To use them as Angular services, provide the configuration in your AppModule.

E.g. for a service `TestServiceClient` you need to provide the `GRPC_TEST_SERVICE_CLIENT_SETTINGS`:

```ts
@NgModule({
  // ...
  providers: [
    // ...
    // the name of the token can be found in corresponding service constructor
    { provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080' } },
    // or use value from environment.ts
    // { provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: environment.host } },
    // ...
  ],
  // ...
})
export class AppModule {
}
```

## Not implemented (yet)

- [Imports](https://developers.google.com/protocol-buffers/docs/proto3#importing-definitions)
- [Oneof](https://developers.google.com/protocol-buffers/docs/proto3#oneof)
- [Any](https://developers.google.com/protocol-buffers/docs/proto3#any)

## Related

[proto 3](https://developers.google.com/protocol-buffers/docs/proto3#simple)
[grpc-web](https://github.com/grpc/grpc-web)
[google-protobuf](https://github.com/protocolbuffers/protobuf)

## License

MIT
