var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    app: './src/app.jsx',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/src'),
        exclude: /(vendor|node_modules)/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
  resolve: {
    modulesDirectories: [path.join(__dirname, '/src'), 'node_modules'],
    extensions: ['', '.jsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
  },
};

module.exports = config;
