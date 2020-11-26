/*
  DOM-free chunk

  IMPORTANT: all dependencies must be DOM-references-free because it might breaks Worker environment; in other words
    - do not import to @angular/* and other DOM-related packages in any level of import
    - do not use Window / Document etc
*/

export * from './lib/grpc-client';
export * from './lib/grpc-event';
export * from './lib/grpc-message';
export * from './lib/grpc-message-class';
export * from './lib/grpc-message-pool';
export * from './lib/grpc-metadata';
export * from './lib/recursive-partial';
export * from './lib/utils';

