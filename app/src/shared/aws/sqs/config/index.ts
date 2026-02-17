import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { getAwsAccountId } from '@shared/aws/awsAccountId';
import { envConfig } from '@config/env';
import { logger } from '@shared/logger';

/**
 * Singleton utility class for building and managing AWS SQS clients and queues URLs.
 *
 * Supports both AWS and LocalStack environments, with internal caching of SQSClient instance
 * and AWS Account ID to avoid redundant computations or STS calls.
 */
export class SqsConfig {
  private static clientInstance?: SQSClient;
  private static awsAccountId?: string;
  private static awsAccountIdPromise?: Promise<string>;

  /**
   * Returns the singleton instance of {@link SQSClient}.
   *
   * If the instance does not yet exist, it will be created based on environment settings.
   * LocalStack-specific configuration is applied when `USE_LOCALSTACK` is enabled.
   *
   * @returns {SQSClient} A configured and reused SQS client instance.
   */
  public static getClient(): SQSClient {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    const config: SQSClientConfig = {
      region: envConfig.AWS_REGION
    };

    if (this.isLocalstack) {
      config.endpoint = envConfig.URL_LOCALSTACK;
      config.credentials = {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      };
      logger.warn(`SQS using localstack. ${envConfig.URL_LOCALSTACK}`);
    }

    this.clientInstance = new SQSClient(config);
    return this.clientInstance;
  }

  /**
   * Builds and returns the fully qualified SQS queues URL given a queues name.
   * Caches AWS Account ID after the first call.
   *
   * @param queueName - The SQS queues name.
   * @returns Promise resolving to the queues URL.
   */
  public static async builderQueueUrl(queueName: string): Promise<string> {
    if (this.isLocalstack) {
      return `${envConfig.URL_LOCALSTACK}/000000000000/${queueName}`;
    }

    if (this.awsAccountId) {
      return this.buildAwsQueueUrl(queueName, this.awsAccountId);
    }

    if (!this.awsAccountIdPromise) {
      this.awsAccountIdPromise = getAwsAccountId();
    }

    this.awsAccountId = await this.awsAccountIdPromise;

    if (!this.awsAccountId) {
      throw new Error('Could not retrieve AWS Account ID');
    }

    return this.buildAwsQueueUrl(queueName, this.awsAccountId);
  }

  /**
   * Whether the environment is configured to use LocalStack.
   *
   * @returns {boolean}
   */
  private static get isLocalstack(): boolean {
    return envConfig.USE_LOCALSTACK;
  }

  /**
   * Internal helper to build AWS SQS queues URL for real AWS environment.
   *
   * @param queueName - Queue name.
   * @param accountId - AWS Account ID.
   * @returns Full queues URL.
   */
  private static buildAwsQueueUrl(queueName: string, accountId: string): string {
    const region = envConfig.AWS_REGION;
    return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
  }
}
