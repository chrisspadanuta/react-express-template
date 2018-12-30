/**
 * Webpack configuration for development
 */

import path from 'path';

export default {
  devtool: 'eval-source-map',
  entry: path.join(process.cwd(), 'src/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
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
  target: 'web',
};
