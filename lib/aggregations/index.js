'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _termsAggregation = require('./terms-aggregation');

var _termsAggregation2 = _interopRequireDefault(_termsAggregation);

var _maxAggregation = require('./max-aggregation');

var _maxAggregation2 = _interopRequireDefault(_maxAggregation);

var _minAggregation = require('./min-aggregation');

var _minAggregation2 = _interopRequireDefault(_minAggregation);

exports['default'] = {
  terms: _termsAggregation2['default'],
  min: _minAggregation2['default'],
  max: _maxAggregation2['default']
};
module.exports = exports['default'];