const path = require('path');
const notifier = require('node-notifier');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('../config');
const packageConfig = require('../package.json');
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

const devWebpackConfig = merge(baseWebpackConfig, {
  // add scss & less loader
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
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
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
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
      },
    ],
  },

  // use development sourceMap
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
    watchOptions: {
      poll: config.dev.poll,
    },
  },

  // config development plugin
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.dev.env),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});

if (config.dev.useFriendlyErrorsPlugin) {
  devWebpackConfig.plugins.push(
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${config.dev.host}:${
            config.dev.port
          }`,
        ],
      },
      onErrors: config.dev.notifyOnErrors
        ? (severity, errors) => {
            if (severity !== 'error') {
              return;
            }
            const error = errors[0];
            notifier.notify({
              title: packageConfig.name,
              message: severity + ': ' + error.name,
              subtitle: error.file || '',
              icon: path.join(__dirname, 'logo.png'),
            });
          }
        : undefined,
    }),
  );
}

module.exports = devWebpackConfig;
