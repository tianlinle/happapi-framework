import { JsonrpcResult } from './JsonrpcResult';
import { JsonrpcError } from './JsonrpcError';

export type ISuccessResponseObject = { jsonrpc: '2.0', id: string | number | null, result?: any };
export type IErrorResponseObject = { jsonrpc: '2.0', id: string | number | null, error?: any };
export type IRequestObject = { jsonrpc: '2.0', id?: string | number | null, method: string, params?: any };

export class JsonrpcHandler {
  methods: { [method: string]: { handler: (any) => any, context: any } } = {}

  /**
   * Set method handler
   * @param {string} method
   * @param {Function} handler
   * @param {any} [context]
   */
  setMethodHandler(method, handler, context?) {
    this.methods[method] = {
      handler,
      context
    };
  }

  async handle(body: IRequestObject | IRequestObject[] | string, ...customData: any[]) {
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (error) {
        return JsonrpcResult.error(null, new JsonrpcError.ParseError());
      }
    }
    let bodyIsArray = true;
    if (!Array.isArray(body)) {
      body = [body as IRequestObject];
      bodyIsArray = false;
    }
    let resultList = [];
    for (let item of body) {
      try {
        if (Object.prototype.toString.call(item) != '[object Object]'
          || item.jsonrpc != '2.0'
          || Object.prototype.toString.call(item.method) != '[object String]') {
          throw new JsonrpcError.InvalidRequest();
        }
        if (!this.methods[item.method]) {
          throw new JsonrpcError.MethodNotFound();
        }
        let description = this.methods[item.method];
        let itemResult = await description.handler.call(description.context, item, ...customData);
        if (item.id != undefined) {
          resultList.push(JsonrpcResult.success(item.id, itemResult));
        }
      } catch (error) {
        if (error instanceof JsonrpcError.InvalidRequest) {
          resultList.push(JsonrpcResult.error(item.id, error))
        } else if (item.id !== undefined) {
          if (error instanceof JsonrpcError) {
            resultList.push(JsonrpcResult.error(item.id, error));
          } else {
            resultList.push(JsonrpcResult.error(item.id, new JsonrpcError.InternalError(error)));
          }
        }
      }
    }
    if (bodyIsArray) {
      return resultList;
    }
    return resultList[0] || null;
  }
};
