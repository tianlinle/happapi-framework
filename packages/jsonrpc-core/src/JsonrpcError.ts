export class JsonrpcError extends Error {
  code: number
  message: string
  data?: any

  constructor(code: number, message: string, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return Object.assign({}, this, { message: this.message });
  }

  static ParseError = class ParseError extends JsonrpcError {
    constructor(data?) {
      super(-32700, 'Parse error', data);
    }
  }

  static InvalidRequest = class InvalidRequest extends JsonrpcError {
    constructor(data?) {
      super(-32600, 'Invalid Request', data);
    }
  }

  static MethodNotFound = class MethodNotFound extends JsonrpcError {
    constructor(data?) {
      super(-32601, 'Method not found', data);
    }
  }

  static InvalidParams = class InvalidParams extends JsonrpcError {
    constructor(data?) {
      super(-32602, 'Invalid params', data);
    }
  }

  static InternalError = class InternalError extends JsonrpcError {
    constructor(data?) {
      super(-32603, 'Internal error', data);
    }
  }
}
