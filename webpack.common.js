const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: { 
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),      
    },
  
    extensions: ['*', '.js', '.jsx'] 
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), 
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
};