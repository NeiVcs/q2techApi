import { IntegrationLoggerType } from '@shared/integrations/logger/types';
import { elapsedTime } from '@shared/elapsedTime';
import { logger } from '@shared/logger';

export function successIntegrationLogger(loggerType: IntegrationLoggerType) {
  loggerType.elapsedTime = elapsedTime(loggerType.startTime);
  loggerType.startTime = undefined;
  if (loggerType.method && loggerType.method.startsWith('GET')) {
    loggerType.responseBody = {};
  }
  logger.info(loggerType);
}

export function errorIntegrationLogger(loggerType: IntegrationLoggerType) {
  loggerType.elapsedTime = elapsedTime(loggerType.startTime);
  loggerType.startTime = undefined;
  logger.error(loggerType);
}
