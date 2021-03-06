const path = require('path')
const {
  HtmlWebpackPlugin,
  HtmlWebpackHarddiskPlugin,
  FlowBabelWebpackPlugin,
  webpack
} = require('spa-webpack')
const {
  rules,
  output,
  extensions,
  alias,
  webpackCleanPlugin
} = require('./webpack.shared.config')

// The public path for dev build should always default to '/'
output.publicPath = '/'

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, 'node_modules/spa-webpack/node_modules/react-hot-loader/patch'), path.resolve('./', 'src/index.js')],
  module: {
    // This is added to avoid warnings generated by some of the dev tools
    // The prod Webpack config should compile fine without it
    exprContextCritical: false,
    rules: rules
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    webpackCleanPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new FlowBabelWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} })
  ],
  output: output,
  resolve: {
    alias: alias,
    extensions: extensions
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules/spa-webpack/node_modules/'), 'node_modules']
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  externals: {
    winston: 'winston'
  }
}
