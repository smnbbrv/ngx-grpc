import { Printer } from '../../misc/printer';
import { WKT } from '../wkt';

export class DurationWKT implements WKT {

  printToProtobufJSON(printer: Printer) { // TODO big math
    printer.addLine(`return (parseInt(this.seconds || '0') + (this.nanos || 0) / 1e9) + 's';`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}
