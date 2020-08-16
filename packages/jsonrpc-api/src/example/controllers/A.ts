import { Controller } from '../../Controller';

export class A extends Controller {
  params: { id: string }

  static paramsSchema() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  }

  main() {
    return {
      message: `Id ${this.params.id} received.`
    };
  }
}
