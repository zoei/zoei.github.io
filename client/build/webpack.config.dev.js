import webpack from 'webpack'
import path from 'path'
import pkg from '../package.json'
import config from './webpack.config.base'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 18011 
const PUBLIC_PATH = process.env.path || '/'

export default {
  ...config,
  devServer: {
    contentBase: '.',
    publicPath: PUBLIC_PATH,
    compress: true,
    hot: true,
    disableHostCheck: true,
    host: HOST,
    port: PORT,
    // noInfo: true
    historyApiFallback: true
  },
  devtool: 'eval',
  entry: {
    app: [
      'es6-promise/auto',
      'babel-polyfill',
      './src/entry-client.js'
    ]
  },
  output: {
    ...config.output,
    filename: '[name].js',
    path: '/',
    publicPath: PUBLIC_PATH + '/'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version),
      __DEBUG__: true,
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    ...config.plugins
  ]
}