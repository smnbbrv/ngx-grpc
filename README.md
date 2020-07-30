# ngx-grpc

Angular gRPC framework.

| Package                                                                                    | Workflow status                                                                                                                                                                            | Changelog                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [@ngx-grpc/core](https://github.com/ngx-grpc/ngx-grpc/packages/core)                       | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/core)                                    | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/common](https://github.com/ngx-grpc/ngx-grpc/packages/common)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/common)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/grpc-web-client](https://github.com/ngx-grpc/ngx-grpc/packages/grpc-web-client) | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/grpc-web-client)                         | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker](https://github.com/ngx-grpc/ngx-grpc/packages/worker)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker-client](https://github.com/ngx-grpc/ngx-grpc/packages/worker-client)     | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker-client)                           | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/protoc-gen-ng)                       | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/protoc-gen-ng/Push) ![@ngx-grpc/protoc-gen-ng npm version](https://img.shields.io/npm/v/@ngx-grpc/protoc-gen-ng) | [Changelog](https://github.com/ngx-grpc/protoc-gen-ng/blob/master/CHANGELOG.md) |

## Features

- two-way binding thanks to properties instead of Java-like setters / getters
- client services are wired to Angular's dependency injection
- rxjs first-class support
- typescript first-class support
- interceptors
- simple console logger
- web worker (experimental)
- easy to install, update and support thanks to npm packages

## Example

> The example requires protoc, docker & docker-compose to be installed

Clone this repository and run

```
npm ci
npm run build
npm run examples
```

Now you can see following examples:

- basic grpc-web-client example at [http://localhost:4201/](http://localhost:4201/)
- worker-client example at [http://localhost:4202/](http://localhost:4202/)

The source code for the examples could be found at [examples](examples) directory.

## Installation

First ensure that you

- installed `protoc`: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).
- configured your backend / grpc-web proxy according to [grpc-web documentation](https://github.com/grpc/grpc-web).

Then in your Angular project's root directory run

```sh
npm i -S @ngx-grpc/common @ngx-grpc/core @ngx-grpc/grpc-web-client google-protobuf grpc-web
npm i -D @ngx-grpc/protoc-gen-ng @types/google-protobuf
```

Where:

- [@ngx-grpc/common](https://github.com/ngx-grpc/common) contains common reusable types for other ngx-grpc packages
- [@ngx-grpc/core](https://github.com/ngx-grpc/core) contains angular specific implementation
- [@ngx-grpc/grpc-web-client](https://github.com/ngx-grpc/grpc-web-client) provides a client based on [grpc-web](https://github.com/grpc/grpc-web)
- [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/protoc-gen-ng) generates the code based on your proto files
- [google-protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) is required to encode / decode the messages
- [grpc-web](https://github.com/grpc/grpc-web) implements the transport between the browser and grpc proxy

## Generate the code

Add `proto:generate` script to your `package.json` `scripts` section:

```json
{
  "scripts": {
    "proto:generate": "protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=<OUTPUT_PATH> -I <PROTO_DIR_PATH> <PROTO_FILES>"
  }
}
```

Where:

- `OUTPUT_PATH` - the directory your code will be generated at (please ensure the directory exists, otherwise you'll have a `protoc` error)
- `PROTO_DIR_PATH` - the root path of your proto files
- `PROTO_FILES` - list of proto files to use

Example:

```json
{
  "scripts": {
    "proto:generate": "protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=./src/proto -I ../proto $(find ../proto -iname \"*.proto\")"
  }
}
```

Finally, run `npm run proto:generate` every time you want to (re)generate the code

## Usage

### Provide the client factory

```ts
@NgModule({
  providers: [
    { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory },
  ],
})
export class AppModule {}
```

### Global clients configuration

If you set `GRPC_WEB_CLIENT_DEFAULT_SETTINGS` all the services will use the configuration you provide. 

```ts
@NgModule({
  providers: [
    { provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: { host: 'http://localhost:8080' } as GrpcClientSettings },
  ],
})
export class AppModule {}
```

You can override the settings for each service (see below).

### Per-service clients configuration

Every service has an injected configuration which could be found e.g. in the corresponding `*.pbconf.ts` file.

E.g. for a service `TestServiceClient` you need to provide the `GRPC_TEST_SERVICE_CLIENT_SETTINGS`:

```ts
@NgModule({
  providers: [
    // the name of the token can be found in corresponding service constructor
    // uses default grpcwebtext format
    { provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080' } as GrpcClientSettings },
    // or use value from environment.ts
    // { provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: environment.host } as GrpcClientSettings },
  ],
})
export class AppModule {}
```

To set grpcweb / binary proto format use

```ts
{ provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080', format: 'binary' } as GrpcClientSettings },
```

From now on this particular service is set.

It's also handy to move configuration of all the services to a different module's `providers` section and import this module into the `AppModule`.

### Service clients methods

Each RPC returns `UnaryRpcRef` or `ServerStreamRpcRef` with the following properties:

- `data`: `Observable` of messages and throws errors in case of non-zero status codes. This is the most common use-case
- `events`: `Observable` of `GrpcEvent`s. Events could be of two kinds: `GrpcDataEvent` containing the message inside and `GrpcStatusEvent` containing gRPC status response. Apart from the returned data type there is important difference in the behaviour. There are no errors thrown in this stream (by design). All errors are considered to be normal `GrpcStatusEvent`s. Furthermore, this method is the only one where it is anyhow possible to read the gRPC status code `0` (`OK`) metadata. This method is not that comfortable to use in every place, but it can do things that are not achievable with the method above.

The RPC calls are lazy: the calls are triggered only after `data` or `events` gets subscribed.

There are two custom RxJS operators that could be used on the stream to make it easier:

- `throwStatusErrors` - searches for the non-zero status codes and throws them as errors
- `takeMessages` - returns only extracted messages from events


### Messages

Every message has `toObject()` and `toJSON()` methods which could be used to cast message to the normal JavaScript object.

To cast a JavaScript object to a message just pass it to the constructor: `new Message(myObject)`.

As a side effect: just pass an instance of message to `new Message()` constructor and it will be deeply cloned.

### Interceptors

You can add global interceptors to all gRPC calls like Angular's built-in `HttpClient` interceptors.

The important difference is that unlike `HttpClient` interceptors `GrpcInterceptor`s need to work with event streams; there are no errors thrown. Instead you should listen to the `GrpcStatusEvent` and decide whether it is an error or not. Please keep this in mind.

As an example see `GrpcConsoleLoggerInterceptor` [in the core package](packages/core/src/lib/grpc-console-logger-interceptor.ts).

### Console logger

You can enable loggin using `GrpcConsoleLoggerInterceptor` (provided by @ngx-grpc/core).

To enable it provide it as interceptor and provide the parameter `GRPC_CONSOLE_LOGGER_ENABLED` in your app.module.ts.

Example:

```ts
{ provide: GRPC_CONSOLE_LOGGER_ENABLED, useFactory: () => localStorage.getItem('GRPC_CONSOLE_LOGGER_ENABLED') === 'true' || !environment.prod },
{ provide: GRPC_INTERCEPTORS, useClass: GrpcConsoleLoggerInterceptor, multi: true },
```

## Web worker

Web worker allows to run gRPC clients, messages serialization and deserialization in a separate thread. It might give some performance benefits on large data sets; however the main reason of the worker is to avoid blocking the main thread. That means that rendering engine has more resources to work on rendering while the messages processing is done in parallel.

First, install additional packages:

```sh
npm i -S @ngx-grpc/worker @ngx-grpc/worker-client
```

Then configure the web worker. First you need to adapt the code generation command from above to pass the parameter `worker=true:`:

```json
{
  "scripts": {
    "proto:generate": "protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=worker=true:<OUTPUT_PATH> -I <PROTO_DIR_PATH> <PROTO_FILES>"
  }
}
```

It will additionally generate `*.pbwsc.ts` files containing the worker service client definitions.

Now, generate the worker (angular cli), e.g. with the name `grpc`:

```sh
ng g webWorker grpc
```

or for Angular < 9

```sh
ng g worker grpc
```

You should see `grpc.worker.ts` close to your `app.module.ts`. Open this file and replace the contents with the following:

```ts
/// <reference lib="webworker" />

import { GrpcWorker } from '@ngx-grpc/worker';
import { GrpcWorkerEchoServiceClientDef } from '../proto/echo.pbwsc';

const worker = new GrpcWorker();

worker.register(
  // register here all the service clients definitions
  GrpcWorkerEchoServiceClientDef,
);

worker.start();
```

Finally, provide worker client factory instead of the grpc-web-client and provide your worker

```ts
@NgModule({
  providers: [
    // replace grpc-web client factory
    // { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory },
    // with GrpcWorkerClientFactory
    { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
    // and wire your worker
    { provide: GRPC_WORKER, useFactory: () => new Worker('./grpc.worker', { type: 'module' }) },
  ],
})
export class AppModule {
}
```

That's it. All your requests are served by worker.

## Not implemented (yet)

[Proto 3 Any](https://developers.google.com/protocol-buffers/docs/proto3#any) and [Proto 2 Extensions](https://developers.google.com/protocol-buffers/docs/proto#extensions)

## License

MIT
