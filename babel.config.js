const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '40',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '2.6.9',
    },
  ],
];
module.exports = { presets };
