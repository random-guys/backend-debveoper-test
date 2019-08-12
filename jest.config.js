module.exports = {
  verbose: true,
  testURL: 'http://localhost:5000/',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.js?(x)'],
  setupFilesAfterEnv: [
    './jest.timeout.js',
  ],
};
