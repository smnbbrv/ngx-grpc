# ngx-grpc

Angular gRPC framework.

![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Push) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/core)

[Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)

## Features

- two-way-binding-friendly thanks to custom protobuf messages implementation (instead of Java-like setters / getters in original google-protobuf)
- client services are wired to Angular's dependency injection
- rxjs first-class support
- typescript first-class support
- interceptors
- simple console logger
- support for well-known types, including `Any`
- support for [JSON mappings](https://developers.google.com/protocol-buffers/docs/proto3#json)
- @improbable-eng/grpc-web client implementation (experimental)
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

Now open your browser at [http://localhost:4200/](http://localhost:4200/). The source code could be found at [examples](examples) directory.

## Installation

First ensure that you

- installed `protoc`: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).
- configured your backend / grpc-web proxy according to [grpc-web documentation](https://github.com/grpc/grpc-web).

Then in your Angular project's root directory run

```sh
npm i -S @ngx-grpc/common @ngx-grpc/core @ngx-grpc/grpc-web-client @ngx-grpc/well-known-types google-protobuf grpc-web
npm i -D @ngx-grpc/protoc-gen-ng @types/google-protobuf
```

Where:

- [@ngx-grpc/common](https://github.com/ngx-grpc/ngx-grpc/tree/master/packages/common) contains common reusable types for other ngx-grpc packages
- [@ngx-grpc/core](https://github.com/ngx-grpc/ngx-grpc/tree/master/packages/core) contains angular specific implementation
- [@ngx-grpc/grpc-web-client](https://github.com/ngx-grpc/ngx-grpc/tree/master/packages/grpc-web-client) provides a client based on [grpc-web](https://github.com/grpc/grpc-web)
- [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/ngx-grpc/tree/master/packages/protoc-gen-ng) generates the code based on your proto files
- [@ngx-grpc/well-known-types](https://github.com/ngx-grpc/ngx-grpc/tree/master/packages/well-known-types) contains well-known types
- [google-protobuf](https://github.com/protocolbuffers/protobuf/tree/master/js) is required to encode / decode the messages
- [grpc-web](https://github.com/grpc/grpc-web) implements the transport between the browser and grpc proxy

Also you can choose between alternative client implementations:

- @ngx-grpc/grpc-web-client - based on [grpc-web](https://github.com/grpc/grpc-web)
- @ngx-grpc/improbable-eng-grpc-web-client - alternative client implementation based on [@improbable-eng/grpc-web](https://github.com/improbable-eng/grpc-web)
- @ngx-grpc/worker-client - similar to @ngx-grpc/grpc-web-client but running in worker

## Generate the code

### MacOS / Linux

Add `proto:generate` script to your `package.json` `scripts` section:

```json
{
  "scripts": {
    "proto:generate": "protoc --plugin=protoc-gen-ng=$(which protoc-gen-ng) --ng_out=<OUTPUT_PATH> -I <PROTO_DIR_PATH> <PROTO_FILES>"
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
    "proto:generate": "protoc --plugin=protoc-gen-ng=$(which protoc-gen-ng) --ng_out=./src/proto -I ../proto $(find ../proto -iname \"*.proto\")"
  }
}
```

Finally, run `npm run proto:generate` every time you want to (re)generate the code

### Advanced generator config

You can have more control on what and how is being generated. Create a `ngx-grpc.conf.js` (`.json` format also supported) file in your project root.

E.g. to generate well-known types in your project instead of using `@ngx-grpc/well-known-types`, use this config:

```js
module.exports = {
  embedWellKnownTypes: true,
};
```

More details on the configuration properties and their default values see [here](https://github.com/ngx-grpc/ngx-grpc/blob/master/packages/protoc-gen-ng/src/config.ts).

Then update your package.json command with path to this file `config=./ngx-grpc.conf.js`:

```json
{
  "scripts": {
    "proto:generate": "protoc --plugin=protoc-gen-ng=$(which protoc-gen-ng) --ng_out=config=./ngx-grpc.conf.js:./src/proto -I ../proto $(find ../proto -iname \"*.proto\")"
  }
}
```

### Windows

Unfortunately the way to generate files on Windows slightly differs. Here is a sophisticated example that shows how to scan windows folder with proto files and pass it to protoc-gen-ng.

```json
{
  "scripts": {
    "proto:generate:win": "for /f %G in ('dir /b ..\\proto\\*.proto') do grpc_tools_node_protoc --plugin=protoc-gen-ng=.\\node_modules\\.bin\\protoc-gen-ng.cmd --ng_out=.\\output\\path -I ..\\proto ..\\proto\\%G",
  }
}
```

## Usage

### Import the required modules

In general, you need to import at least

- GrpcCoreModule
- GrpcWebClientModule (or another client implementation, see below)

```ts
@NgModule({
  imports: [
    GrpcCoreModule.forRoot(),
    GrpcWebClientModule.forRoot({
      settings: { host: 'http://localhost:8080' },
    }),
  ],
})
export class AppModule {}
```

You also can define them in child modules by using `forChild()` methods instead of `forRoot()`.

### Per-service clients configuration

Instead of configuring the client settings globally you can configure them per-service. Every service has an injected configuration which could be found e.g. in the corresponding `*.pbconf.ts` file.

E.g. for a service `TestServiceClient` you need to provide the `GRPC_TEST_SERVICE_CLIENT_SETTINGS`:

```ts
@NgModule({
  providers: [
    { provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080' } as GrpcWebClientSettings },
  ],
})
export class AppModule {}
```

To set grpcweb / binary proto format use

```ts
{ provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080', format: 'binary' } as GrpcWebClientSettings },
```

From now on this particular service is set.

It's also handy to move configuration of all the services to a different module's `providers` section and import this module into the `AppModule`.

### Service client methods

Each RPC has two corresponding methods.

- the first, that emits messages, is a direct method of the service client.
- the second, that emits events, is scoped into service client property `$raw`. 

E.g. for `rpc Echo(...)` there would be the following:

- `echo(...)` - returns `Observable` of messages and throws errors in case of non-zero status codes. This is the most common use-case
- `.$raw.echo(...)` - returns `Observable` of `GrpcEvent`s. Events could be of two kinds: `GrpcDataEvent` containing the message inside and `GrpcStatusEvent` containing gRPC status response. Apart from the returned data type there is important difference in the behaviour. There are no errors thrown in this stream (by design). All errors are considered to be normal `GrpcStatusEvent`s. Furthermore, this method is the only one where it is anyhow possible to read the gRPC status code `0` (`OK`) metadata. This method is not that comfortable to use in every place, but it can do things that are not achievable with the method above.

There are two custom RxJS operators that could be used on the stream to make it easier:

- `throwStatusErrors` - searches for the non-zero status codes and throws them as errors
- `takeMessages` - searches for the messages

For usage example look at any of your generated `.pbsc.ts` file. In fact, those two operators turn the raw method into a 'normal' one.

### Messages

To create a new message just pass its initial values to the constructor: `new Message(myInitialValues)`. Here is some information on the message's methods:

- `constructor` - accepts a message or an object with initial values. All values are safely / deeply cloned.
- `toObject()` - casts message *as is* to a normal JavaScript object
- `toJSON()` - convenience method to be able to pass message to `JSON.stringify(msg)`
- `toProtobufJSON()` - constructs a [protobuf-defined JSON](https://developers.google.com/protocol-buffers/docs/proto3#json). Accepts an optional `GrpcMessagePool` (see `google.protobuf.Any` section) which is required only if the message or some of its descendants embeds `google.protobuf.Any`

### Well-known types

The well-known types are served as a separate package. If you want to generate the well-known types together with your proto definitions (like older versions did) just pass `generateWellKnownTypes=true` as the protoc plugin options.

Some types have additional functionality, see below.

#### google.protobuf.Any

The `google.protobuf.Any` has additional methods `pack` and `unpack`.

Unpacking the message requires a special message pool `GrpcMessagePool` where the expected message types are listed; otherwise the unpacking would not be possible.

Example of type-safe unpacking:

```ts
// we expect one of 3 message types to be packed into Any
const myAny: Any;
const pool = new GrpcMessagePool([Empty, Timestamp, MyMessage]);

try {
  switch(myAny.getPackedMessageType(pool)) {
    case Empty: console.log('Empty found', myAny.unpack<Empty>(pool)); break;
    case Timestamp: console.log('Timestamp found', myAny.unpack<Timestamp>(pool)); break;
    case MyMessage: console.log('MyMessage found', myAny.unpack<MyMessage>(pool)); break;
    default: console.log('No packed message inside');
  }
} catch (ex) {
  console.error('Something went wrong, e.g. packed message definition is not in the pool');
}
```

#### google.protobuf.Timestamp

The `google.protobuf.Timestamp` has additional methods to cast from / to `Date` and ISO string date representation.

### Interceptors

You can add global interceptors to all gRPC calls like Angular's built-in `HttpClient` interceptors.

The important difference is that unlike `HttpClient` interceptors `GrpcInterceptor`s need to work with event streams; there are no errors thrown. Instead you should listen to the `GrpcStatusEvent` and decide whether it is an error or not. Please keep this in mind.

As an example see `GrpcLoggerInterceptor` [in the core package](packages/core/src/lib/grpc-console-logger-interceptor.ts).

### Logger

You can enable logging using `GrpcLoggerInterceptor` (provided by @ngx-grpc/core). Add to your `AppModule` the following import:

```ts
GrpcLoggerModule.forRoot(),
```

Then open the browser console and you should see all the requests and responses in a readable format.

Optionally, you can provide provide the more detailed configuration as `GRPC_LOGGER_SETTINGS`. Example:

```ts
GrpcLoggerModule.forRoot({ 
  provide: GRPC_LOGGER_SETTINGS, 
  useValue: { 
     // enables logger in dev mode and still lets you see them in production when running `localStorage.setItem('logger', 'true') in the console`
    enabled: localStorage.getItem('logger') === 'true' || !environment.prod,
     // protobuf json is more human-readable than the default toObject() mapping
     // please beware: if you use google.protobuf.Any you must pass the proper `messagePool` argument
    requestMapper: (msg: GrpcMessage) => msg.toProtobufJSON(),
    responseMapper: (msg: GrpcMessage) => msg.toProtobufJSON(),
  } as GrpcLoggerSettings
}),
```

## Alternative client / @improbable-eng/grpc-web-client

The alternative grpc-web implementation from [Improbable Engineering](https://github.com/improbable-eng) provides way more features than standard grpc-web from Google. It supports [various transports](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/transport.md) including WebSocket-based and even Node (can be useful e.g. for SSR).

Installation:

```sh
npm i -S @ngx-grpc/improbable-eng-grpc-web @improbable-eng/grpc-web
```

Then configuration is similar to the other clients:

```ts
import { grpc } from '@improbable-eng/grpc-web';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { ImprobableEngGrpcWebClientModule } from '@ngx-grpc/improbable-eng-grpc-web-client';

@NgModule({
  imports: [
    GrpcCoreModule.forRoot(),
    ImprobableEngGrpcWebClientModule.forRoot({
      settings: {
        host: 'http://localhost:8080',
        transport: grpc.CrossBrowserHttpTransport({}),
      },
    }),
  ],
})
export class AppModule {}
```

Choose your transport and provide it as a part of the settings. Now you are set.

## Web worker

Web worker allows to run gRPC clients, messages serialization and deserialization in a separate thread. It might give some performance benefits on large data sets; however the main reason of the worker is to avoid blocking the main thread. That means that rendering engine has more resources to work on rendering while the messages processing is done in parallel.

First, install additional packages:

```sh
npm i -S @ngx-grpc/worker @ngx-grpc/worker-client
```

Then configure the web worker. First you need to adapt the code generation settings (see above) to generate `pbwsc` files. These files will contain the worker service client definitions.

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

Finally use the following imports:

```ts
@NgModule({
  imports: [
    GrpcCoreModule.forRoot(),
    GrpcWorkerClientModule.forRoot({
      worker: () => new Worker('./grpc.worker', { type: 'module' }),
      settings: { host: 'http://localhost:8080' },
    }),
  ],
})
export class AppModule {
}
```

That's it. All your requests are served by worker.

## Not implemented (yet)

[Proto 2 Extensions](https://developers.google.com/protocol-buffers/docs/proto#extensions)

## License

MIT
