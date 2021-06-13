# [2.3.0](https://github.com/ngx-grpc/ngx-grpc/compare/v2.2.0...v2.3.0) (2021-06-13)


### Features

* **protoc-gen-ng:** add support for proto3 optional bytes and string ([d2367a6](https://github.com/ngx-grpc/ngx-grpc/commit/d2367a64d1e1ca98fc2362dfbca97273acab593d))

# [2.2.0](https://github.com/ngx-grpc/ngx-grpc/compare/v2.1.0...v2.2.0) (2021-06-02)


### Features

* **protoc-gen-ng:** add support for proto3 optional primitives ([6184c5a](https://github.com/ngx-grpc/ngx-grpc/commit/6184c5ab8e5dccfdd568ced21d7a3b4de4041844))

# [2.1.0](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.4...v2.1.0) (2021-04-09)


### Bug Fixes

* **well-known-types:** fix constructor parameter type ([75f1155](https://github.com/ngx-grpc/ngx-grpc/commit/75f1155b3e4ae0977050ebe73170a6f68faf3de8))


### Features

* **protoc-gen-ng:** use google-protobuf plugin data source instead of third-party proto-plugin package ([7b327b8](https://github.com/ngx-grpc/ngx-grpc/commit/7b327b8224469c685175cc6aecb39ff11f66b40f))

# [2.1.0](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.4...v2.1.0) (2021-04-09)


### Bug Fixes

* **well-known-types:** fix constructor parameter type ([75f1155](https://github.com/ngx-grpc/ngx-grpc/commit/75f1155b3e4ae0977050ebe73170a6f68faf3de8))


### Features

* **protoc-gen-ng:** use google-protobuf plugin data source instead of third-party proto-plugin package ([7b327b8](https://github.com/ngx-grpc/ngx-grpc/commit/7b327b8224469c685175cc6aecb39ff11f66b40f))

## [2.0.4](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.3...v2.0.4) (2021-01-20)


### Bug Fixes

* **protoc-gen-ng:** fix test of map with int64 key ([eb3310b](https://github.com/ngx-grpc/ngx-grpc/commit/eb3310b496d69e3265a33808edd95a1ebf57312e))
* **protoc-gen-ng:** handle map int64/uin64 key as string ([53b3616](https://github.com/ngx-grpc/ngx-grpc/commit/53b36162d0f141ebe601792e8a814c065654f365))

## [2.0.3](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.2...v2.0.3) (2020-12-07)


### Bug Fixes

* fix GrpcMessageClass constructor ([ad0c695](https://github.com/ngx-grpc/ngx-grpc/commit/ad0c695eadc5f4acceea8f5aab8c024acc7e01e7))

## [2.0.2](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.1...v2.0.2) (2020-12-07)


### Bug Fixes

* **common:** fix uint8ArrayToBase64 implementation ([a36104d](https://github.com/ngx-grpc/ngx-grpc/commit/a36104d3c97daf768290d0c7476241dfaf757160))
* **protoc-gen-ng:** use `AsObject` type as constructor argument instead of a message type, closes [#37](https://github.com/ngx-grpc/ngx-grpc/issues/37) ([834811f](https://github.com/ngx-grpc/ngx-grpc/commit/834811f326a027a2ef4e7fdbfce50bec20a7b0f7))
* `oneof` binary types which are strings are now handled as expected. ([f4d5401](https://github.com/ngx-grpc/ngx-grpc/commit/f4d5401979905d3862341ba538a09a54cbff4b92))

## [2.0.1](https://github.com/ngx-grpc/ngx-grpc/compare/v2.0.0...v2.0.1) (2020-12-01)


### Bug Fixes

* **grpc-web-client:** properly create errors metadata ([462a5e4](https://github.com/ngx-grpc/ngx-grpc/commit/462a5e439c0644545568db71a929192a27568534))
* **improbable-eng-grpc-web-client:** use proper name to publish the package ([29f2af4](https://github.com/ngx-grpc/ngx-grpc/commit/29f2af46ee16853af504d58357adb4266dded753))

# [2.0.0](https://github.com/ngx-grpc/ngx-grpc/compare/v1.0.4...v2.0.0) (2020-11-26)


### Bug Fixes

* **core:** add missing request metadata for logger errors ([32ea435](https://github.com/ngx-grpc/ngx-grpc/commit/32ea4351a9dcbc9929f760805760df06e60b38d9))
* **grpc-web-client:** use MethodDescriptor instead of deprecated MethodInfo ([3ef868e](https://github.com/ngx-grpc/ngx-grpc/commit/3ef868edbad405121d732c409ecff73426f083a5))
* **grpc-worker:** use MethodDescriptor instead of deprecated MethodInfo ([a4d5444](https://github.com/ngx-grpc/ngx-grpc/commit/a4d5444ccf91e09c403434e30a6ca07c64be8469))
* **protoc-gen-ng:** do not re-export js modules and care of duplicate dependencies ([99c592b](https://github.com/ngx-grpc/ngx-grpc/commit/99c592bd54a2382c742d353ef7903777ead21ff9))
* **protoc-gen-ng:** properly initialize and cast to object the maps with message as value, close [#29](https://github.com/ngx-grpc/ngx-grpc/issues/29) ([a6d4568](https://github.com/ngx-grpc/ngx-grpc/commit/a6d4568a30bcf0be7040e8ff861e72aabf8f3823))


### Features

* **common:** add withCredentials flag to GrpcClientSettings, close [#30](https://github.com/ngx-grpc/ngx-grpc/issues/30) ([e4645f8](https://github.com/ngx-grpc/ngx-grpc/commit/e4645f818e89e1b3fc3fce13ccba509df5c5eacd))
* **core:** add advanced logger settings, shortening the logger service and its corresponding types names; the logger is enabled by default ([7bbf215](https://github.com/ngx-grpc/ngx-grpc/commit/7bbf215ff6b1034705e1cbd547ab639a89190ca2))
* **core:** add client settings to the logger output, close [#21](https://github.com/ngx-grpc/ngx-grpc/issues/21) ([dfe019a](https://github.com/ngx-grpc/ngx-grpc/commit/dfe019ae1188efafdfa4f9ddedb17c243a72b790))
* **protoc-gen-ng:** add configuration file support ([7d753b8](https://github.com/ngx-grpc/ngx-grpc/commit/7d753b87d2a7b7bad3ae4de1f6fa6a19674b6aef))
* **protoc-gen-ng:** add support for jstype field option ([dae4e6a](https://github.com/ngx-grpc/ngx-grpc/commit/dae4e6aa455d2802339d3149db4a04acdc6fe20d))
* add @improbable-eng/grpc-web client implementation ([4d0a2ff](https://github.com/ngx-grpc/ngx-grpc/commit/4d0a2ffffab209ec0b35beb88326857805796f17))
* add child / lazy / feature modules support, close [#18](https://github.com/ngx-grpc/ngx-grpc/issues/18) ([ec2e7aa](https://github.com/ngx-grpc/ngx-grpc/commit/ec2e7aa047627285e4bfe2d3739c16754c5c0c1c))
* add method `getSettings` to each client's implementation ([ec1995d](https://github.com/ngx-grpc/ngx-grpc/commit/ec1995d3f5fd46fd7e9227f6809ac0b96ec489e9))
* add protobuf JSON mapping implementation and full support of google.protobuf.Any ([718edf6](https://github.com/ngx-grpc/ngx-grpc/commit/718edf6a95be5dba61a8985adfdbc1b66a9c05ed))
* move all well-known types to a separate package @ngx-grpc/well-known-types, close [#15](https://github.com/ngx-grpc/ngx-grpc/issues/15) ([c8360ea](https://github.com/ngx-grpc/ngx-grpc/commit/c8360eab9c5f752385cd20189ab9d4be07101e63))
* reduce service client clutter by moving all raw (former $eventStream) methods under a $raw property ([f16d58c](https://github.com/ngx-grpc/ngx-grpc/commit/f16d58c0050ea806577901375afefc661f3ef066))
* remove GrpcClientSettings in favour of having the settings defined by each client implementation ([259e658](https://github.com/ngx-grpc/ngx-grpc/commit/259e6581e6cf318a513cd7945026566c3dd42f55))
* update all dependencies ([cdf7d82](https://github.com/ngx-grpc/ngx-grpc/commit/cdf7d824155697f6142a816b61192f34ee0a224e))
* use class GrpcMetadata instead of metadata hashmap ([d081377](https://github.com/ngx-grpc/ngx-grpc/commit/d08137714df58d383085f14a7f414c2cb5e67d76))


### BREAKING CHANGES

* $eventStream methods are moved to $raw property
* metadata is not a hashmap anymore, use GrpcMetadata instead. GrpcStatusEvent properties code and details are renamed to statusCode and statusMessage correspondingly
* The way to configure the project has been changed. Use corresponding modules for core, logger and client implementations. All services are injected with `providedIn: 'any'` instead of 'root'. If you want to change this behaviour use corresponding generator setting
* **protoc-gen-ng:** `worker=true` compiler argument is removed; the same configuration can be achieved within the config file
* GrpcClientSettings is removed, use the specific client settings instead; e.g. GrpcWebClientSettings or GrpcWorkerClientSettings for corresponding clients
* **core:** GRPC_CONSOLE_LOGGER_ENABLED is removed in favour of more general GRPC_LOGGER_SETTINGS. The logger is renamed to GrpcLoggerInterceptor. By default, the logger is enabled (before it was disabled by default).
* all well-known types are served with separate package that needs to be installed with `npm i @ngx-grpc/well-known-types`. If you want to keep the old behaviour, use generateWellKnownTypes plugin option
* **protoc-gen-ng:** messages re-exports are no longer available, use direct imports instead

## [1.0.4](https://github.com/ngx-grpc/ngx-grpc/compare/v1.0.3...v1.0.4) (2020-10-09)


### Bug Fixes

* **protoc-gen-ng:** properly handle explicit [packed=false] fields ([5abae75](https://github.com/ngx-grpc/ngx-grpc/commit/5abae75e5f01cc5bbedf65203e9732b53c12f88d))

## [1.0.3](https://github.com/ngx-grpc/ngx-grpc/compare/v1.0.2...v1.0.3) (2020-10-05)


### Bug Fixes

* **protoc-gen-ng:** fix recursive public imports & fix possible import duplication, see [#13](https://github.com/ngx-grpc/ngx-grpc/issues/13) ([d60dffd](https://github.com/ngx-grpc/ngx-grpc/commit/d60dffd071f1c583c89245e3b4681d64879c448f))

## [1.0.2](https://github.com/ngx-grpc/ngx-grpc/compare/v1.0.1...v1.0.2) (2020-09-17)


### Bug Fixes

* **protoc-gen-ng:** properly handle packed fields, close [#19](https://github.com/ngx-grpc/ngx-grpc/issues/19) ([45c630d](https://github.com/ngx-grpc/ngx-grpc/commit/45c630d60bcef10740ee267099fbe14d9b371e84))

## [1.0.1](https://github.com/ngx-grpc/ngx-grpc/compare/v1.0.0...v1.0.1) (2020-08-05)


### Bug Fixes

* **protoc-gen-ng:** add support of strict typescript compiler options: noUnusedParameters, noImplicitReturns, noImplicitThis and noUnusedLocals, closes [#9](https://github.com/ngx-grpc/ngx-grpc/issues/9) ([a90af3f](https://github.com/ngx-grpc/ngx-grpc/commit/a90af3f580de0d0659bba4d4dc970d176c01d7e1))

# [1.0.0](https://github.com/ngx-grpc/ngx-grpc/compare/v0.4.3...v1.0.0) (2020-08-02)


### Bug Fixes

* **core:** handle non-multi interceptors configuration ([e3fa1bf](https://github.com/ngx-grpc/ngx-grpc/commit/e3fa1bf0eb830a009ded661ebaa8c5e207768b0a))
* **protoc-gen-ng:** properly clone maps in initialization and toObject functions ([3b0844b](https://github.com/ngx-grpc/ngx-grpc/commit/3b0844ba08fc1e63dea05ad5b103d5bf43f4ea96))


### Features

* **core:** add types documentation ([896ea98](https://github.com/ngx-grpc/ngx-grpc/commit/896ea98684dd1c96e6c534e28f47cf2e6cb22e51))
* rename serialize / deserialize methods to be compliant wit h corresponding methods in standard protobuf message ([161dd38](https://github.com/ngx-grpc/ngx-grpc/commit/161dd384e44efed55635406ce91b141651d426cb))
* **common:** add types documentation ([1f162f0](https://github.com/ngx-grpc/ngx-grpc/commit/1f162f0bcaeb12f58842b04e1395e17f5ece7a26))
* upgrade to angular 10 ([0236ca7](https://github.com/ngx-grpc/ngx-grpc/commit/0236ca7bd84c990fd881fa89b891ca2d3ed55840))
* **grpc-web-client:** add types documentation ([ca8ae41](https://github.com/ngx-grpc/ngx-grpc/commit/ca8ae41b0561a0c14c7c72bb0bce66fef514c6be))
* **protoc-gen-ng:** add AsObject interface for each message type and use it as toObject() return type, closes [#5](https://github.com/ngx-grpc/ngx-grpc/issues/5) ([3afeec4](https://github.com/ngx-grpc/ngx-grpc/commit/3afeec4a9f3c5ea3353271e9bf2d6146c1207ff4))
* **protoc-gen-ng:** extend generated types documentation ([6d74d52](https://github.com/ngx-grpc/ngx-grpc/commit/6d74d52e522ca483df74abf089a8f68ecabcdca8))
* **protoc-gen-ng:** move from https://github.com/ngx-grpc/protoc-gen-ng ([814db17](https://github.com/ngx-grpc/ngx-grpc/commit/814db17122f57ff43374cdf71b4bfa5a9629f064))
* **protoc-gen-ng:** preserve enum values case, closes [#11](https://github.com/ngx-grpc/ngx-grpc/issues/11) ([cea22a0](https://github.com/ngx-grpc/ngx-grpc/commit/cea22a08dfbe65523f6d955fba8bc3ae315ff186))
* **worker:** add types documentation ([c8f4049](https://github.com/ngx-grpc/ngx-grpc/commit/c8f4049f35fe975173337b409f5fd9a5122321d6))
* **worker-client:** add types documentation ([8b7a10d](https://github.com/ngx-grpc/ngx-grpc/commit/8b7a10dca6ab2d28e65b0b8b886c3b2842888b80))


### BREAKING CHANGES

* toBinary is now non-static method and is called serializeBinary; fromBinary, fromBinaryReader and toBinaryWriter are renamed to deserializeBinary, deserializeBinaryFromReader and serializeBinaryToWriter correspondingly
* **protoc-gen-ng:** generated enum values now fully reflect the way they are defined in proto file (the same name is used, unless it is not a reserved JS word)
* **protoc-gen-ng:** protoc-gen-ng is tracked with the rest of the packages ecosystem and will follow the same versioning system

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
