import { ServiceMethod as ProtoServiceMethod } from './proto-service-method';

export class ProtoService {

  name: string;
  methodList: ProtoServiceMethod[];

  constructor(value: ProtoService) {
    this.name = value.name;
    this.methodList = (value.methodList || []).map(m => new ProtoServiceMethod(m));
  }

}
