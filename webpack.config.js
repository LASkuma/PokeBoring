const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports =  (env) => {
  return {
    devtool: false,
    entry: {
      main: [
        './client/index.js'
      ],
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'redux',
        'react-redux'
      ]
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name]_[chunkhash].js',
      chunkFilename: 'chunk_[chunkhash].js',
      publicPath: '/static/'
    },
    context: resolve(__dirname, 'src'),
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015-webpack', 'react']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename:'vendor_[chunkhash].js', minChunks: 2 }),
      new AssetsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
          screw_ie8: true
        }
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        '__DEV__': false
      })
    ]
  }
};
