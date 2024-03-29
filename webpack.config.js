const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
})

var DIST_DIR = path.resolve(__dirname, 'dist')
var SRC_DIR = path.resolve(__dirname, 'src')

var config = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                  node: 'current',
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.parsed) }),
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: './src/index.html',
      filename: '../index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './src'),
    ],
  },
}

module.exports = config
