import { logger } from '@datr.tech/leith-common-logger';
import mongoose from 'mongoose';

export const connect = async () => {
  const stat = { isConnected: false, message: undefined };
  const { DB_HOST, DB_NAME, DB_PORT } = process.env;

  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    stat.isConnected = true;

    logger.info(`api has connected to mongodb/${DB_NAME} on port ${DB_PORT}`);
  } catch (error) {
    const { message } = error;
    stat.message = message;

    return stat;
  }

  mongoose.connection.on('disconnected', (error) => {
    logger.info({ disconnected: error });
  });

  mongoose.connection.on('error', (error) => {
    logger.info({ error });
  });

  return stat;
};
