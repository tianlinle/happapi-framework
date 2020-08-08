import { ControllerBase } from '../../ControllerBase';

export class A extends ControllerBase {
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
