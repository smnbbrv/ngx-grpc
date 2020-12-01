#!/bin/sh

NEW_VERSION=$1

node custom-publish/prepare.js dist/common/package.json $NEW_VERSION
node custom-publish/prepare.js dist/core/package.json $NEW_VERSION
node custom-publish/prepare.js dist/grpc-web-client/package.json $NEW_VERSION
node custom-publish/prepare.js dist/improbable-eng-grpc-web-client/package.json $NEW_VERSION
node custom-publish/prepare.js dist/protoc-gen-ng/package.json $NEW_VERSION
node custom-publish/prepare.js dist/well-known-types/package.json $NEW_VERSION
node custom-publish/prepare.js dist/worker-client/package.json $NEW_VERSION
node custom-publish/prepare.js dist/worker/package.json $NEW_VERSION
