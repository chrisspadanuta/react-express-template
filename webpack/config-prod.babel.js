/**
 * Webpack configuration for production
 */

import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: path.join(process.cwd(), 'frontend/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public', 'js'),
    publicPath: '/js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s)?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};
