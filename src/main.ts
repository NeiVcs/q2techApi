import 'reflect-metadata';
import 'dotenv/config';
import { logger } from '@shared/logger';
import { MongoDB } from '@database/MongoDbConnection';

const bootstrap = async () => {
  const startTime = process.hrtime.bigint();

  const connectServer = new MongoDB()
  await connectServer.connect().then();
  logger.info('Connected to the database MongoDB');

  const { serverHttp } = await require('./http.server');
  await serverHttp();

  const endTime = process.hrtime.bigint();
  const durationMs = Number(endTime - startTime) / 1_000_000;
  logger.info(`Application started in ${durationMs.toFixed(3)} ms`);
};

bootstrap();
