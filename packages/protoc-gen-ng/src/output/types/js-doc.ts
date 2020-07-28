interface Param {
  type: string;
  name: string;
  description?: string;
}

export class JSDoc {

  private description = '';
  private deprecated = false;
  private inputs: Param[] = [];
  private output = '';

  setDescription(description: string) {
    this.description = description;
  }

  addParam(input: Param) {
    this.inputs.push(input);
  }

  setReturn(output: string) {
    this.output = output;
  }

  setDeprecation(deprecated: boolean) {
    this.deprecated = deprecated;
  }

  toString() {
    const printed: string[] = [];

    if (this.description) { printed.push(this.description); }
    if (this.deprecated) { printed.push('@deprecated'); }
    if (this.inputs) { this.inputs.forEach(i => printed.push(`@param ${i.type} ${i.name}`)); }
    if (this.output) { printed.push(`@return ${this.output}`); }

    return `/**
      ${printed.map(s => `* ${s}`).join('\n')}
    */`;
  }

}
