import { ControllerBase } from '@happapi/jsonrpc-api';

export class Test extends ControllerBase {
  async main() {
    await Promise.resolve();
    return 'yes';
  }
}
