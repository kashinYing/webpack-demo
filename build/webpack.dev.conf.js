const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

const extractSass = new ExtractTextPlugin({
  filename:
    process.env.NODE_ENV === 'development'
      ? 'css/[name].[hash].css'
      : 'css/[name].[contenthash].css',
});

const extractLess = new ExtractTextPlugin({
  filename:
    process.env.NODE_ENV === 'development'
      ? 'css/[name].[hash].css'
      : 'css/[name].[contenthash].css',
});

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  devtool: config.dev.devtool,
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.join(config.dev.assetsPublicPath, 'index.html'),
        },
      ],
    },
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
    extractSass,
    extractLess,
  ],
});

console.log(devWebpackConfig.module);

module.exports = devWebpackConfig;
