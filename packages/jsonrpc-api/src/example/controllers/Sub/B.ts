import { ControllerBase } from '../../../ControllerBase';

export class B extends ControllerBase {
  async main() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      message: 'B called.'
    };
  }
}
