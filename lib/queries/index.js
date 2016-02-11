'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boolQuery = require('./bool-query');

var _boolQuery2 = _interopRequireDefault(_boolQuery);

var _fuzzyQuery = require('./fuzzy-query');

var _fuzzyQuery2 = _interopRequireDefault(_fuzzyQuery);

var _matchQuery = require('./match-query');

var _matchQuery2 = _interopRequireDefault(_matchQuery);

var _multiMatchQuery = require('./multi-match-query');

var _multiMatchQuery2 = _interopRequireDefault(_multiMatchQuery);

var _queryStringQuery = require('./query-string-query');

var _queryStringQuery2 = _interopRequireDefault(_queryStringQuery);

var _rangeQuery = require('./range-query');

var _rangeQuery2 = _interopRequireDefault(_rangeQuery);

var _termQuery = require('./term-query');

var _termQuery2 = _interopRequireDefault(_termQuery);

var _termsQuery = require('./terms-query');

var _termsQuery2 = _interopRequireDefault(_termsQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use these keys to select the query type when building a query clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .query('query_string', 'this AND that')
 *   .build()
 */
exports.default = {
  bool: _boolQuery2.default,
  boolean: _boolQuery2.default,
  fuzzy: _fuzzyQuery2.default,
  match: _matchQuery2.default,
  multi_match: _multiMatchQuery2.default,
  multiMatch: _multiMatchQuery2.default,
  query_string: _queryStringQuery2.default,
  'query-string': _queryStringQuery2.default,
  queryString: _queryStringQuery2.default,
  range: _rangeQuery2.default,
  term: _termQuery2.default,
  terms: _termsQuery2.default
};