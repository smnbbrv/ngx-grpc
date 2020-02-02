# ngx-grpc

Angular gRPC framework.

| Package                                                                                | Workflow status                                                                                                                                                                            | Changelog                                                                       |
|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [@ngx-grpc/core](https://github.com/ngx-grpc/ngx-grpc/projects/core)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/core)                                    | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/common](https://github.com/ngx-grpc/ngx-grpc/projects/common)               | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/common)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker](https://github.com/ngx-grpc/ngx-grpc/projects/worker)               | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker)                                  | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/worker-client](https://github.com/ngx-grpc/ngx-grpc/projects/worker-client) | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/ngx-grpc/Publish) ![Npm version](https://img.shields.io/npm/v/@ngx-grpc/worker-client)                           | [Changelog](https://github.com/ngx-grpc/ngx-grpc/blob/master/CHANGELOG.md)      |
| [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/protoc-gen-ng)                   | ![Workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/protoc-gen-ng/Push) ![@ngx-grpc/protoc-gen-ng npm version](https://img.shields.io/npm/v/@ngx-grpc/protoc-gen-ng) | [Changelog](https://github.com/ngx-grpc/protoc-gen-ng/blob/master/CHANGELOG.md) |

## Features

- two-way binding thanks to properties instead of Java-like setters / getters
- client services are wired to Angular's dependency injection
- rxjs first-class support
- typescript first-class support
- interceptors
- logging, including simple console logger and [grpc-web-devtools Chrome extension](https://github.com/SafetyCulture/grpc-web-devtools) support
- web worker (experimental)
- easy to install, update and support thanks to npm packages

## Requirements

- install `protoc` if you have none yet: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).
- backend needs to be configured according to [grpc-web documentation](https://github.com/grpc/grpc-web).

## Installation

In your Angular project:

```sh
npm i -S @ngx-grpc/common @ngx-grpc/core google-protobuf grpc-web
npm i -D @ngx-grpc/protoc-gen-ng @types/google-protobuf
```

Where:

- [@ngx-grpc/common](https://github.com/ngx-grpc/common) contains common reusable types for other ngx-grpc packages
- [@ngx-grpc/core](https://github.com/ngx-grpc/core) contains angular specific implementation
- [@ngx-grpc/worker](https://github.com/ngx-grpc/core) contains worker gRPC implementation
- [@ngx-grpc/worker-client](https://github.com/ngx-grpc/core) contains Angular connector for the worker
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

### Messages

Every message has `toObject()` and `toJSON()` methods which could be used to cast message to the normal JavaScript object.

To cast a JavaScript object to a message just pass it to the constructor: `new Message(myObject)`.

As a side effect: just pass an instance of message to `new Message()` constructor and it will be deeply cloned.

### Interceptors

You can add global interceptors to all gRPC calls exactly like Angular's built-in `HttpClient` interceptors.

#### Console logger

Here is an example of interceptor that implements a simple console logger:

```ts
import { GrpcHandler, GrpcInterceptor, GrpcRequest } from '@ngx-grpc/core';
import { Status } from 'grpc-web';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class GrpcWebConsoleLoggerInterceptor implements GrpcInterceptor {

  intercept<REQ, RES>(request: GrpcRequest<REQ, RES>, next: GrpcHandler): Observable<RES | Status> {
    const start = Date.now();

    return next.handle(request).pipe(
      tap(response => {
        const style = 'color: #5c7ced; font-weight: bold;';

        setTimeout(() => {
          console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, style);
          console.log('%c>>', style, { ...request.requestData });
          console.log('%c<<', style, { ...response });
          console.groupEnd();
        });
      }),
      catchError(error => {
        const style = 'color: red; font-weight: bold;';

        setTimeout(() => {
          console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, style);
          console.log('%c>>', style, { ...request.requestData });
          console.error('%c<<', style, error);
          console.groupEnd();
        });

        return throwError(error);
      }),
    );
  }

}
```

#### gRPC-Web Devtools

Here is an example of interceptor that implements [grpc-web-devtools Chrome extension](https://github.com/SafetyCulture/grpc-web-devtools) support for unary requests:

```ts
import { GrpcCallType, GrpcHandler, GrpcInterceptor, GrpcRequest } from '@ngx-grpc/core';
import { Status } from 'grpc-web';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class GrpcWebDevtoolsInterceptor implements GrpcInterceptor {

  intercept<REQ, RES>(request: GrpcRequest<REQ, RES>, next: GrpcHandler): Observable<RES | Status> {
    // TODO avoid in production, because postMessage to '*' might be dangerous
    return next.handle(request).pipe(
      tap(response => {
        if (request.type === GrpcCallType.unary) {
          window.postMessage({
            type: '__GRPCWEB_DEVTOOLS__',
            method: request.path,
            methodType: 'unary',
            request: request.requestData,
            response,
          }, '*');
        }
      }),
      catchError(error => {
        if (request.type === GrpcCallType.unary) {
          window.postMessage({
            type: '__GRPCWEB_DEVTOOLS__',
            method: request.path,
            methodType: 'unary',
            request: request.requestData,
            error,
          }, '*');
        }

        return throwError(error);
      }),
    );
  }

}
```

Then provide this interceptor (again like Angular's built-in interceptors):

```ts
{
  providers: [
    { provide: GRPC_INTERCEPTORS, useClass: GrpcWebDevtoolsInterceptor, multi: true },
  ]
}
```

And you will be able to see the calls in the extension.

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
