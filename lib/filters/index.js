'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boolFilter = require('./bool-filter');

var _boolFilter2 = _interopRequireDefault(_boolFilter);

var _existsFilter = require('./exists-filter');

var _existsFilter2 = _interopRequireDefault(_existsFilter);

var _existsFilter3 = _interopRequireDefault(_existsFilter);

var _missingFilter = require('./missing-filter');

var _missingFilter2 = _interopRequireDefault(_missingFilter);

var _nestedFilter = require('./nested-filter');

var _nestedFilter2 = _interopRequireDefault(_nestedFilter);

var _prefixFilter = require('./prefix-filter');

var _prefixFilter2 = _interopRequireDefault(_prefixFilter);

var _rangeFilter = require('./range-filter');

var _rangeFilter2 = _interopRequireDefault(_rangeFilter);

var _termFilter = require('./term-filter');

var _termFilter2 = _interopRequireDefault(_termFilter);

var _termsFilter = require('./terms-filter');

var _termsFilter2 = _interopRequireDefault(_termsFilter);

exports['default'] = {
  bool: _boolFilter2['default'],
  boolean: _boolFilter2['default'],
  exists: _existsFilter2['default'],
  exist: _existsFilter2['default'],
  matchAll: _existsFilter3['default'],
  matchall: _existsFilter3['default'],
  'match-all': _existsFilter3['default'],
  match_all: _existsFilter3['default'],
  missing: _missingFilter2['default'],
  nested: _nestedFilter2['default'],
  prefix: _prefixFilter2['default'],
  range: _rangeFilter2['default'],
  term: _termFilter2['default'],
  terms: _termsFilter2['default']
};
module.exports = exports['default'];