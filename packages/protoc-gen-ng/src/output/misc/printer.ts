import * as prettier from 'prettier';
import { Dependency } from './interfaces';

export class Printer {

  private dependencies = new Set<Dependency>();

  private code = '';

  constructor() { }

  addDeps(...deps: Dependency[]) {
    deps.forEach(item => this.dependencies.add(item));
  }

  add(code: string) {
    this.code += code;
  }

  addLine(code: string) {
    this.add(code);
    this.newLine();
  }

  newLine() {
    this.code += '\n';
  }

  finalize() {
    return this.prettify(this.createLeadingComment() + this.createDependenciesCode() + this.code);
  }

  private createLeadingComment() {
    return `/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
    `;
  }

  private createDependenciesCode() {
    const deps = new Map<string, string[]>();

    Array.from(this.dependencies).forEach(dep => {
      let group = deps.get(dep.from);

      if (!group) {
        deps.set(dep.from, group = []);
      }

      group.push(dep.token);
    });

    let code = '';

    Array.from(deps.keys()).sort().forEach(from => {
      const tokens = deps.get(from) as string[];

      code += `import { ${tokens.sort().join(', ')} } from '${from}';\n`;
    });

    return code;
  }

  private prettify(code: string) {
    return prettier.format(code, { parser: 'typescript', singleQuote: true });
  }

}
