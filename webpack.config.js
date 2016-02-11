'use strict';

const webpack = require('webpack');

module.exports = {
  output: {
    library: 'Bodybuilder',
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
