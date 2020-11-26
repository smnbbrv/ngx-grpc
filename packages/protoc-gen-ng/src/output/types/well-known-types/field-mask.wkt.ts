import { Printer } from '../../misc/printer';
import { WKT } from '../wkt';

export class FieldMaskWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.paths.join(',');`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}
