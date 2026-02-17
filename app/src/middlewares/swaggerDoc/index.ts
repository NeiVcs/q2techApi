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
        title: 'ms-boleto',
        description:
          'This bill payment (**MS-BOLETO**) exposes services for managing and processing bill payments, with routes organized by business context for Legal Entities (`PJ`) and Individuals (`PF`). It uses supports an API Key (**x-api-key**) for access control.',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${envConfig.PORT}${prefix}`,
          description: 'Local development server.'
        },
        {
          url: `https://ms-boleto-hmg.piudev.com.br${prefix}`,
          description: 'Homologation development server.'
        },
        {
          url: `https://ms-boleto.bepay.tech${prefix}`,
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
      tags: [{ name: 'Bill Payments', description: 'Services related to bill payments.' }]
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
