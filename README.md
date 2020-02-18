# ngx-grpc

Angular gRPC framework.

| Package                                                                                | Workflow status                                                                                                                                                                            | Changelog                                                                       |
|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [@ngx-grpc/core](https://github.com/ngx-grpc/ngx-grpc/packages/core)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/core)                                    | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/common](https://github.com/ngx-grpc/ngx-grpc/packages/common)               | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/common)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker](https://github.com/ngx-grpc/ngx-grpc/packages/worker)               | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker-client](https://github.com/ngx-grpc/ngx-grpc/packages/worker-client) | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker-client)                           | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/protoc-gen-ng)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/protoc-gen-ng/Push) ![@ngx-grpc/protoc-gen-ng npm version](https://img.shields.io/npm/v/@ngx-grpc/protoc-gen-ng) | [Changelog](https://github.com/ngx-grpc/protoc-gen-ng/blob/master/CHANGELOG.md) |

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

> The example requires docker & docker-compose to be installed

Clone this repository and run `npm ci` in the root directory. This will install all required dependencies.

Then, in separate terminal sessions run

- `npm run examples:basic` starts the basic example Angular app with standard client
- `npm run examples:worker` starts the example Angular app which uses worker client
- `npm run examples:backend` starts the backend and envoy proxy using docker-compose

Run one of the applications and the backend and open your browser at [http://localhost:4200/](http://localhost:4200/).

The source code for the examples could be found at [examples](examples) directory.

## Installation

First ensure that you

- have installed `protoc`: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).
- configured your backend / grpc-web proxy according to [grpc-web documentation](https://github.com/grpc/grpc-web).

Then in your Angular project's root directory run

```sh
npm i -S @ngx-grpc/common @ngx-grpc/core google-protobuf grpc-web
npm i -D @ngx-grpc/protoc-gen-ng @types/google-protobuf
```

Where:

- [@ngx-grpc/common](https://github.com/ngx-grpc/common) contains common reusable types for other ngx-grpc packages
- [@ngx-grpc/core](https://github.com/ngx-grpc/core) contains angular specific implementation
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
    { provide: GRPC_CLIENT_FACTORY, useClass: GrpcStandardClientFactory },
  ],
})
export class AppModule {
}
```

### Service clients configuration

Every service has an injected configuration which could be found e.g. in the corresponding `*.pbconf.ts` file.

E.g. for a service `TestServiceClient` you need to provide the `GRPC_TEST_SERVICE_CLIENT_SETTINGS`:

```ts
@NgModule({
  // ...
  providers: [
    // ...
    // the name of the token can be found in corresponding service constructor
    // uses default grpcwebtext format
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

To set grpcweb / binary proto format use

```ts
{ provide: GRPC_TEST_SERVICE_CLIENT_SETTINGS, useValue: { host: 'http://localhost:8080', format: 'binary' } },
```

From now on this particular service is set.

It's also handy to move configuration of all the services to a different module's `providers` section and import this module into the `AppModule`.

### Service clients methods

Each RPC has two corresponding methods, the first emits messages, the second - events. E.g. for `rpc Echo(...)` there would be the following:

- `echo(...)` - returns `Observable` of messages and throws errors in case of non-zero status codes. This is the most common use-case
- `echo$eventStream(...)` - returns `Observable` of `GrpcEvent`s. Events could be of two kinds: `GrpcDataEvent` containing the message inside and `GrpcStatusEvent` containing gRPC status response. Apart from the returned data type there is important difference in the behaviour. There are no errors thrown in this stream (by design). All errors are considered to be normal `GrpcStatusEvent`s. Furthermore, this method is the only one where it is anyhow possible to read the gRPC status code `0` (`OK`) metadata. This method is not that comfortable to use in every place, but it can do things that are not achievable with the method above.

There are two custom RxJS operators that could be used on the stream to make it easier:

- `throwStatusErrors` - searches for the non-zero status codes and throws them as errors
- `takeMessages` - searches for the messages

For usage example look at any of your generated `.pbsc.ts` file. In fact, those two operators turn `echo$eventStream()` into `echo()` from example above.

### Messages

Every message has `toObject()` and `toJSON()` methods which could be used to cast message to the normal JavaScript object.

To cast a JavaScript object to a message just pass it to the constructor: `new Message(myObject)`.

As a side effect: just pass an instance of message to `new Message()` constructor and it will be deeply cloned.

### Interceptors

You can add global interceptors to all gRPC calls like Angular's built-in `HttpClient` interceptors.

The important difference is that unlike `HttpClient` interceptors `GrpcInterceptor`s need to work with event streams; there are no errors thrown. Instead you should listen to the `GrpcStatusEvent` and decide whether it is an error or not. Please keep this in mind.

As an example see `GrpcConsoleLoggerInterceptor` below.

### Console logger

Here is an example of interceptor that implements a simple console logger:

```ts
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { GrpcHandler, GrpcInterceptor } from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const GRPC_CONSOLE_LOGGER_ENABLED = new InjectionToken('GRPC_CONSOLE_LOGGER_ENABLED');

@Injectable()
export class GrpcConsoleLoggerInterceptor implements GrpcInterceptor {

  private dataStyle = 'color: #5c7ced;';
  private errorStyle = 'color: red;';

  constructor(@Inject(GRPC_CONSOLE_LOGGER_ENABLED) private enabled: boolean) { }

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {
    if (this.enabled) {
      const start = Date.now();

      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof GrpcDataEvent) {
            console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, this.dataStyle);
            console.log('%c>>', this.dataStyle, request.requestData.toObject());
            console.log('%c**', this.dataStyle, request.requestMetadata);
            console.log('%c<<', this.dataStyle, event.data.toObject());
            console.groupEnd();
          } else if (event.code !== 0) {
            console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, this.errorStyle);
            console.log('%c>>', this.errorStyle, request.requestData.toObject());
            console.error('%c<<', this.errorStyle, event);
            console.groupEnd();
          }
        }),
      );
    }

    return next.handle(request);
  }

}
```

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

Finally, provide worker client factory instead of the standard one and provide your worker

```ts
@NgModule({
  providers: [
    // replace standard client factory
    // { provide: GRPC_CLIENT_FACTORY, useClass: GrpcStandardClientFactory },
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
