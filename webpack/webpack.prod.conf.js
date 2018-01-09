const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

const prodWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.sourceMap,

  // use chunkhash in production
  output: {
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[id].[chunkhash].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': config.build.NODE_ENV,
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new UglifyJSPlugin({
      sourceMap: config.build.productionSourceMap,
    }),
  ],
});

module.exports = prodWebpackConfig;
