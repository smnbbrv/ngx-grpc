import { Component } from '@angular/core';
import { EchoRequest } from '../proto/echo.pb';
import { EchoServiceClient } from '../proto/echo.pbsc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  responses: string[] = [];

  constructor(
    private echoClient: EchoServiceClient,
  ) { }

  echo() {
    this.echoClient
      .echoOnce(new EchoRequest({ message: 'test', shouldThrow: true }))
      .subscribe(
        res => this.responses.push(res.message),
        err => console.error(err),
        () => console.log('complete'),
      );
  }

  streamOn() {
    this.echoClient
      .echoStream(new EchoRequest({ message: 'test stream' }))
      .subscribe(
        res => console.log(res),
        err => console.error(err),
        () => console.log('complete'),
      );
  }

}
