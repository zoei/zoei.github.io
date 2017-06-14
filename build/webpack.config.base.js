import 'babel-polyfill'
import path from 'path'
import webpack from 'webpack'
import poststylus from 'poststylus'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

export const loaders = {
  js: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ["vue-app", "stage-0", "stage-3"],
          plugins: [
            "transform-runtime",
            "transform-decorators-legacy",
            ["component", [
              {
                "libraryName": "mint-ui",
                "style": true
              }
            ]]
          ]
        }
      }
    ]
  },
  vue: {
    test: /\.vue$/,
    exclude: /node_modules/,
    use: ['vue-loader']
  },
  image: {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 4,
          name: 'images/[name]-[hash:base64:5].[ext]?[hash]'
        }
      }
    ]
  },
  css: {
    test: /\.css$/,
    use: [{
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      query: {
        plugins: ()=>{
          return [
            autoprefixer({ browsers: ['> 1%', 'IE 8'] })
          ]
        }
      }
    }]
  },
  stylus: {
    test: /\.styl$/,
    use: [{
      loader: 'css-loader',
      options: {
        // modules: true,
        sourceMap: false,
        importLoaders: 1,
        // localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }, {
      loader: 'stylus-loader',
      options: {
        use: [
          poststylus([
            autoprefixer({ browsers: ['> 5%', 'IE 11'] })
          ])
        ]
      }
    }]
  },
  woff: {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    }]
  },
  ttf: {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream'
      }
    }]
  },
  svg: {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml'
      }
    }]
  },
  eot: {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: 'file-loader'
  },
}
export default {
  // context: path.resolve(__dirname, '..'),
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './dist',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    alias: {
    },
    extensions: ['.web.js', '.js', '.styl'],
    // mainFields: ['main', 'jsnext:main']
  },
  externals: {
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      loaders.js,
      loaders.vue,
      loaders.image,
      loaders.woff,
      loaders.ttf,
      loaders.svg,
      loaders.eot,
      { ...loaders.css, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: loaders.css.use, publicPath: './', allChunks: true }) },
      { ...loaders.stylus, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: loaders.stylus.use, publicPath: './', allChunks: true }) }
    ]
  },
  plugins: [
  ],
  performance: {
    hints: false,
    maxAssetSize: 100000000
  },
  stats: {
    timings: true
  }
}