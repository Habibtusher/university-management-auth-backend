/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errrorLogger } from './shared/logger';
import { Server } from 'http';
let server: Server;
process.on('uncaughtException', err => {
  errrorLogger.error(err);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database connected');
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errrorLogger.error('faield to connect db', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errrorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
