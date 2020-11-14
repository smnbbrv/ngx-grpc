import { Printer } from '../misc/printer';

export interface MessageField {
  printDeserializeBinaryFromReader(printer: Printer): void;
  printSerializeBinaryToWriter(printer: Printer): void;
  printPrivateAttribute(printer: Printer): void;
  printInitializer(printer: Printer): void;
  printDefaultValueSetter(printer: Printer): void;
  printGetter(printer: Printer): void;
  printSetter(printer: Printer): void;
  printToObjectMapping(printer: Printer): void;
  printAsObjectMapping(printer: Printer): void;
  printToProtobufJSONMapping(printer: Printer): void;
  printAsJSONMapping(printer: Printer): void;
}
