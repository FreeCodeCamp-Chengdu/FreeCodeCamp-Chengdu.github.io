module.exports = {
  presets: [
    // https://babeljs.io/docs/babel-preset-react
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins: [
    // https://github.com/babel/babel/issues/16262#issuecomment-1962832499
    [
      '@babel/plugin-transform-typescript',
      {
        allowDeclareFields: true,
        allowNamespaces: true,
        allExtensions: true,
        isTSX: true,
      },
    ],
    // https://babeljs.io/docs/babel-plugin-proposal-decorators#note-compatibility-with-babelplugin-transform-class-properties
    ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
  ],
};
