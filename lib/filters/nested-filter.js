'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nestedFilter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boolFilter = require('./bool-filter');

var _boolFilter2 = _interopRequireDefault(_boolFilter);

var _existsFilter = require('./exists-filter');

var _existsFilter2 = _interopRequireDefault(_existsFilter);

var _existsFilter3 = _interopRequireDefault(_existsFilter);

var _missingFilter = require('./missing-filter');

var _missingFilter2 = _interopRequireDefault(_missingFilter);

var _prefixFilter = require('./prefix-filter');

var _prefixFilter2 = _interopRequireDefault(_prefixFilter);

var _rangeFilter = require('./range-filter');

var _rangeFilter2 = _interopRequireDefault(_rangeFilter);

var _termFilter = require('./term-filter');

var _termFilter2 = _interopRequireDefault(_termFilter);

var _termsFilter = require('./terms-filter');

var _termsFilter2 = _interopRequireDefault(_termsFilter);

var FILTERS_MAP = {
  bool: _boolFilter2['default'],
  boolean: _boolFilter2['default'],
  exists: _existsFilter2['default'],
  exist: _existsFilter2['default'],
  matchAll: _existsFilter3['default'],
  matchall: _existsFilter3['default'],
  'match-all': _existsFilter3['default'],
  match_all: _existsFilter3['default'],
  missing: _missingFilter2['default'],
  prefix: _prefixFilter2['default'],
  range: _rangeFilter2['default'],
  term: _termFilter2['default'],
  terms: _termsFilter2['default']
};

/**
 * Construct a Nested filter: a filter inside a filter.
 *
 * elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-filter.html
 *
 * @param  {String} path  Name of the field containing the nested fields.
 * @param  {String} type  Name of the desired nested filter.
 * @param  {String} field Name of the nested field.
 * @param  {Array}  args  Remaining arguments used to construct nested filter.
 * @return {Object}       Nested filter.
 */

function nestedFilter(path, type, field) {
  var klass = FILTERS_MAP[type];
  var nestedField = path + '.' + field;
  var filter = undefined;

  if (!klass) {
    throw new Error('Filter type not found.', type);
  }

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  filter = klass.apply(undefined, [nestedField].concat(args));

  return {
    nested: {
      path: path,
      filter: filter
    }
  };
}

module.exports = exports['default'];