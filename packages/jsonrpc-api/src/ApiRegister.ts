import { Glob } from 'glob';
import * as path from 'path';
import { JsonrpcHandler } from '@happapi/jsonrpc-core';
import { Controller } from './Controller';
import * as getRawBody from 'raw-body';
import * as contentType from 'content-type';

export class ApiRegister {
  handler = new JsonrpcHandler()
  controllerMap: { [method: string]: typeof Controller } = {}
  schemaMap: { [method: string]: any } = {}

  async registerDir(dir: string) {
    const controllerDir = path.resolve(process.cwd(), dir);
    const { found } = new Glob('**/*.js', {
      sync: true,
      cwd: controllerDir,
      nodir: true,
      realpath: true
    });
    for (const file of found) {
      const imported = await import(file);
      const controllerClass: typeof Controller = imported[path.basename(file, '.js')];
      const method = file.replace(controllerDir, '').substr(1).replace(/\.js$/, '').replace(/[\\/]/, '.');
      this.controllerMap[method] = controllerClass;
      this.schemaMap[method] = controllerClass.paramsSchema();
      this.handler.setMethodHandler(method, async (body) => {
        const controller = new controllerClass(body);
        return await controller.run();
      });
    }
  }

  apiMiddleware(options?: { bodyLimit: string }) {
    return async (ctx, next) => {
      options = Object.assign({ bodyLimit: '10kb' }, options);
      const body = await getRawBody(ctx.req, {
        length: ctx.req.headers['content-length'],
        limit: options.bodyLimit || '10kb',
        encoding: contentType.parse(ctx.req).parameters.charset || 'utf8'
      });
      ctx.set('Content-Type', 'application/json');
      ctx.body = await this.handler.handle(body);
      next();
    }
  }
}
