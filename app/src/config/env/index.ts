import 'dotenv/config';
import { z } from 'zod/v4';
import * as process from 'node:process';
import { logger } from '@shared/logger';

/**
 * Set environment variables scheme
 * */
const envSchema = z
  .object({
    APPLICATION_NAME: z.string().optional().default('ms-boleto'),

    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    PORT: z.string().regex(/^\d+$/, 'Server PORT must be a number.').default('3005'),

    API_KEY_API: z.string().min(36, 'API_KEY_API is mandatory.'),

    BODY_LIMIT: z
      .number()
      .optional()
      .describe('Body size limit. Default: 2MB')
      .default(2 * 1024 * 1024),
    FILE_LIMIT_UPLOAD: z
      .number()
      .optional()
      .describe('Upload file size limit. Default: 10MB')
      .default(10 * 1024 * 1024),
    API_PREFIX_ROUTE: z.string().optional().default('/ms-boleto'),

    ENABLED_SWAGGER: z.string().optional(),

    AWS_REGION: z.enum(['us-east-1', 'us-west-2']).default('us-east-1'),

    USE_LOCALSTACK: z
      .preprocess((val) => {
        if (typeof val === 'string') {
          return val === 'true';
        }
        return val;
      }, z.boolean().optional())
      .default(false),
    URL_LOCALSTACK: z.string().min(1, 'URL_LOCALSTACK is mandatory.').nullable().optional()
  })
  .check(({ value, issues }) => {
    if (value.USE_LOCALSTACK && (!value.URL_LOCALSTACK || value.URL_LOCALSTACK.trim() === '')) {
      issues.push({
        input: value.URL_LOCALSTACK,
        path: ['URL_LOCALSTACK'],
        message: 'URL_LOCALSTACK is required when USE_LOCALSTACK is true',
        code: 'custom'
      });
    }
  });

/**
 * Set environment variables and validate
 * */
export const loadEnvConfig = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const error = JSON.parse(result.error.message)
      .map((m) => m.path)
      .join(', ');
    logger.error(`Environment variables validation error. Not found env: ${error}`);
    throw new Error('API Environment variables validation error.');
  }

  return {
    ...result.data,
    PORT: Number(result.data.PORT)
  };
};

export const envConfig = loadEnvConfig();
