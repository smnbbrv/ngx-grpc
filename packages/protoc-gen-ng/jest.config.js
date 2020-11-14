module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './packages/protoc-gen-ng/test/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@ngx-grpc/(.*)': '<rootDir>/../../dist/$1',
  },
  testEnvironment: './jest.env.js',
  roots: [
    'test/spec',
    'test/out',
  ],
};
