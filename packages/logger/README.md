# `logger`

A simple and configurable logger using async_hooks.

## Usage

```javascript
const Logger = require('@happapi/logger');

const logger = new Logger({ level: 'info', meta: { pid: process.pid } });

logger.info('process started'); // {"level":"info","time":"2020-08-08T05:24:45.295Z","message":"process started","meta":{"pid":8412},"data":{}}

const a = async (data) => {
  await Promise.resolve();
  logger.info('a ended');
}

logger.attach({ sub: 'a' });

a('1'); // {"level":"info","time":"2020-08-08T05:24:45.297Z","message":"a ended","meta":{"pid":8412,"sub":"a"},"data":"1"}
```
