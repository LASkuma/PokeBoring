const { resolve } = require('path');
const webpack = require('webpack');

module.exports =  (env) => {
  return {
    entry: {
      main: [
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
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
      filename: '[name].js',
      chunkFilename: 'chunk.[id].js',
      publicPath: '/build/static/'
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ]
  }
};
