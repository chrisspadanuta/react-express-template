/**
 * Webpack configuration for development
 */

import path from 'path';

export default {
  devtool: 'eval-source-map',
  entry: path.join(process.cwd(), 'frontend/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public', 'js'),
    publicPath: '/js',
  },
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
