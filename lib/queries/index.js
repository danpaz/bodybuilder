'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fuzzyQuery = require('./fuzzy-query');

var _fuzzyQuery2 = _interopRequireDefault(_fuzzyQuery);

var _matchQuery = require('./match-query');

var _matchQuery2 = _interopRequireDefault(_matchQuery);

var _rangeQuery = require('./range-query');

var _rangeQuery2 = _interopRequireDefault(_rangeQuery);

var _termQuery = require('./term-query');

var _termQuery2 = _interopRequireDefault(_termQuery);

var _termsQuery = require('./terms-query');

var _termsQuery2 = _interopRequireDefault(_termsQuery);

exports['default'] = {
  fuzzy: _fuzzyQuery2['default'],
  match: _matchQuery2['default'],
  range: _rangeQuery2['default'],
  term: _termQuery2['default'],
  terms: _termsQuery2['default']
};
module.exports = exports['default'];