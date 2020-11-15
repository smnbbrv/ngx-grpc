export class Config {

  static fromParameter(parameter: string) {
    const params = (parameter || '').split(',').map(p => p.split('=')).reduce((r, p) => ({ ...r, [p[0]]: p[1] }), {}) as {
      debug: string;
      worker: string;
      generateWellKnownTypes: string;
    };

    return new Config(params.debug === 'true', params.worker === 'true', params.generateWellKnownTypes === 'true');
  }

  constructor(
    public debug: boolean,
    public worker: boolean,
    public generateWellKnownTypes: boolean,
  ) { }

}
