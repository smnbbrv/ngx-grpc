import { InjectionToken } from '@angular/core';

export const GRPC_WORKER = new InjectionToken<Worker>('GRPC_WORKER');
export const GRPC_WORKER_CLIENT_DEFAULT_SETTINGS = new InjectionToken('GRPC_WORKER_CLIENT_DEFAULT_SETTINGS');
