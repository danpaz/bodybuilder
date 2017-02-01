'use strict';

var webpack = require('webpack');

module.exports = {
  output: {
    library: 'bodybuilder',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
