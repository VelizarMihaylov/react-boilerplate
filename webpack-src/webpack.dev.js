import {rules, output, extentions, alias} from './webpack.shared.config.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import webpack from 'webpack'
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', 'whatwg-fetch', 'react-hot-loader/patch', './src/index.js'],
  module: {
    // This is added to avoid warnings generated by some of the dev tools
    // The prod Webpack config should compile fine without it
    exprContextCritical: false,
    rules: rules
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  plugins: [
    new Dotenv({
      path: './.env'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new FlowBabelWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} })
  ],
  output: output,
  resolve: {
    alias: alias,
    extensions: extentions
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  externals: {
    winston: 'winston'
  }
}
