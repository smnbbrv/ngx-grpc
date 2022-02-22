module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './packages/protoc-gen-ng/test/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@ngx-grpc/(.*)': '<rootDir>/test/packages/$1/src/public-api.js',
  },
  testEnvironment: './jest.env.js',
  roots: [
    'test/spec',
    'test/out',
  ],
};
