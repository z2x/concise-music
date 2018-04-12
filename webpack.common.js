const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      // 加载jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      // 加载并处理图片文件，小于limit设置的图片进行转换，以base64的格式被img的src所使用；而对于大于limit byte的图片用file-loader进行解析,并设置文件存储名以及名称
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'imgs/[name].[hash:8].[ext]',
              publishPath: '../',
            },
          },
        ],
      },

      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

      // 加载json
      {
        test: /\.json$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
    ],
  },

  // 忽略引用文件的后缀名
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // 设置html模板
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.tmpl.html`,
    }),
  ],
};
