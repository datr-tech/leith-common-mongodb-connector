import { logger } from '@datr.tech/leith-common-logger';
import mongoose from 'mongoose';

export const connect = async ({ dbHost, dbName, dbPort }) => {
  const stat = { isConnected: false, message: undefined };

  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    stat.isConnected = true;

    logger.info(`api has connected to mongodb/${dbName} on port ${dbPort}`);
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
