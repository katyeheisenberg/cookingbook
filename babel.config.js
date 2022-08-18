module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'css-modules-transform',
      {
        extensions: ['.styl', '.css', '.scss']
      }
    ]
  ]
}
