/**
 * Helper type to turn every property and all sub-properties (from sub-objects) the incoming type to be optional
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Uint8Array ? T[P] : T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P];
};
