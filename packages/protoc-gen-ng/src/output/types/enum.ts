import { Proto } from '../../input/proto';
import { ProtoEnum } from '../../input/proto-enum';
import { Services } from '../../services';
import { classify, preserveCaseSafe, pascalize } from '../../utils';
import { Printer } from '../misc/printer';

export class Enum {

  constructor(
    private proto: Proto,
    private protoEnum: ProtoEnum,
  ) { }

  print(printer: Printer) {
    let enumName = pascalize(this.protoEnum.name)+'_';

    function process(v: {name: string, number: number}) {
      if ((!!Services.Config.stripEnumPrefixes) && v.name.startsWith(enumName)) {
        v.name = v.name.substring(enumName.length);
      }

      return `${preserveCaseSafe(v.name)} = ${v.number}`;
    }

    printer.add(`export enum ${classify(this.protoEnum.name)} {
      ${this.protoEnum.valueList.map(process).join(',')}
    }`);
  }

}
