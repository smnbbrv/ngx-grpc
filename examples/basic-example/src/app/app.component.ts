import { Component, ElementRef, ViewChild } from '@angular/core';
import { GrpcEvent, GrpcStatusEvent } from '@ngx-grpc/common';
import { Subscription } from 'rxjs';
import { EchoRequest, EchoResponse } from '../proto/echo.pb';
import { EchoServiceClient } from '../proto/echo.pbsc';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
      this.sub = this.echoClient.echoOnce(request).data.subscribe(
        response => this.displayExampleEvent({ type: ExampleEventType.success, response }),
        error => this.displayExampleEvent({ type: ExampleEventType.error, error }),
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    } else {
      this.sub = this.echoClient.echoOnce(request).events.subscribe(
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
      this.sub = this.echoClient.echoStream(request).data.subscribe(
        response => this.displayExampleEvent({ type: ExampleEventType.success, response }),
        error => this.displayExampleEvent({ type: ExampleEventType.error, error }),
        () => this.displayExampleEvent({ type: ExampleEventType.complete }),
      );
    } else {
      this.sub = this.echoClient.echoStream(request).events.subscribe(
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

    return new EchoRequest({ message: 'Call #' + this.callNumber, shouldThrow: this.shouldThrow });
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
