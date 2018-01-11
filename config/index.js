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
    projectTitle: 'Webpack-Development',

    // watch duration 1s
    poll: 1000,
  },
  build: {
    env: 'production',
    assetsPublicPath: './',
    productionSourceMap: true,
    devtool: 'source-map',
    projectTitle: 'Webpack-Production',
  },
  test: {
    env: 'testing',
  },
};
