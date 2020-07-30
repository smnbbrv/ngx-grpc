import { GrpcEvent, GrpcMessage } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { takeMessages, throwStatusErrors } from './grpc-rx-operators';

export class UnaryRpcRef<T extends GrpcMessage> {

  data: Observable<T>;
  events: Observable<GrpcEvent<T>>;

  constructor(eventStream: Observable<GrpcEvent<T>>) {
    this.events = eventStream.pipe(share());
    this.data = this.events.pipe(
      throwStatusErrors(),
      takeMessages(),
    );
  }

}

export class ServerStreamRpcRef<T extends GrpcMessage> {

  data: Observable<T>;
  events: Observable<GrpcEvent<T>>;

  constructor(eventStream: Observable<GrpcEvent<T>>) {
    this.events = eventStream.pipe(share());
    this.data = this.events.pipe(
      throwStatusErrors(),
      takeMessages(),
    );
  }

}
