export const DefinitionsExceptionSchema = {
  Error400: {
    description: 'Bad request.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'ERR_VALIDATION' },
            message: { type: 'string', example: 'body must have required property.' }
          }
        }
      }
    }
  },
  Error401: {
    description: 'Unauthorized.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'UNAUTHORIZED' },
            message: { type: 'string', example: 'Unauthorized' }
          }
        }
      }
    }
  },
  Error403: {
    description: 'Forbidden.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'FORBIDDEN' },
            message: { type: 'string', example: 'Forbidden' }
          }
        }
      }
    }
  },
  Error404: {
    description: 'Not found.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'NOT_FOUND' },
            message: { type: 'string', example: 'Resource not found' }
          }
        }
      }
    }
  },
  Error409: {
    description: 'Conflict.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'CONFLICT' },
            message: { type: 'string', example: 'Resource already exists' }
          }
        }
      }
    }
  },
  Error500: {
    description: 'Internal Server Error.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
            message: { type: 'string', example: 'Internal Server error' }
          }
        }
      }
    }
  },
  Error502: {
    description: 'Bad gateway.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'BAD_GATEWAY' },
            message: { type: 'string', example: 'Bad Gateway' }
          }
        }
      }
    }
  },
  Error503: {
    description: 'Service Unavailable',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'SERVICE_UNAVAILABLE' },
            message: { type: 'string', example: 'Service Unavailable' }
          }
        }
      }
    }
  },
  Error504: {
    description: 'Gateway timeout.',
    type: 'object',
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'GATEWAY_TIMEOUT' },
            message: { type: 'string', example: 'Gateway Timeout' }
          }
        }
      }
    }
  }
};
