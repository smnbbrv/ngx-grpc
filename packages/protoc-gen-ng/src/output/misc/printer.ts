import * as prettier from 'prettier';
import { Dependency, DependencyToken } from './interfaces';

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
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
    `;
  }

  private createDependenciesCode() {
    const deps = new Map<string, DependencyToken[]>();

    Array.from(this.dependencies).forEach(dep => {
      let group = deps.get(dep.from);

      if (!group) {
        deps.set(dep.from, group = []);
      }

      group.push({ token: dep.token, isType: dep.isType ?? false });
    });

    let code = '';

    Array.from(deps.keys()).sort().forEach(from => {
      const tokens = deps.get(from) as DependencyToken[];

      code += `import { ${tokens.sort().map(x => `${x.isType ? 'type ' : ''}${x.token}`).join(', ')} } from '${from}';\n`;
    });

    return code;
  }

  private prettify(code: string) {
    return prettier.format(code, { parser: 'typescript', singleQuote: true });
  }

}
