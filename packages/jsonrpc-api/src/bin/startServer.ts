import * as Koa from 'koa';
import * as getRawBody from 'raw-body';
import * as Router from 'koa-router';
import { ApiRegister } from '../ApiRegister';
import * as contentType from 'content-type';

const unparsed = Symbol.for('unparsedBody');
const { CONTROLLER_DIR, ROUTER_PATH = '/', PORT = 3003, BODY_LIMIT = '10kb' } = process.env;
const app = new Koa();
const router = new Router();
const apiRegister = new ApiRegister();
apiRegister.registerDir(CONTROLLER_DIR);
router.post(ROUTER_PATH, async (ctx, next) => {
  const body = await getRawBody(ctx.req, {
    length: ctx.req.headers['content-length'],
    limit: BODY_LIMIT,
    encoding: contentType.parse(ctx.req).parameters.charset || 'utf8'
  });
  ctx.set('Content-Type', 'application/json');
  ctx.body = await apiRegister.handler.handle(body);
  next();
});
router.get(ROUTER_PATH, (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = apiRegister.schemaMap;
  next();
});
app.use(router.routes());
app.listen(PORT);
