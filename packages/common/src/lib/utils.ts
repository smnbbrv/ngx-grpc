/**
 * Converts Uint8Array to string as prescribed by protobuf bytes toJSON definition
 * Inspired by https://stackoverflow.com/a/9458996/1990451
 */
export function uint8ArrayToBase64(array: Uint8Array): string {
  let res = '';

  for (let i = 0; i < array.byteLength; i++) {
    res += String.fromCharCode(array[i]);
  }

  return window.btoa(res);
}
