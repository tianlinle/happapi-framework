import { Controller } from '../../../Controller';

export class B extends Controller {
  async main() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      message: 'B called.'
    };
  }
}
