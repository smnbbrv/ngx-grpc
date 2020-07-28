export class ProtoEnum {

  name: string;
  valueList: {
    name: string;
    number: number;
  }[];
  reservedRangeList: [];
  reservedNameList: [];

  constructor(value: ProtoEnum) {
    this.name = value.name;
    this.valueList = value.valueList;
    this.reservedRangeList = value.reservedRangeList;
    this.reservedNameList = value.reservedNameList;
  }

}
