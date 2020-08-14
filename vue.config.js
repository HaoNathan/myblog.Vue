const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill',
      'Quill': 'quill/dist/quill.js'
    }])
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '空白的一坪';
        return args;
      });
  },

  //本地反向代理获取服务器资源，服务器端需另外配置
  devServer: {
    proxy: {
      'm/api': {
        target: 'https://app.onenine.cc/',
        changeOrigin: true
      },
      '/api': {
        target: 'https://localhost:5001',
        changeOrigin: true
      }
    }
  },

}
