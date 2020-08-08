export class JsonrpcResult {
  static success(id, result) {
    return { jsonrpc: '2.0', id, result };
  }

  static error(id, error) {
    return { jsonrpc: '2.0', id: id === undefined ? null : id, error: error.toJSON() };
  }
};
