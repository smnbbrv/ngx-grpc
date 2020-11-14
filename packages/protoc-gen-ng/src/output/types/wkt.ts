import { Printer } from '../misc/printer';

export interface WKT {
  printStaticMethods?(printer: Printer): void;
  printMemberMethods?(printer: Printer): void;
  printToProtobufJSON?(printer: Printer): void;
  printAsProtobufJSON?(printer: Printer): void;
}
