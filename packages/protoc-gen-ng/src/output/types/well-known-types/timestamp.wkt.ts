import { Printer } from '../../misc/printer';
import { WKT } from '../wkt';

export class TimestampWKT implements WKT {

  printStaticMethods(printer: Printer) {
    printer.addLine(`
      static fromDate(date: Date) {
        const timestamp = new Timestamp();

        timestamp.fromDate(date);

        return timestamp;
      }

      static fromISOString(isoDate: string) {
        const timestamp = new Timestamp();

        timestamp.fromISOString(isoDate);

        return timestamp;
      }
    `);
  }

  printMemberMethods(printer: Printer) { // TODO big math
    printer.addLine(`
      fromDate(date: Date) {
        this.seconds = ''+Math.floor(date.getTime() / 1e3);
        this.nanos = date.getMilliseconds() * 1e6;
      }

      toDate() {
        return new Date(parseInt(this.seconds || '0') * 1e3 + (this.nanos || 0) / 1e6);
      }

      fromISOString(isoDate: string) {
        this.fromDate(new Date(isoDate));
      }

      toISOString() {
        return this.toDate().toISOString();
      }
    `);
  }

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.toISOString();`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}
