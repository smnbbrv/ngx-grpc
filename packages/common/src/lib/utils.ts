/**
 * Converts Uint8Array to string as prescribed by protobuf bytes toJSON definition
 * Requires TextDecoder, if you need to support old browsers consider using polyfill, e.g. https://github.com/anonyco/FastestSmallestTextEncoderDecoder
 */
export function uint8ArrayToBase64(array: Uint8Array): string {
  return btoa(new TextDecoder('utf-8').decode(array));
}
