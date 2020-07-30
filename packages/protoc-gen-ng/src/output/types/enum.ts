import { Proto } from '../../input/proto';
import { ProtoEnum } from '../../input/proto-enum';
import { classify, preserveCaseSafe } from '../../utils';
import { Printer } from '../misc/printer';

export class Enum {

  constructor(
    private proto: Proto,
    private protoEnum: ProtoEnum,
  ) { }

  print(printer: Printer) {
    printer.add(`export enum ${classify(this.protoEnum.name)} {
      ${this.protoEnum.valueList.map(v => `${preserveCaseSafe(v.name)} = ${v.number}`).join(',')}
    }`);
  }

}
