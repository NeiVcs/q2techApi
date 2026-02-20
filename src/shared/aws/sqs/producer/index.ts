import { MessageAttributeValue, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { SqsConfig } from '../config';
import { SqsProducerOptions } from '../types';
import { singleton } from 'tsyringe';
import { AsyncHooksContext } from '@shared/asyncHooks';
import { generateUuidV7 } from '@shared/uuid';
import { logger } from '@shared/logger';

/**
 * SqsProvider is responsible for sending messages to an AWS SQS queues.
 */
@singleton()
export class SqsProvider {
  private readonly sqsClient: SQSClient;

  constructor() {
    this.sqsClient = SqsConfig.getClient();
  }

  /**
   * Sends a message to a specific SQS queues.
   *
   * @template T The type of the data being sent in the message body.
   * @param queueName The name of the target SQS queues.
   * @param data The payload to be sent to the queues. Will be stringified.
   * @param options Optional configuration including retry attempt count and delay in seconds.
   *
   * @throws Will throw an error if the message fails to be sent.
   *
   * @example
   * const producer = new SqsProducer();
   * await producer.sendMessage('my-queues', { event: 'user.created' }, { delaySeconds: 5 });
   */
  public async sendMessage<T = any>(queueName: string, data: T, options?: SqsProducerOptions): Promise<void> {
    try {
      const message = JSON.stringify(data);
      const queueUrl = await SqsConfig.builderQueueUrl(queueName);

      const messageAttributes: Record<string, MessageAttributeValue> = {
        RequestId: {
          DataType: 'String',
          StringValue: AsyncHooksContext.getContext()?.requestId || generateUuidV7()
        }
      };

      if (options?.attempt > 0) {
        messageAttributes['AttemptCount'] = {
          DataType: 'String',
          StringValue: String(options?.attempt)
        };
      }

      const sendMessageCommand = new SendMessageCommand({
        MessageBody: message,
        QueueUrl: queueUrl,
        MessageAttributes: messageAttributes,
        DelaySeconds: options?.delaySeconds || undefined
      });

      await this.sqsClient.send(sendMessageCommand);
    } catch (error) {
      logger.error({ error }, `❌ [QueueName: ${queueName}] Failed to send message to SQS.`);
      throw error;
    }
  }
}
