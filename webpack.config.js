/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let libraryName = 'pwall-sdk';

let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ uglifyOptions:{minimize: true}}));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}
const config = {
    entry: ['./index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: outputFile,
      libraryTarget: 'this',
      library: 'PWall'
    },
    module: {
      rules: [
        {
          test: require.resolve('zepto'),
          use: {
            loader: 'imports-loader',
            options: 'this=>window',
          },
        },
        {
          test: /\.js$/,
          use:'babel-loader',
          exclude:  /node_modules/
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(lit-element|lit-html))/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                }
              ]
            ],
            plugins: [
              ['@babel/plugin-transform-runtime']
            ],
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions:{
            test: /\.js(\?.*)?$/i,
          }
        }),
      ], 
    },
    // devServer:{
    //   port: 3000,
    //   contentBase: __dirname + '/build',
    //   inline: true
    // },
    plugins: plugins
}
module.exports = config;