import { pino } from 'pino';
import { AsyncHooksContext } from '@shared/asyncHooks';
import { generateUuidV7 } from '@shared/uuid';

const CENSORED_FIELDS = [
  'x-mtls-clientcert-subject',
  'x-mtls-clientcert-leaf',
  'x-mtls-clientcert-serial-number',
  'Authorization',
  'authorization',
  'x-api-key',
  'api-key',
  'access-token',
  'access-key',
  'api-access-key',
  'secret_key',
  'secretKey',
  'secret-key',
  'api-secret-key',
  'accessToken',
  'access_token',
  'taxId',
  'cpf',
  'cnpj',
  'cpfCnpj',
  'pin',
  'senha',
  'secret',
  'secrets',
  'password',
  'token',
  'refreshToken',
  'refresh_token'
];

const redactPaths = CENSORED_FIELDS.flatMap((field) => [`*.${field}`, `*.*.${field}`]);

export const logger = pino({
  level: 'info',
  messageKey: 'message',
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  errorKey: 'error',
  mixin() {
    return { requestId: AsyncHooksContext.getContext()?.requestId || generateUuidV7() };
  },
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            ignore: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            messageKey: 'mensagem'
          }
        }
      : undefined,
  redact: {
    paths: redactPaths,
    censor: '***'
  },
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    }
  }
});
