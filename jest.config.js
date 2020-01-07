const path = require('path')
const dotenv = require('dotenv')

const envPath = path.join(__dirname, '.env.test')
const envVars = dotenv.config({ path: envPath }).parsed

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '^constants(.*)$': '<rootDir>/src/constants$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^contexts(.*)$': '<rootDir>/src/contexts$1',
    '^hocs(.*)$': '<rootDir>/src/hocs$1',
  },
  testMatch: ['/**/*test.js'],
  roots: ['<rootDir>', '<rootDir>/src', '<rootDir>/__mocks__', '<rootDir>/test'],
  testURL: envVars.BASE_URL,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  collectCoverageFrom: ['./src/**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: './coverage',
  globals: {
    config: envVars,
  },
}
