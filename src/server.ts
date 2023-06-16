/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errrorLogger } from './shared/logger';
import { Server } from 'http';
let server: Server;
process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('database connected');
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('faield to connect db', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
