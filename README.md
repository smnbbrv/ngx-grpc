# ngx-grpc

Angular gRPC framework.

| [@ngx-grpc/core](https://github.com/ngx-grpc/core)                   | ![@ngx-grpc/core workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/core/Publish) ![@ngx-grpc/core npm version](https://img.shields.io/npm/v/@ngx-grpc/core)                                  |
|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [@ngx-grpc/protoc-gen-ng](https://github.com/ngx-grpc/protoc-gen-ng) | ![@ngx-grpc/protoc-gen-ng workflow status](https://img.shields.io/github/workflow/status/ngx-grpc/protoc-gen-ng/Push) ![@ngx-grpc/protoc-gen-ng npm version](https://img.shields.io/npm/v/@ngx-grpc/protoc-gen-ng) |

## Features

- two-way binding thanks to properties instead of Java-like setters / getters
- client services are wired to Angular's dependency injection
- rxjs first-class support
- typescript first-class support
- interceptors
- logging, including simple console logger and [grpc-web-devtools Chrome extension](https://github.com/SafetyCulture/grpc-web-devtools) support
- easy to install, update and support thanks to npm packages

## Requirements

- install `protoc` if you have none yet: [guide](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).
- backend needs to be configured according to [grpc-web documentation](https://github.com/grpc/grpc-web).

## Installation

In your Angular project:

```sh
npm i -S @ngx-grpc/core google-protobuf grpc-web
npm i -D @ngx-grpc/protoc-gen-ng @types/google-protobuf
```

Where:

- [@ngx-grpc/core](https://github.com/ngx-grpc/core) adds angular specific implementation
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
    "proto:generate": "protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=./src/proto -I ../proto ../proto/**/*.proto"
  }
}
```

Finally, run `npm run proto:generate` every time you want to (re)generate the code

## Usage

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

## Global installation of protoc-gen-ng

`@ngx-grpc/protoc-gen-ng` could also be installed globally with `-g`. It simplifies the generate call:

```sh
protoc --plugin=protoc-gen-grpc_ng --ng_out=<OUTPUT_PATH> -I <PROTO_DIR_PATH> <PROTO_FILES>
```

however it's version will not anyhow be connected to the particular project (and it is if it is installed locally as proposed above).

## Not implemented (yet)

[Proto 3 Any](https://developers.google.com/protocol-buffers/docs/proto3#any) and [Proto 2 Extensions](https://developers.google.com/protocol-buffers/docs/proto#extensions)

## License

MIT
