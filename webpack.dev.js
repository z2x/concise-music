const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {

  devtool: 'inline-source-map',

  entry: {
    app: './src/index.jsx',
  },

  output: {
    filename: 'bundle.js',
  },

  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      },

      // 加载scss
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'sass-loader', // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  // 配置webpack-dev-server
  devServer: {
    hot: true,
    open: true,
    inline: true
  },

  plugins: [
    //   热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ]
});