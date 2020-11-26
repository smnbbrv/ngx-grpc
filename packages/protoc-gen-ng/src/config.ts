import { existsSync } from 'fs';
import { resolve } from 'path';

/*

Configuration specification and types.

All default values look like

module.exports = {
  debug: false,
  embedWellKnownTypes: false,
  files: {
    pb: {
      generate: true,
    },
    pbconf: {
      generate: true,
    },
    pbsc: {
      generate: true,
      serviceClientProvidedIn: 'any',
    },
    pbwsc: {
      generate: false,
    },
  },
};

For the meaning of the parameters check below

*/

/**
 * Configuration for `pb` files
 */
export class ConfigPb {
  /**
   * Enable or disable generation of pb files
   */
  generate: boolean;

  constructor(config: Partial<ConfigPb> = {}) {
    this.generate = config.generate ?? true;
  }
}

/**
 * Configuration for `pbconf` files
 */
export class ConfigPbconf {
  /**
   * Enable or disable generation of pbconf files
   */
  generate: boolean;

  constructor(config: Partial<ConfigPbconf> = {}) {
    this.generate = config.generate ?? true;
  }
}

/**
 * Configuration for `pbsc` files
 */
export class ConfigPbsc {
  /**
   * Enable or disable generation of pbsc files
   */
  generate: boolean;

  /**
   * Provide service clients in...
   */
  serviceClientProvidedIn: 'root' | 'any' | 'none';

  constructor(config: Partial<ConfigPbsc> = {}) {
    this.generate = config.generate ?? true;
    this.serviceClientProvidedIn = config.serviceClientProvidedIn ?? 'any';
  }
}

/**
 * Configuration for `pbwsc` files.
 * These files are required for worker client. By default, not generated.
 */
export class ConfigPbwsc {
  /**
   * Enable or disable generation of pbwsc files
   */
  generate: boolean;

  constructor(config: Partial<ConfigPbwsc> = {}) {
    this.generate = config.generate ?? false;
  }
}

/**
 * Configuration object for all generated file types
 */
export class ConfigFiles {
  pb: ConfigPb;
  pbconf: ConfigPbconf;
  pbsc: ConfigPbsc;
  pbwsc: ConfigPbwsc;

  constructor(config: Partial<ConfigFiles> = {}) {
    this.pb = new ConfigPb(config.pb);
    this.pbconf = new ConfigPbconf(config.pbconf);
    this.pbsc = new ConfigPbsc(config.pbsc);
    this.pbwsc = new ConfigPbwsc(config.pbwsc);
  }
}

/**
 * Generator configuration
 */
export class Config {

  /**
   * Enables debug mode, mostly for internal use
   * By default false
   */
  public debug: boolean;
  /**
   * Generate well-known types in your project instead of using `@ngx-grpc/well-known-types`
   * Used internally to actually generate `@ngx-grpc/well-known-types` and as a legacy support of old versions of the lib.
   * By default false
   */
  public embedWellKnownTypes: boolean;
  /**
   * Per-generated-file-type config
   */
  public files: ConfigFiles;

  static fromParameter(parameter: string) {
    const params = (parameter || '').split(',').map(p => p.split('=')).reduce((r, p) => ({ ...r, [p[0]]: p[1] }), {}) as {
      config: string;
    };

    if (params.config && !existsSync(params.config)) {
      throw new Error(`The config file "${params.config}" cannot be found`);
    }

    return new Config(params.config ? require(resolve(params.config)) : {});
  }

  constructor(config: Partial<Config> = {}) {
    this.debug = config.debug ?? false;
    this.embedWellKnownTypes = config.embedWellKnownTypes ?? false;
    this.files = new ConfigFiles(config.files ?? {});
  }

}
