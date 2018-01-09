const path = require('path');

module.exports = {
  dev: {
    NODE_ENV: '"development"',
    assetsPublicPath: '/',
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    isQuietMode: false,
    devtool: 'cheap-module-eval-source-map',
    proxyTable: {},
    errorOverlay: true,
  },
  build: {
    NODE_ENV: '"production"',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: 'source-map',
  },
  test: {
    NODE_ENV: '"testing"',
  },
};
