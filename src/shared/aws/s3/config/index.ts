import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import https from 'https';
import { logger } from '@shared/logger';
import { envConfig } from '@config/env';

/**
 * Singleton utility class for building and managing AWS S3 clients and queues URLs.
 *
 * Supports both AWS and LocalStack environments, with internal caching of S3Client instance
 * and AWS Account ID to avoid redundant computations or STS calls.
 */
export class S3Config {
  private static clientInstance?: S3Client;

  /**
   * Returns the singleton instance of {@link S3Client}.
   *
   * If the instance does not yet exist, it will be created based on environment settings.
   * LocalStack-specific configuration is applied when `USE_LOCALSTACK` is enabled.
   *
   * @returns {S3Client} A configured and reused S3 client instance.
   */
  public static getClient(): S3Client {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    const config: S3ClientConfig = {
      region: envConfig.AWS_REGION
    };

    if (this.isLocalstack) {
      config.endpoint = envConfig.URL_LOCALSTACK;
      config.credentials = {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      };
      config.forcePathStyle = true;
      logger.warn(`S3 using localstack. ${envConfig.URL_LOCALSTACK}`);

      this.clientInstance = new S3Client(config);
      return this.clientInstance;
    }

    config.requestHandler = new NodeHttpHandler({
      httpsAgent: new https.Agent({
        keepAlive: true,
        maxSockets: Infinity
      })
    });

    this.clientInstance = new S3Client(config);
    return this.clientInstance;
  }

  /**
   * Whether the environment is configured to use LocalStack.
   *
   * @returns {boolean}
   */
  private static get isLocalstack(): boolean {
    return envConfig.USE_LOCALSTACK;
  }
}
