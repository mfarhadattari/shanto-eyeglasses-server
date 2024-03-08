/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import { seedManager } from './DB';
import app from './app';
import config from './config';

let server: Server;

(async () => {
  // listing server
  server = app.listen(config.PORT, () => {
    console.dir(`[SERVER] : listening on port ${config.PORT}...`);
  });

  // connecting db
  await mongoose
    .connect(config.DB_URI as string)
    .then(async () => {
      console.dir(`[SERVER] : Database connected...`);
      await seedManager();
    })
    .catch((error) => {
      console.dir(error.message);
    });
})();

// --------->> Handling Uncaught Exception Errors <<--------------
process.on('uncaughtException', () => {
  console.dir(`[SERVER: Uncaught Exception is detected, shutting down...`);
  process.exit(1);
});

// --------->> Handling Unhandled Rejection Errors <<--------------
process.on('unhandledRejection', () => {
  console.dir(`[SERVER]: unhandled Rejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
