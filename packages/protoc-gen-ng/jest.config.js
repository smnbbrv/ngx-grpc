module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './packages/protoc-gen-ng/test/tsconfig.json',
    }],
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
