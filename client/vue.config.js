const path = require('path')

module.exports = {

  "transpileDependencies": [
    "vuetify"
  ],

  // Change title
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Stock App'
      return args
    })
  },

  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },

}