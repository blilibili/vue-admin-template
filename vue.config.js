const path = require('path');
const PROXY_API = process.env.VUE_APP_PROXY_API;

function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports={
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 生产环境使用相对路径，开发环境使用根路径
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录，默认为dist目录
  lintOnSave: process.env.NODE_ENV !== 'production', // 在生产构建时禁用 eslint-loader
  productionSourceMap: false, // 不需要生产环境的 source map,加速打包速度
  configureWebpack: { // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    plugins: [

    ]
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `styles/base.scss` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "~@/styles/base.scss";` //
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@src', resolve('src'))
  },
  // 代理服务器配置
  devServer: {
    // open: true,
    // hot: true,
    // host: '0.0.0.0', // 指定要使用的主机。如果您希望您的服务器可以在外部访问
    // port: 80,
    // proxy: {            // PROXY_API的请求会将请求代理到http://10.130.131.30:5004/。 如果您不想/PROXY_API被传递，我们需要重写路径
      // [`/${PROXY_API}`]: {
      //   target: '', // 源地址 sit
      //   changeOrigin: false,
      //   xfwd: true,
      //   autoRewrite: true,
      //   pathRewrite: {
      //     [`^/${PROXY_API}`]: ''
      //   }
      // },
      // '/product': {
      //   target: 'http://10.130.36.167:4002',
      //   changeOrigin: true
      // }
    // },
    // mock data
    contentBase: path.join(__dirname, 'public'), // devServer里面的contentBase表示的是告诉服务器从哪里提供内容
    compress: true, // 对所有服务启用gzip压缩
    before: function(app, server, compiler) { // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能。这可以用于定义自定义处理程序，这里在接口没通之前引用mock数据
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }

}