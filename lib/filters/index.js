'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boolFilter = require('./bool-filter');

var _boolFilter2 = _interopRequireDefault(_boolFilter);

var _existsFilter = require('./exists-filter');

var _existsFilter2 = _interopRequireDefault(_existsFilter);

var _fuzzyFilter = require('./fuzzy-filter');

var _fuzzyFilter2 = _interopRequireDefault(_fuzzyFilter);

var _geoBoundingBoxFilter = require('./geo-bounding-box-filter');

var _geoBoundingBoxFilter2 = _interopRequireDefault(_geoBoundingBoxFilter);

var _geoDistanceFilter = require('./geo-distance-filter');

var _geoDistanceFilter2 = _interopRequireDefault(_geoDistanceFilter);

var _matchAllFilter = require('./match-all-filter');

var _matchAllFilter2 = _interopRequireDefault(_matchAllFilter);

var _missingFilter = require('./missing-filter');

var _missingFilter2 = _interopRequireDefault(_missingFilter);

var _nestedFilter = require('./nested-filter');

var _nestedFilter2 = _interopRequireDefault(_nestedFilter);

var _prefixFilter = require('./prefix-filter');

var _prefixFilter2 = _interopRequireDefault(_prefixFilter);

var _rangeFilter = require('./range-filter');

var _rangeFilter2 = _interopRequireDefault(_rangeFilter);

var _regexpFilter = require('./regexp-filter');

var _regexpFilter2 = _interopRequireDefault(_regexpFilter);

var _wildcardFilter = require('./wildcard-filter');

var _wildcardFilter2 = _interopRequireDefault(_wildcardFilter);

var _termFilter = require('./term-filter');

var _termFilter2 = _interopRequireDefault(_termFilter);

var _termsFilter = require('./terms-filter');

var _termsFilter2 = _interopRequireDefault(_termsFilter);

var _typeFilter = require('./type-filter');

var _typeFilter2 = _interopRequireDefault(_typeFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use these keys to select the filter type when building a filter clause.
 *
 * @example
 * var body = new Bodybuilder()
 *   .filter('missing', 'user', 'kimchy')
 *   .build()
 */
exports.default = {
  bool: _boolFilter2.default,
  boolean: _boolFilter2.default,
  exists: _existsFilter2.default,
  exist: _existsFilter2.default,
  fuzzy: _fuzzyFilter2.default,
  geo_bounding_box: _geoBoundingBoxFilter2.default,
  geo_distance: _geoDistanceFilter2.default,
  matchAll: _matchAllFilter2.default,
  matchall: _matchAllFilter2.default,
  'match-all': _matchAllFilter2.default,
  match_all: _matchAllFilter2.default,
  missing: _missingFilter2.default,
  nested: _nestedFilter2.default,
  prefix: _prefixFilter2.default,
  range: _rangeFilter2.default,
  regexp: _regexpFilter2.default,
  wildcard: _wildcardFilter2.default,
  term: _termFilter2.default,
  terms: _termsFilter2.default,
  type: _typeFilter2.default
};