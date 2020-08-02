export class ProtoServiceMethodOptions {

  deprecated: boolean;
  idempotencyLevel: number;
  uninterpretedOptionList: any[];

  constructor(value: ProtoServiceMethodOptions) {
    this.deprecated = value.deprecated;
    this.idempotencyLevel = value.idempotencyLevel;
    this.uninterpretedOptionList = value.uninterpretedOptionList || [];
  }

}
