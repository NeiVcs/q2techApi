import { FastifySchema } from 'fastify/types/schema';
import { DefinitionsExceptionSchema } from '@shared/exceptions';

export const HealthSchema: FastifySchema = {
  description: 'Health api',
  summary: 'Health api status',
  tags: ['Health'],
  response: {
    200: {
      description: 'Health check.',
      type: 'object',
      properties: {
        status: {
          type: 'string',
          description: 'Status of application.',
          example: 'OK'
        },
        uptime: {
          type: 'number',
          description: 'Returns the time in seconds since the process was started.',
          example: '6.785088192'
        },
        timestamp: {
          type: 'string',
          description: 'Current date and time of the application server.',
          format: 'date-time'
        }
      }
    },
    503: DefinitionsExceptionSchema.Error503
  }
};
