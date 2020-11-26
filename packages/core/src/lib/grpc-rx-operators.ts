import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcStatusEvent } from '@ngx-grpc/common';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

/**
 * RxJS operator
 * When applied to gRPC events emits error for status events with a non-zero code (includes throwStatusErrors)
 * @return Observable of gRPC events
 */
export function throwStatusErrors<T extends GrpcMessage>() {
  return (source$: Observable<GrpcEvent<T>>) => source$.pipe(
    switchMap(event => event instanceof GrpcStatusEvent && event.statusCode ? throwError(event) : of(event)),
  );
}

/**
 * RxJS operator
 * When applied to gRPC events stream extracts and returns only messages
 * @return Observable of messages
 */
export function takeMessages<T extends GrpcMessage>() {
  return (source$: Observable<GrpcEvent<T>>) => source$.pipe(
    filter(event => event instanceof GrpcDataEvent),
    map((event: GrpcDataEvent<T>) => event.data),
  );
}
