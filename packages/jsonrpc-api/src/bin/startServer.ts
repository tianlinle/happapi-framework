#!/usr/bin/env node

import * as Koa from 'koa';
import * as Router from 'koa-router';
import { ApiRegister } from '../ApiRegister';

const { CONTROLLER_DIR, ROUTER_PATH = '/', PORT = 3003, BODY_LIMIT = '10kb' } = process.env;
const app = new Koa();
const router = new Router();
const apiRegister = new ApiRegister();
apiRegister.registerDir(CONTROLLER_DIR);
router.post(ROUTER_PATH, apiRegister.apiMiddleware({ bodyLimit: BODY_LIMIT }));
router.get(ROUTER_PATH, (ctx, next) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = apiRegister.schemaMap;
  next();
});
app.use(router.routes());
app.listen(PORT);
