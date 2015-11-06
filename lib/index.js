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

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _aggregations = require('./aggregations');

var _aggregations2 = _interopRequireDefault(_aggregations);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

/**
 * Extends lodash's merge by allowing array concatenation.
 */
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
    key: 'rawOption',
    value: function rawOption(k, v) {
      this[k] = v;
      return this;
    }
  }, {
    key: '_addFilter',
    value: function _addFilter(filter) {
      var boolFilterType = arguments.length <= 1 || arguments[1] === undefined ? 'and' : arguments[1];

      var currentFilters = this.query.filtered.filter;
      var boolCurrent = undefined;
      var boolNew = undefined;

      // Only one filter, no need for bool filters.
      //
      if (!currentFilters) {
        return filter;
      }

      // We have a single existing non-bool filter, need to merge with new.
      //
      boolNew = _filters2['default'].bool(boolFilterType, filter);

      if (!currentFilters.bool) {
        boolCurrent = _filters2['default'].bool(boolFilterType, currentFilters);
        return mergeConcat({}, boolCurrent, boolNew);
      }

      // We have multiple existing filters, need to merge with new.
      //
      return mergeConcat({}, currentFilters, boolNew);
    }
  }, {
    key: 'filter',
    value: function filter(type) {
      var klass = _filters2['default'][type];
      var filter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      filter = klass.apply(undefined, args);
      this.query = this.query || {};
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter(filter, 'and');
      return this;
    }
  }, {
    key: 'orFilter',
    value: function orFilter(type) {
      var klass = _filters2['default'][type];
      var filter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      filter = klass.apply(undefined, args);
      this.query = this.query || {};
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter(filter, 'or');
      return this;
    }
  }, {
    key: 'notFilter',
    value: function notFilter(type) {
      var klass = _filters2['default'][type];
      var filter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      filter = klass.apply(undefined, args);
      this.query = this.query || {};
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.filter = this._addFilter(filter, 'not');
      return this;
    }
  }, {
    key: 'aggregation',
    value: function aggregation(type) {
      var klass = _aggregations2['default'][type];
      var aggregation = undefined;

      if (!klass) {
        throw new TypeError('Aggregation type ' + type + ' not found.');
      }

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      aggregation = klass.apply(undefined, args);
      this.aggregations = _lodash2['default'].merge({}, this.aggregations, aggregation);
      return this;
    }

    /**
     * Alias to BodyBuilder#aggregation.
     */
  }, {
    key: 'agg',
    value: function agg() {
      return this.aggregation.apply(this, arguments);
    }
  }, {
    key: 'addQuery',
    value: function addQuery(type) {
      var klass = _queries2['default'][type];
      var query = undefined;

      if (!klass) {
        throw new TypeError('Query type ' + type + ' not found.');
      }

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      query = klass.apply(undefined, args);

      this.query = this.query || {};
      this.query.filtered = this.query.filtered || {};
      this.query.filtered.query = query;

      return this;
    }
  }]);

  return BodyBuilder;
})();

exports['default'] = BodyBuilder;
module.exports = exports['default'];