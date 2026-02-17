import { logger } from '@shared/logger';
import 'dotenv/config';
import Mongoose, { ConnectOptions } from 'mongoose';

export class MongoDB {
  protected database: Mongoose.Connection;

  constructor() {
    if (!process.env.MONGODB_URL) {
      process.exit(1);
    }
  }

  public async connect(): Promise<void> {
    if (this.database) {
      return;
    }

    try {
      const options: ConnectOptions = {};
      Mongoose.set('strictQuery', false);
      const db = await Mongoose.connect(process.env.MONGODB_URL, options);
      this.database = db.connection;
    } catch (e) {
      logger.info(e)
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.database) {
      return;
    }

    try {
      await this.database.close(false);
    } catch (e) {
      logger.info(e)
    }
  }
}
