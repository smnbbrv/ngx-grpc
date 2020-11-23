import { Component } from '@angular/core';

@Component({
  selector: 'app-worker-client-example',
  template: `<app-example-page></app-example-page>`,
})
export class GrpcWorkerClientExampleComponent { }

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./grpc.worker', { type: 'module' });
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
