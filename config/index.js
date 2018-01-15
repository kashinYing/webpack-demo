const path = require('path');

module.exports = {
  dev: {
    env: 'development',
    assetsPublicPath: '/',
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    isQuietMode: false,
    devtool: 'cheap-module-eval-source-map',
    proxyTable: {},
    errorOverlay: true,
    notifyOnErrors: true,

    // config Eslint in webpack
    useEslint: true,
    showEslintErrorsInOverlay: true,
    eslintQuiet: false,

    // watch duration 1s
    poll: 1000,

    useFriendlyErrorsPlugin: false,
  },
  build: {
    env: 'production',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: 'source-map',

    // compress big file to gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // generate bundle report
    bundleAnalyzerReport: true,
  },
  test: {
    env: 'testing',
  },
};
