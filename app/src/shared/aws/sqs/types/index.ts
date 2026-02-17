/**
 * Options for sending messages to an SQS queues.
 */
export type SqsProducerOptions = {
  /**
   * The number of seconds to delay the delivery of the message.
   */
  delaySeconds: number | undefined;

  /**
   * Optional retry attempt number for the message.
   */
  attempt?: number;
};
