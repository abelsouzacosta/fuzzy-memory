export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@presentationErrors/(.*)': '<rootDir>/src/presentation/errors/$1',
    '@client/(.*)': '<rootDir>/src/client/$1',
  },
};
