import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { envConfig } from '@config/env';

export const RegisterSwaggerDoc = async (fastifyInstance: FastifyInstance) => {
  const prefix = envConfig.API_PREFIX_ROUTE;
  fastifyInstance.register(swagger, {
    openapi: {
      openapi: '3.1.1',
      info: {
        title: 'API-q2tech',
        description:
          '(**API-Q2TECH**) tests. It uses supports an API Key (**x-api-key**) for access control.',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${envConfig.PORT}${prefix}`,
          description: 'Local development server.'
        },
        {
          url: `https://q2tech-hmg.piudev.com.br${prefix}`,
          description: 'Homologation development server.'
        },
        {
          url: `https://q2tech.tech${prefix}`,
          description: 'Production development server.'
        }
      ],
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
            description: 'API key to access this endpoint'
          }
        }
      },
      tags: [{ name: 'Q2tech', description: 'Services related to Q2tech.' }]
    }
  });

  fastifyInstance.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: true,
      docExpansion: 'list',
      tagsSorter: 'alpha'
    },
    staticCSP: true,
    logo: null
  });
};
