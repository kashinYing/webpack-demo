const path = require('path');
const config = require('../config');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: resolve('src/js/main.js'),
    // another: resolve('src/js/another.js'),
    vendor: ['lodash'],
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[id].[hash].bundle.js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    // default value are js & json
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
    modules: [resolve('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
