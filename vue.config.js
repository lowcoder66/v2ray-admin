module.exports = {
  publicPath:  process.env.NODE_ENV === 'development' ? '/' : './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
