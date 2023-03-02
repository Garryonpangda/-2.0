
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target:'http://web118.vipgz6.91tunnel.com/',
        changeOrigin: true, 
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}