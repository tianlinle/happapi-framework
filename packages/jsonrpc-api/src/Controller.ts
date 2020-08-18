import * as Ajv from 'ajv';
import { IRequestObject, JsonrpcError } from '@happapi/jsonrpc-core';

export class Controller {
  body: IRequestObject
  params: any

  static ajv = new Ajv()

  constructor(body: IRequestObject) {
    this.body = body;
    this.params = body.params;
  }

  main() { }

  static paramsSchema() {
    return {};
  }

  async run() {
    const { params } = this.body;
    const constructor = this.constructor as typeof Controller;
    if (!constructor.ajv.validate(constructor.paramsSchema(), params)) {
      throw new JsonrpcError.InvalidParams({
        errorText: constructor.ajv.errorsText(undefined, {
          dataVar: 'params'
        })
      });
    }
    const result = (await this.main()) as any;
    return result;
  }
}
