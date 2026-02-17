export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  transformIgnorePatterns: ['/node_modules/(?!uuid)/'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  verbose: true,
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src', 'tests'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json-summary', 'text', 'lcov', 'html'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/modules/**/controllers/**/*.ts',
    'src/modules/**/transformers/**/*.ts',
    'src/modules/**/services/**/*.ts',

    //Ignore patterns
    '!src/modules/**/dto/**/*.ts',
    '!src/modules/**/schemas/**/*.ts',
    '!src/modules/**/index.ts',
    '!src/modules/**/*.routes*.ts',
    '!src/database/**/*',
    '!src/config/**/*'
  ],
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@integrations/(.*)$': '<rootDir>/src/integrations/$1',
    '^@queues/(.*)$': '<rootDir>/src/queues/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1'
  }
};
