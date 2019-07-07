module.exports = {
  assetsDir: 'public',
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      https: false,
      proxy: {
        '/_api': {
          target: 'http://localhost:8000/',
          pathRewrite: {},
          secure: false
        }
      }
    }
  },
  publicPath: '/base-path/'
};
