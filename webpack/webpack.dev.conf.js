const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    quiet: config.dev.isQuietMode,
    overlay: config.dev.errorOverlay
      ? {
          warnings: false,
          errors: true,
        }
      : false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': config.dev.NODE_ENV,
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
  ],
});

module.exports = devWebpackConfig;
