module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          assets: '@/assets',
          con: '@/components', // src/components ==>@components ==> con
          views: '@/views'
        }
      }
    },

      css: {
           loaderOptions: {
            css: {},
             postcss: {
               plugins: [
                 require('postcss-px2rem')({
                   remUnit: 37.5
                 })
              ]
            }
          }
      },

      transpileDependencies: ['webpack-dev-server/client'],
      chainWebpack: config => {
        config.entry.app = ['babel-polyfill', './src/main.js'];
      }
}
  