const path = require('path');
const config = require('../config');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: resolve('src/js/main.js'),
    vendor: ['lodash'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
};
