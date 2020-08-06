import { Glob } from 'glob';
import * as path from 'path';
import { JsonrpcHandler } from '@happapi/jsonrpc-core';
import { ControllerBase } from './ControllerBase';

export class ApiRegister {
  handler = new JsonrpcHandler()
  controllerMap: { [method: string]: typeof ControllerBase } = {}
  schemaMap: { [method: string]: any } = {}

  async registerDir(dir: string) {
    const cwd = process.cwd();
    const { found } = new Glob('**/*.js', {
      sync: true,
      cwd: path.resolve(cwd, dir),
      nodir: true,
      realpath: true
    });
    for (const file of found) {
      const controllerClass: typeof ControllerBase = await import(file);
      const method = file.replace(cwd, '').substr(1).replace(/\.js$/, '').replace(/[\\/]/, '.');
      this.controllerMap[method] = controllerClass;
      this.schemaMap[method] = controllerClass.paramsSchema();
      this.handler.setMethodHandler(method, async (body) => {
        const controller = new controllerClass(body);
        return await controller.run();
      });
    }
  }

  async middleware(ctx, next) {
    ctx.body = this.handler.handle(ctx.request.body);
    next();
  }
}
