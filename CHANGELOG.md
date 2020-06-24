## [0.4.3](https://github.com/ngx-grpc/ngx-grpc/compare/v0.4.2...v0.4.3) (2020-06-24)


### Bug Fixes

* **grpc-web-client:** handle breaking changes of grpc-web@1.2.0 ([1d931ce](https://github.com/ngx-grpc/ngx-grpc/commit/1d931ce1a605015fb9d443cc3d8ccd781312d8a3))
* **worker:** handle breaking changes of grpc-web@1.2.0 ([db9d21d](https://github.com/ngx-grpc/ngx-grpc/commit/db9d21d364dfb237f67ced8264c5d5dec0572078))

## [0.4.2](https://github.com/ngx-grpc/ngx-grpc/compare/v0.4.1...v0.4.2) (2020-06-09)


### Features

* **core:** add GrpcConsoleLoggerInterceptor ([55c78ab](https://github.com/ngx-grpc/ngx-grpc/commit/55c78ab485f25d205707b120f7102af0472e56cc))

## [0.4.1](https://github.com/ngx-grpc/ngx-grpc/compare/v0.4.0...v0.4.1) (2020-06-08)


### Bug Fixes

* fix grpc-web-client not being published ([e445a20](https://github.com/ngx-grpc/ngx-grpc/commit/e445a2027f2d4286f803bfad97c424dae3935622))

# [0.4.0](https://github.com/ngx-grpc/ngx-grpc/compare/v0.3.1...v0.4.0) (2020-06-08)


### Features

* **grpc-web-client:** separate grpc-web-client into a separate library; add global configuration support ([bfc5fc1](https://github.com/ngx-grpc/ngx-grpc/commit/bfc5fc1fe9e08ea701589b8d9c0032fd5775da73))
* **worker:** add global configuration support ([dbe2921](https://github.com/ngx-grpc/ngx-grpc/commit/dbe2921e21a28b15a99b8cb0537d1f17895ffb54))


### BREAKING CHANGES

* **grpc-web-client:** GrpcStandardClientFactory and GrpcStandardClient are renamed to GrpcWebClientFactory and GrpcWebClient correspondingly and moved to @ngx-grpc/grpc-web-client

## [0.3.1](https://github.com/ngx-grpc/ngx-grpc/compare/v0.3.0...v0.3.1) (2020-02-18)


### Bug Fixes

* **worker:** add missing zero-status for unary events ([1208f8c](https://github.com/ngx-grpc/ngx-grpc/commit/1208f8c76c07e54851d1c308dbd9ff6c54f9d0f4))

# [0.3.0](https://github.com/ngx-grpc/ngx-grpc/compare/v0.2.0...v0.3.0) (2020-02-17)


### Bug Fixes

* **worker:** use proper Error object from grpc-web for error responses ([a58be0e](https://github.com/ngx-grpc/ngx-grpc/commit/a58be0e636f0eb22be409f6440e84ac55aabbd57))


### Features

* **common:** add grpc events ([803ac13](https://github.com/ngx-grpc/ngx-grpc/commit/803ac1322936321dd81a56bc3683f9916ac9dbbc))
* **common:** change GrpcClient method definitions to always emit GrpcEvent ([c8237a1](https://github.com/ngx-grpc/ngx-grpc/commit/c8237a17caba15ea666c175430ba1785823fa511))
* **core:** add rxjs operators for better development experience with event streams ([ed9c100](https://github.com/ngx-grpc/ngx-grpc/commit/ed9c100910b76a634e80f23ddb66874e10cac164))
* **core:** change GrpcHandler, GrpcStandardClient and GrpcInterceptor to use new response type GrpcEvent ([e454301](https://github.com/ngx-grpc/ngx-grpc/commit/e45430146da07972a1ec9558413050defca3ba43))
* **worker-client:** rework GrpcWorkerClient and gateway to emit GrpcEvent ([aa7ef7e](https://github.com/ngx-grpc/ngx-grpc/commit/aa7ef7e677c382bff14584213da8edfbe362147d))


### BREAKING CHANGES

* **core:** all existing interceptors should be adapted to use event streams
* **common:** all GrpcClient implementations should be adapted to implement new response type

# [0.2.0](https://github.com/ngx-grpc/ngx-grpc/compare/v0.1.5...v0.2.0) (2020-02-02)


### Features

* **common:** create package @ngx-grpc/common ([ebfb4a1](https://github.com/ngx-grpc/ngx-grpc/commit/ebfb4a10ee65080dd0a43c2700293f2d88f5f0dd))
* **core:** add GRPC_CLIENT_FACTORY to define which client implementation should be used ([72d7b46](https://github.com/ngx-grpc/ngx-grpc/commit/72d7b46d0efe5571d1b80c4220a6207364c0a303))
* **worker:** create packate @ngx-grpc/worker ([a2b4a21](https://github.com/ngx-grpc/ngx-grpc/commit/a2b4a21a8b495aabb020da41eceb70a237f9eb79))
* **worker-client:** create packate @ngx-grpc/worker-client ([0cf896b](https://github.com/ngx-grpc/ngx-grpc/commit/0cf896bd871fee231f04aff608658fad6e708a3a))


### BREAKING CHANGES

* **core:** GRPC_CLIENT_FACTORY must be provided. GrpcClient is renamed to GrpcStandardClient
* **common:** GrpcClient, GrpcClientSettings, GrpcCallType, GrpcRequest, GrpcMessageClass, GrpcMessage and RecursivePartial are not anymore available in  @ngx-grpc/core

## [0.1.5](https://github.com/ngx-grpc/core/compare/v0.1.4...v0.1.5) (2020-01-13)


### Bug Fixes

* remove restriction of RecursivePartial for maps ([97c29fe](https://github.com/ngx-grpc/core/commit/97c29fef3dc96c357e22026eb9c9dbca5cac7314))

## [0.1.4](https://github.com/ngx-grpc/core/compare/v0.1.3...v0.1.4) (2020-01-13)


### Features

* add RecursivePartial type ([20ede2b](https://github.com/ngx-grpc/core/commit/20ede2b0b0c4b138edfda890f0420af24409a870))

## [0.1.3](https://github.com/ngx-grpc/core/compare/v0.1.2...v0.1.3) (2020-01-10)


### Bug Fixes

* properly export grpc-message ([f27724a](https://github.com/ngx-grpc/core/commit/f27724a4452f6be7a7f947db8d16f2cfb6803b70))

## [0.1.2](https://github.com/ngx-grpc/core/compare/v0.1.1...v0.1.2) (2020-01-10)


### Features

* add grpc message definition ([335f2a7](https://github.com/ngx-grpc/core/commit/335f2a71750fc4ea79ceb351c766c18431e409f8))

## [0.1.1](https://github.com/ngx-grpc/core/compare/v0.1.0...v0.1.1) (2019-12-18)


### Bug Fixes

* pass error handling to the result observable in serverStream ([f3921ea](https://github.com/ngx-grpc/core/commit/f3921ea7e6df9886415e8f20b15e1240b1ba6aab))
