import { InjectionToken } from '@angular/core';

/**
 * Default configuration for grpc-web clients. Will be used for every GrpcWebClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
export const IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS = new InjectionToken('IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS');
