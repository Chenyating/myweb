
const webpack = require('webpack')
module.exports = {
  modules: [
    '@nuxtjs/axios', '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      // target: 'http://172.28.194.52:3000/', // 目标接口域名
      target: 'http://192.168.43.121:3000/', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'myweb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    // 引入iview；
    { src: '~plugins/iview', ssr: true },
    // 引入mavonEditor
    { src: '@/plugins/vue-mavon-editor', srr: false },
    
  ],
  css: ['~assets/css/base.less'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        }
        )
      }
    },
    vendor: ['axios'] //为防止重复打包,
  }
}

