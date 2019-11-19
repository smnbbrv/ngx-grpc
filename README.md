# ngx-grpc

Angular gRPC framework.

**Work in progress: breaking changes possible.**

## Features

- two-way binding thanks to properties instead of Java-like setters / getters
- client services are wired to Angular's dependency injection
- rxjs first-class support
- typescript first-class support
- interceptors
- [grpc-web-devtools Chrome extension](https://github.com/SafetyCulture/grpc-web-devtools) support
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
    "proto:generate": "protoc --plugin=protoc-gen-ng=./node_modules/.bin/protoc-gen-ng --ng_out=./src/proto -I ../proto ../proto/*"
  }
}
```

Finally, run `npm run proto:generate` every time you want to (re)generate the code

## Usage

### Service clients configuration

Every service has an injected configuration which could be found in the beginning of generated file or at each service client's constructor.

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

From now on this particular service is set.

It's also handy to move configuration of all the services to a different module's `providers` section and import this module into the `AppModule`.

### Interceptors

You can add global interceptors to all gRPC calls exactly like Angular's built-in `HttpClient` interceptors. Here is an example of interceptor that implements [grpc-web-devtools Chrome extension](https://github.com/SafetyCulture/grpc-web-devtools) support for unary requests:

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

Proto 3:

- [Oneof](https://developers.google.com/protocol-buffers/docs/proto3#oneof)
- [Any](https://developers.google.com/protocol-buffers/docs/proto3#any)

Proto 2:

Most of its functionality works. However the proto 2 is currently not going to be supported.

## Related

- [proto 3 guide](https://developers.google.com/protocol-buffers/docs/proto3)

## License

MIT
