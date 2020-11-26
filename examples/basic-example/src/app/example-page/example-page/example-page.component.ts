import { Component, ElementRef, ViewChild } from '@angular/core';
import { GrpcEvent, GrpcStatusEvent } from '@ngx-grpc/common';
import { Timestamp } from '@ngx-grpc/well-known-types';
import { EchoRequest, EchoResponse } from 'examples/basic-example/src/proto/echo.pb';
import { Subscription } from 'rxjs';
import { EchoServiceClient } from '../../../proto/echo.pbsc';

enum ExampleEventType {
  request,
  success,
  status,
  error,
  complete,
}

interface ExampleEvent {
  type: ExampleEventType;
  request?: EchoRequest;
  response?: EchoResponse;
  status?: GrpcStatusEvent;
  error?: GrpcStatusEvent;
}

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.css'],
})
export class ExamplePageComponent {

  events: ExampleEvent[] = [];

  ExampleEventType = ExampleEventType;

  receiveAllEvents = false;
  shouldThrow = false;

  @ViewChild('content') private contentRef: ElementRef<HTMLDivElement>;

  private sub: Subscription;
  private callNumber = 0;

  constructor(
    private echoClient: EchoServiceClient,
  ) { }

  echo() {
    this.reset();

    const request = this.createRequest();

    this.displayExampleEvent({ type: ExampleEventType.request, request });

    if (this.receiveAllEvents === false) {
      this.sub = this.echoClient.echoOnce(request).subscribe(
        response => this.displayExampleEvent({ type: ExampleEventType.success, response }),
        error => this.displayExampleEvent({ type: ExampleEventType.error, error }),
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    } else {
      this.sub = this.echoClient.$raw.echoOnce(request).subscribe(
        event => this.displayGrpcEvent(event),
        () => null, // no errors expected in this mode
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    }
  }

  streamOn() {
    this.reset();

    const request = this.createRequest();

    this.displayExampleEvent({ type: ExampleEventType.request, request });

    if (this.receiveAllEvents === false) {
      this.sub = this.echoClient.echoStream(request).subscribe(
        response => this.displayExampleEvent({ type: ExampleEventType.success, response }),
        error => this.displayExampleEvent({ type: ExampleEventType.error, error }),
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    } else {
      this.sub = this.echoClient.$raw.echoStream(request).subscribe(
        event => this.displayGrpcEvent(event),
        () => null, // no errors expected in this mode
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    }
  }

  reset() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.events = [];
  }

  private createRequest() {
    this.callNumber++;

    return new EchoRequest({
      message: 'Call #' + this.callNumber,
      shouldThrow: this.shouldThrow,
      timestamp: Timestamp.fromDate(new Date()),
    });
  }

  private displayGrpcEvent(event: GrpcEvent<EchoResponse>) {
    if (event instanceof GrpcStatusEvent) {
      this.displayExampleEvent({ type: ExampleEventType.status, status: event });
    } else {
      this.displayExampleEvent({ type: ExampleEventType.success, response: event.data });
    }
  }

  private displayExampleEvent(event: ExampleEvent) {
    this.events.push(event);
    setTimeout(() => this.contentRef.nativeElement.scrollTop = 1e7);
  }

}
