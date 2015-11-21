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

var _utils = require('./utils');

var BodyBuilder = (function () {
  function BodyBuilder() {
    _classCallCheck(this, BodyBuilder);

    this._body = {};
  }

  /**
   * Returns a copy of the elasticsearch query body in its current state.
   *
   * @return {Object} Query body.
   */

  _createClass(BodyBuilder, [{
    key: 'build',
    value: function build() {
      return _lodash2['default'].clone(this._body);
    }

    /**
     * Set a sort direction on a given field.
     *
     * @param  {String} field     Field name.
     * @param  {String} direction (Optional) A valid direction: 'asc' or 'desc'.
     *                            Defaults to 'asc'.
     * @return {BodyBuilder}
     */
  }, {
    key: 'sort',
    value: function sort(field) {
      var direction = arguments.length <= 1 || arguments[1] === undefined ? 'asc' : arguments[1];

      this._body.sort = _defineProperty({}, field, {
        order: direction
      });
      return this;
    }

    /**
     * Set a *from* offset value, for paginating a query.
     *
     * @param  {Number} quantity The offset from the first result you want to
     *                           fetch.
     * @return {BodyBuilder}
     */
  }, {
    key: 'from',
    value: function from(quantity) {
      this._body.from = quantity;
      return this;
    }

    /**
     * Set a *size* value for maximum results to return.
     *
     * @param  {Number} quantity Maximum number of results to return.
     * @return {BodyBuilder}
     */
  }, {
    key: 'size',
    value: function size(quantity) {
      this._body.size = quantity;
      return this;
    }

    /**
     * Set any key-value on the elasticsearch body.
     *
     * @param  {String} k Key.
     * @param  {String} v Value.
     * @return {BodyBuilder}
     */
  }, {
    key: 'rawOption',
    value: function rawOption(k, v) {
      this._body[k] = v;
      return this;
    }

    /**
     * Apply a filter of a given type providing all the necessary arguments,
     * passing these arguments directly to the specified filter builder. Merges
     * existing filter(s) with the new filter.
     *
     * @param  {String}  type Name of the filter type.
     * @param  {...args} args Arguments passed to filter builder.
     * @return {BodyBuilder}
     */
  }, {
    key: 'filter',
    value: function filter(type) {
      var klass = _filters2['default'][type];
      var newFilter = undefined;
      var currentFilter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      newFilter = klass.apply(undefined, args);
      this._body.query = this._body.query || {};
      this._body.query.filtered = this._body.query.filtered || {};
      currentFilter = this._body.query.filtered.filter;
      this._body.query.filtered.filter = (0, _utils.boolMerge)('filter', newFilter, currentFilter, 'and');
      return this;
    }
  }, {
    key: 'orFilter',
    value: function orFilter(type) {
      var klass = _filters2['default'][type];
      var newFilter = undefined;
      var currentFilter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      newFilter = klass.apply(undefined, args);
      this._body.query = this._body.query || {};
      this._body.query.filtered = this._body.query.filtered || {};
      currentFilter = this._body.query.filtered.filter;
      this._body.query.filtered.filter = (0, _utils.boolMerge)('filter', newFilter, currentFilter, 'or');
      return this;
    }
  }, {
    key: 'notFilter',
    value: function notFilter(type) {
      var klass = _filters2['default'][type];
      var newFilter = undefined;
      var currentFilter = undefined;

      if (!klass) {
        throw new TypeError('Filter type ' + type + ' not found.');
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      newFilter = klass.apply(undefined, args);
      this._body.query = this._body.query || {};
      this._body.query.filtered = this._body.query.filtered || {};
      currentFilter = this._body.query.filtered.filter;
      this._body.query.filtered.filter = (0, _utils.boolMerge)('filter', newFilter, currentFilter, 'not');
      return this;
    }

    /**
     * Apply a aggregation of a given type providing all the necessary arguments,
     * passing these arguments directly to the specified aggregation builder.
     * Merges existing aggregation(s) with the new aggregation.
     *
     * @param  {String}  type Name of the aggregation type.
     * @param  {...args} args Arguments passed to aggregation builder.
     * @return {BodyBuilder}
     */
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
      this._body.aggregations = _lodash2['default'].merge({}, this._body.aggregations, aggregation);
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

    /**
     * Apply a query of a given type providing all the necessary arguments,
     * passing these arguments directly to the specified query builder. Merges
     * existing query(s) with the new query.
     *
     * @param  {String}  type Name of the query type.
     * @param  {...args} args Arguments passed to query builder.
     * @return {BodyBuilder}
     */
  }, {
    key: 'query',
    value: function query(type) {
      var klass = _queries2['default'][type];
      var newQuery = undefined;
      var currentQuery = undefined;

      if (!klass) {
        throw new TypeError('Query type ' + type + ' not found.');
      }

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      newQuery = klass.apply(undefined, args);

      this._body.query = this._body.query || {};
      this._body.query.filtered = this._body.query.filtered || {};
      currentQuery = this._body.query.filtered.query;
      this._body.query.filtered.query = (0, _utils.boolMerge)('query', newQuery, currentQuery, 'and');
      return this;
    }

    /**
     * Alias to BodyBuilder#query.
     */
  }, {
    key: 'addQuery',
    value: function addQuery() {
      return this.query.apply(this, arguments);
    }
  }]);

  return BodyBuilder;
})();

exports['default'] = BodyBuilder;
module.exports = exports['default'];