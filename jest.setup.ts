import 'reflect-metadata';
import 'dotenv/config';

// Mock axios para evitar chamadas reais durante os testes e garantir compatibilidade com interceptors
jest.mock('axios', () => {
  const mAxiosInstance = {
    post: jest.fn().mockResolvedValue({
      data: {
        access_token: 'fake-token',
        expires_in: 3600
      }
    }),
    get: jest.fn().mockResolvedValue({ data: { drawee: {}, beneficiary: {}, finalBeneficiary: {}, paymentDetails: {}, settings: {}, financialInstitutionDetails: {}, status: '' } }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
    request: jest.fn().mockResolvedValue({ data: { drawee: {}, beneficiary: {}, finalBeneficiary: {}, paymentDetails: {}, settings: {}, financialInstitutionDetails: {}, status: '' } }),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  };
  return {
    create: () => mAxiosInstance,
    post: mAxiosInstance.post,
    get: mAxiosInstance.get,
    put: mAxiosInstance.put,
    delete: mAxiosInstance.delete,
    request: mAxiosInstance.request
  };
});

jest.mock('@config/env', () => ({
  envConfig: {
    NODE_ENV: 'test',
    AWS_REGION: 'us-east-1',
    AWS_ACCOUNT_ID: '123456789012',
    USE_REDIS_LOCALHOST: true,
    USE_LOCALSTACK: true,
    MP_SECRET_KEY: 'test-mp-secret-key-123456789012345678901234567890123456',
    MP_ACCESS_KEY: 'test-mp-access-key-123456789012345678901234567890123456',
    MATERA_URL: 'http://localhost',
    API_KEY_API: 'test-api-key-123456789012345678901234567890123456',
    MYSQL_HOST: 'localhost',
    MYSQL_DATABASE: 'test',
    MYSQL_USERNAME: 'test',
    MYSQL_PASSWORD: 'test',
    REDIS_HOST: 'localhost',
    REDIS_PORT: '6379',
    PORT: 3000,
    ENABLED_SWAGGER: false,
    MP_AUTH_URL: 'http://localhost',
    MP_AUTH_CLIENT_ID: 'test',
    MP_AUTH_CLIENT_SECRET: 'test',
    URL_LOCALSTACK: 'http://localhost',
    BODY_LIMIT: 2097152,
    FILE_LIMIT_UPLOAD: 10485760
  }
}));
