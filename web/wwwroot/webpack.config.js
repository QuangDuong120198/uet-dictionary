const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './index.js'),
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './index.js')
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
