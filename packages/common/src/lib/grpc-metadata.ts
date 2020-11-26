export class GrpcMetadata {

  private map: Map<string, string>;

  constructor(initial?: { [prop: string]: string; }) {
    initial = initial || {};

    this.map = Object.keys(initial).reduce((m, k) => m.set(k, initial[k]), new Map());
  }

  set(name: string, value: string) {
    this.map.set(name, value);
  }

  get(name: string) {
    return this.map.get(name);
  }

  has(name: string) {
    return this.map.has(name);
  }

  clone() {
    return new GrpcMetadata(this.toObject());
  }

  toObject() {
    return [...this.map.keys()].reduce((o, k) => ({ ...o, [k]: this.map.get(k) }), {});
  }

}
