import { GrpcMessage } from './grpc-message';
import { GrpcMessageClass } from './grpc-message-class';

/**
 * A message pool for using with `google.protobuf.Any`.
 * Pass the array of messages to be registered within the pool and give this pool to `toProtobufJSON` or to `unpack`.
 */
export class GrpcMessagePool {

  private index = new Map<string, GrpcMessageClass<GrpcMessage>>();

  constructor(messages: GrpcMessageClass<GrpcMessage>[]) {
    this.add(messages);
  }

  add(messages: GrpcMessageClass<GrpcMessage>[]) {
    messages.forEach(m => this.index.set(m.id, m));
  }

  get(id: string) {
    return this.index.get(id);
  }

}
