import { Logger } from '../Logger';

const logger = new Logger({ level: 'info', meta: { pid: process.pid } });
logger.info('process started');

const asyncMethodA = async (args) => {
  logger.info('asyncMethodA started', { args });
  await Promise.resolve();
  logger.info('asyncMethodA ended');
}

(async () => {
  logger.info('async process started');
  logger.attach({ sub: 'a' });
  await asyncMethodA('go');
  logger.debug('should not shown');
  logger.setLevel('debug');
  logger.debug('should show debug message');
})();
