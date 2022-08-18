/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-preset-env'),
    require('tailwindcss')('./tailwind.config.js')
  ]
}
