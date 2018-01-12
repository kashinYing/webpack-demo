const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true,
});

const extractLess = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true,
});

const prodWebpackConfig = merge(baseWebpackConfig, {
  // add scss & less loader
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

  // use production sourceMap
  devtool: config.build.devtool,

  // use chunkhash in production
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },

  // config production plugin
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.build.env),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false,
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    }),

    // add Sass & Less extract plugin
    extractSass,
    extractLess,

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // learn from vue-cli
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),

    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      // learn from vue-cli
      chunksSortMode: 'dependency',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  prodWebpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$',
      ),
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;
