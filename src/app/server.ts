/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

(async () => {
  // listing server
  server = app.listen(config.PORT, () => {
    console.dir(`[SERVER] : listening on port ${config.PORT}`);
  });

  // connecting db
  await mongoose
    .connect(config.DB_URI as string)
    .then(() => {
      console.dir(`[SERVER] : Database connected...`);
    })
    .catch((error) => {
      console.dir(error.message);
    });
})();
