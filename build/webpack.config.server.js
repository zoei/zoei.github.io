import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
import config from './webpack.config.base'
import pkg from '../package.json'

const OUTPUT_DIR = path.resolve('./static/home')
const PUBLIC_PATH = '/'

export default {
  ...config,
  entry: {
    app: ['./app/entry-server.js']
  },
  target: 'node',
  devtool: 'source-map',
  output: {
    ...config.output,
    path: OUTPUT_DIR,
    publicPath: PUBLIC_PATH,
    filename: '[chunkhash].js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/
  }),
  // resolve: {
  //   alias: {
  //     File: path.resolve(__dirname, './server-alias/File.js')
  //   }
  // },
  // externals: ['File'],
  plugins: [
    // new CleanWebpackPlugin([path.basename(OUTPUT_DIR)], {
    //   root: path.dirname(OUTPUT_DIR)
    // }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version),
      __DEBUG__: false,
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    ...config.plugins,
    new VueSSRServerPlugin(),
    new ExtractTextPlugin({ filename: '[chunkhash].css', allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   // 最紧凑的输出
    //   beautify: false,
    //   // 删除所有的注释
    //   comments: false,
    //   compress: {
    //     // 在UglifyJs删除没有用到的代码时不输出警告
    //     warnings: false,
    //     // 删除所有的 `console` 语句
    //     // 还可以兼容ie浏览器
    //     drop_console: true,
    //     // 内嵌定义了但是只用到一次的变量
    //     collapse_vars: true,
    //     // 提取出出现多次但是没有定义成变量去引用的静态值
    //     reduce_vars: true
    //   }
    // }),
    new CopyWebpackPlugin([
      // { from: './statics', to: 'statics' }
    ])
  ]
}