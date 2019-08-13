/* eslint-disable linebreak-style */
module.exports = {
  verbose: true,
  roots: [
    '<rootDir>',
  ],
  modulePaths: [
    '<rootDir>',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.js?(x)'],
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
};
