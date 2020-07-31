import { InjectionToken } from '@angular/core';

/**
 * Use this injection token to register the GrpcClientFactory
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_CLIENT_FACTORY, useClass: MyClientFactory },
 * ]
 * ```
 */
export const GRPC_CLIENT_FACTORY = new InjectionToken('GRPC_CLIENT_FACTORY');

/**
 * Use this injection token to add interceptors
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_INTERCEPTORS, useClass: MyInterceptor, multi: true },
 * ]
 * ```
 */
export const GRPC_INTERCEPTORS = new InjectionToken('GRPC_INTERCEPTORS');
