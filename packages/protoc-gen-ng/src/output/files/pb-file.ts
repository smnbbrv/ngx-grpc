import { Proto } from '../../input/proto';
import { Printer } from '../misc/printer';
import { Enum } from '../types/enum';
import { Message } from '../types/message';

export class PbFile {

  constructor(
    private proto: Proto,
  ) { }

  print(printer: Printer) {
    printer.add(this.proto.getImportedDependencies());

    this.proto.enumTypeList.forEach(protoEnum => {
      const enumInstance = new Enum(this.proto, protoEnum);

      enumInstance.print(printer);
    });

    this.proto.messageTypeList.forEach(protoMessage => {
      const message = new Message(this.proto, protoMessage);

      message.print(printer);
    });
  }

}
