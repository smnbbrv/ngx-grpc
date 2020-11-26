import { ExternalDependencies } from '../../misc/dependencies';
import { Printer } from '../../misc/printer';
import { WKT } from '../wkt';

export class BoolValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = boolean;`);
  }

}

export class BytesValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addDeps(ExternalDependencies.uint8ArrayToBase64);

    printer.addLine(`return this.value ? uint8ArrayToBase64(this.value) : '';`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}

export class DoubleValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = number;`);
  }

}

export class FloatValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = number;`);
  }

}

export class Int32ValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = number;`);
  }

}

export class Int64ValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}

export class StringValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}

export class UInt32ValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = number;`);
  }

}

export class UInt64ValueWKT implements WKT {

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`return this.value;`);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = string;`);
  }

}
