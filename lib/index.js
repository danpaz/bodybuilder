'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _filtersBoolFilter = require('./filters/bool-filter');

var _filtersBoolFilter2 = _interopRequireDefault(_filtersBoolFilter);

var _filtersExistsFilter = require('./filters/exists-filter');

var _filtersExistsFilter2 = _interopRequireDefault(_filtersExistsFilter);

var _filtersExistsFilter3 = _interopRequireDefault(_filtersExistsFilter);

var _filtersMissingFilter = require('./filters/missing-filter');

var _filtersMissingFilter2 = _interopRequireDefault(_filtersMissingFilter);

var _filtersNestedFilter = require('./filters/nested-filter');

var _filtersNestedFilter2 = _interopRequireDefault(_filtersNestedFilter);

var _filtersPrefixFilter = require('./filters/prefix-filter');

var _filtersPrefixFilter2 = _interopRequireDefault(_filtersPrefixFilter);

var _filtersRangeFilter = require('./filters/range-filter');

var _filtersRangeFilter2 = _interopRequireDefault(_filtersRangeFilter);

var _filtersTermFilter = require('./filters/term-filter');

var _filtersTermFilter2 = _interopRequireDefault(_filtersTermFilter);

var _filtersTermsFilter = require('./filters/terms-filter');

var _filtersTermsFilter2 = _interopRequireDefault(_filtersTermsFilter);

var _aggregationsTermsAggregation = require('./aggregations/terms-aggregation');

var _aggregationsTermsAggregation2 = _interopRequireDefault(_aggregationsTermsAggregation);

var FILTERS_MAP = {
  bool: _filtersBoolFilter2['default'],
  boolean: _filtersBoolFilter2['default'],
  exists: _filtersExistsFilter2['default'],
  exist: _filtersExistsFilter2['default'],
  matchAll: _filtersExistsFilter3['default'],
  matchall: _filtersExistsFilter3['default'],
  'match-all': _filtersExistsFilter3['default'],
  match_all: _filtersExistsFilter3['default'],
  missing: _filtersMissingFilter2['default'],
  nested: _filtersNestedFilter2['default'],
  prefix: _filtersPrefixFilter2['default'],
  range: _filtersRangeFilter2['default'],
  term: _filtersTermFilter2['default'],
  terms: _filtersTermsFilter2['default']
};

var AGGREGATIONS_MAP = {
  terms: _aggregationsTermsAggregation2['default']
};

function mergeConcat(target) {
  var args = Array.prototype.slice.call(arguments, 1);

  args.unshift(target);
  args.push(function concatArray(a, b) {
    if (Array.isArray(a)) {
      return a.concat(b);
    }
  });

  return _lodash2['default'].merge.apply(null, args);
}

var BodyBuilder = (function () {
  function BodyBuilder() {
    _classCallCheck(this, BodyBuilder);

    this.query = {};
  }

  _createClass(BodyBuilder, [{
    key: 'sort',
    value: function sort(field, direction) {
      this.sort = _defineProperty({}, field, {
        order: direction
      });
      return this;
    }
  }, {
    key: 'size',
    value: function size(quantity) {
      this.size = quantity;
      return this;
    }
  }, {
    key: '_addFilter',
    value: function _addFilter(boolFilterType, filter) {
      var currentFilters = this.query.filtered.filter;
      var boolCurrent = undefined;
      var boolNew = undefined;

      // First argument is optional, defaults to 'and'.
      //
      if (boolFilterType && !filter) {
        filter = boolFilterType;
        boolFilterType = 'and';
      }

      // Only one filter, no need for bool filters.
      //
      if (!currentFilters) {
        return filter;
      }

      // We have a single existing non-bool filter, need to merge with new.
      //
      boolNew = (0, _filtersBoolFilter2['default'])(boolFilterType, filter);

      if (!currentFilters.bool) {
        boolCurrent = (0, _filtersBoolFilter2['default'])(boolFilterType, currentFilters);
        return mergeConcat({}, boolCurrent, boolNew);
      }

      // We have multiple existing filters, need to merge with new.
      //
      return mergeConcat({}, currentFilters, boolNew);
    }
  }, {
    key: 'filter',
    value: function filter(type) {
      var klass = FILTERS_MAP[type];
      var filter = undefined;

      if (!klass) {
        throw new Error('Filter type not found.', type);
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      filter = klass.apply(undefined, args);
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter('and', filter);
      return this;
    }
  }, {
    key: 'orFilter',
    value: function orFilter(type) {
      var klass = FILTERS_MAP[type];
      var filter = undefined;

      if (!klass) {
        throw new Error('Filter type not found.', type);
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      filter = klass.apply(undefined, args);
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter('or', filter);
      return this;
    }
  }, {
    key: 'notFilter',
    value: function notFilter(type) {
      var klass = FILTERS_MAP[type];
      var filter = undefined;

      if (!klass) {
        throw new Error('Filter type not found.', type);
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      filter = klass.apply(undefined, args);
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter('not', filter);
      return this;
    }
  }, {
    key: 'aggregation',
    value: function aggregation(type) {
      var klass = AGGREGATIONS_MAP[type];
      var aggregation = undefined;

      if (!klass) {
        throw new Error('Aggregation type not found.', type);
      }

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      aggregation = klass.apply(undefined, args);
      this.query.aggregations = _lodash2['default'].merge({}, this.query.aggregations, aggregation);
      return this;
    }
  }, {
    key: 'agg',
    value: function agg() {
      return this.aggregation.apply(this, arguments);
    }
  }]);

  return BodyBuilder;
})();

exports['default'] = BodyBuilder;
module.exports = exports['default'];