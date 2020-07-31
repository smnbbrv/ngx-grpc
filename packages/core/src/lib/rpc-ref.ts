import { GrpcEvent, GrpcMessage } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { takeMessages, throwStatusErrors } from './grpc-rx-operators';

/**
 * Created for every unary call
 */
export class UnaryRpcRef<T extends GrpcMessage> {

  /**
   * Observable of messages from server
   */
  data: Observable<T>;

  /**
   * Observable of GrpcEvent (message and status events)
   */
  events: Observable<GrpcEvent<T>>;

  constructor(eventStream: Observable<GrpcEvent<T>>) {
    this.events = eventStream.pipe(share());
    this.data = this.events.pipe(
      throwStatusErrors(),
      takeMessages(),
    );
  }

}

/**
 * Created for every server stream call
 */
export class ServerStreamRpcRef<T extends GrpcMessage> {

  /**
   * Observable of messages from server
   */
  data: Observable<T>;

  /**
   * Observable of GrpcEvent (message and status events)
   */
  events: Observable<GrpcEvent<T>>;

  constructor(eventStream: Observable<GrpcEvent<T>>) {
    this.events = eventStream.pipe(share());
    this.data = this.events.pipe(
      throwStatusErrors(),
      takeMessages(),
    );
  }

}
