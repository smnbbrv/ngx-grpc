import { ProtoServiceMethodOptions } from './proto-service-method-options';

export class ServiceMethod {

  name: string;
  inputType: string;
  outputType: string;
  clientStreaming: boolean;
  serverStreaming: boolean;
  options: ProtoServiceMethodOptions;

  constructor(value: ServiceMethod) {
    this.name = value.name;
    this.inputType = value.inputType;
    this.outputType = value.outputType;
    this.clientStreaming = value.clientStreaming;
    this.serverStreaming = value.serverStreaming;
    this.options = new ProtoServiceMethodOptions(value.options || {});
  }

}
