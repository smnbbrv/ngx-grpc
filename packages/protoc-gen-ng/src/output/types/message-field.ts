import { Printer } from '../misc/printer';

export interface MessageField {
  printFromBinaryReader(printer: Printer): void;
  printToBinaryWriter(printer: Printer): void;
  printPrivateAttribute(printer: Printer): void;
  printInitializer(printer: Printer): void;
  printDefaultValueSetter(printer: Printer): void;
  printGetter(printer: Printer): void;
  printSetter(printer: Printer): void;
  printToObjectMapping(printer: Printer): void;
}
