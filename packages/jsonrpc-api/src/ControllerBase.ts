import * as Ajv from 'ajv';
import { InvalidParams, IRequestObject } from '@happapi/jsonrpc-core';
import ajv = require('ajv');

export class ControllerBase {
  body: IRequestObject

  static ajv = new Ajv()

  constructor(body: IRequestObject) {
    this.body = body;
  }

  main() { }

  static paramsSchema() {
    return {};
  }

  async run() {
    const { params } = this.body;
    const constructor = this.constructor as typeof ControllerBase;
    if (!constructor.ajv.validate(constructor.paramsSchema(), params)) {
      throw new InvalidParams({
        errorText: constructor.ajv.errorsText(undefined, {
          dataVar: 'params'
        })
      });
    }
    const result = await this.main();
    return result;
  }
}
