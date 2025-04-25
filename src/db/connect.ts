import { logger } from '@datr.tech/leith-common-logger';
import mongoose from 'mongoose';

export const connect = async ({ host, name, pass, port, user }) => {
  const stat = { isConnected: false, message: undefined };

  try {
    if (pass && user) {
      await mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${name}`);
    } else {
      await mongoose.connect(`mongodb://${host}:${port}/${name}`);
    }

    stat.isConnected = true;

    logger.info(`api has connected to mongodb/${name} on port ${port}`);
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
