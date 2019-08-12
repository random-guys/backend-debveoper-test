module.ecportd = {
  verbose: true,
  testURL: "http://localhost/",
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.js?(x)'],
  setupFilesAfterEnv: [
    './jest.timeout.js',
  ],
};
