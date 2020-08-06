import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import * as path from 'path';
import { ApiRegister } from '../ApiRegister';

const { CONTROLLER_DIR, ROUTER_PATH = '/', PORT = 6000 } = process.env;
const app = new Koa();
const router = new Router();
const apiRegister = new ApiRegister();
apiRegister.registerDir(CONTROLLER_DIR);
router.post(ROUTER_PATH, apiRegister.middleware);
app.use(koaBody());
app.use(router.routes());
app.listen(PORT);
