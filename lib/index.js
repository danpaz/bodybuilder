'use strict';

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filterBuilder5 = require('./filters/filter-builder');

var _filterBuilder6 = _interopRequireDefault(_filterBuilder5);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _aggregationBuilder = require('./aggregations/aggregation-builder');

var _aggregationBuilder2 = _interopRequireDefault(_aggregationBuilder);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main builder class.
 *
 * @example
 * var body = new Bodybuilder()
 *   .query('match', 'text', 'this is a test')
 *   .build()
 */

var Bodybuilder = function () {
  function Bodybuilder() {
    _classCallCheck(this, Bodybuilder);

    this._body = {};
    this._filterBuilder = new _filterBuilder6.default();
    this._queries = {};
    this._aggBuilder = Object.create(_aggregationBuilder2.default);
  }

  /**
   * Constructs the elasticsearch query body in its current state.
   * @param  {String} version             Version to generate.
   * @returns {Object} Query body.
   */


  _createClass(Bodybuilder, [{
    key: 'build',
    value: function build(version) {
      if (version === 'v2') return this._buildV2();
      return this._buildV1();
    }
  }, {
    key: '_buildV1',
    value: function _buildV1() {
      var body = (0, _clone2.default)(this._body);
      var filters = this._filterBuilder.filters;
      var queries = this._queries;
      var aggregations = this._aggBuilder.aggregations;

      if (!(0, _isEmpty2.default)(filters)) {
        (0, _set2.default)(body, 'query.filtered.filter', filters);

        if (!(0, _isEmpty2.default)(queries)) {
          (0, _set2.default)(body, 'query.filtered.query', queries);
        }
      } else if (!(0, _isEmpty2.default)(queries)) {
        (0, _set2.default)(body, 'query', queries);
      }

      if (!(0, _isEmpty2.default)(aggregations)) {
        (0, _set2.default)(body, 'aggregations', aggregations);
      }

      return body;
    }
  }, {
    key: '_buildV2',
    value: function _buildV2() {
      var body = (0, _clone2.default)(this._body);
      var filters = this._filterBuilder.filters;
      var queries = this._queries;
      var aggregations = this._aggBuilder.aggregations;

      if (!(0, _isEmpty2.default)(filters)) {
        var filterBody = {};
        var queryBody = {};
        (0, _set2.default)(filterBody, 'query.bool.filter', filters);
        if (!(0, _isEmpty2.default)(queries.bool)) {
          (0, _set2.default)(queryBody, 'query.bool', queries.bool);
        } else if (!(0, _isEmpty2.default)(queries)) {
          (0, _set2.default)(queryBody, 'query.bool.must', queries);
        }
        (0, _merge2.default)(body, filterBody, queryBody);
      } else if (!(0, _isEmpty2.default)(queries)) {
        (0, _set2.default)(body, 'query', queries);
      }

      if (!(0, _isEmpty2.default)(aggregations)) {
        (0, _set2.default)(body, 'aggs', aggregations);
      }

      return body;
    }

    /**
     * Set a sort direction on a given field.
     *
     * @param  {String} field             Field name.
     * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'sort',
    value: function sort(field) {
      var _this = this;

      var direction = arguments.length <= 1 || arguments[1] === undefined ? 'asc' : arguments[1];

      this._body.sort = this._body.sort || [];

      if ((0, _isArray2.default)(field)) {

        if ((0, _isPlainObject2.default)(this._body.sort)) {
          this._body.sort = [this._body.sort];
        }

        if ((0, _isArray2.default)(this._body.sort)) {
          (0, _each2.default)(field, function (sorts) {
            (0, _each2.default)(sorts, function (value, key) {
              (0, _utils.sortMerge)(_this._body.sort, key, value);
            });
          });
        }
      } else {
        (0, _utils.sortMerge)(this._body.sort, field, direction);
      }
      return this;
    }

    /**
     * Set a *from* offset value, for paginating a query.
     *
     * @param  {Number} quantity The offset from the first result you want to
     *                           fetch.
     * @returns {Bodybuilder} Builder class.
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
     * @returns {Bodybuilder} Builder class.
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
     * @returns {Bodybuilder} Builder class.
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
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'filter',
    value: function filter() {
      var _filterBuilder;

      (_filterBuilder = this._filterBuilder).filter.apply(_filterBuilder, arguments);
      return this;
    }
  }, {
    key: 'andFilter',
    value: function andFilter() {
      var _filterBuilder2;

      (_filterBuilder2 = this._filterBuilder).andFilter.apply(_filterBuilder2, arguments);
      return this;
    }
  }, {
    key: 'orFilter',
    value: function orFilter() {
      var _filterBuilder3;

      (_filterBuilder3 = this._filterBuilder).orFilter.apply(_filterBuilder3, arguments);
      return this;
    }
  }, {
    key: 'notFilter',
    value: function notFilter() {
      var _filterBuilder4;

      (_filterBuilder4 = this._filterBuilder).notFilter.apply(_filterBuilder4, arguments);
      return this;
    }

    /**
     * Apply a query of a given type providing all the necessary arguments,
     * passing these arguments directly to the specified query builder. Merges
     * existing query(s) with the new query.
     *
     * @param  {String}  type Name of the query type.
     * @param  {...args} args Arguments passed to query builder.
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'query',
    value: function query(type) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._query.apply(this, ['and', type].concat(args));
      return this;
    }
  }, {
    key: '_query',
    value: function _query(boolType, queryType) {
      var klass = _queries2.default[queryType];
      var newQuery = void 0;

      if (!klass) {
        throw new TypeError('Query type ' + queryType + ' not found.');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      newQuery = klass.apply(undefined, args);
      this._queries = (0, _utils.boolMerge)(newQuery, this._queries, boolType);
      return this;
    }

    /**
     * Alias to Bodybuilder#query.
     *
     * @private
     *
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'andQuery',
    value: function andQuery() {
      return this.query.apply(this, arguments);
    }

    /**
     * Alias to Bodybuilder#query.
     *
     * @private
     *
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'addQuery',
    value: function addQuery() {
      return this.query.apply(this, arguments);
    }
  }, {
    key: 'orQuery',
    value: function orQuery(type) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      this._query.apply(this, ['or', type].concat(args));
      return this;
    }
  }, {
    key: 'notQuery',
    value: function notQuery(type) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this._query.apply(this, ['not', type].concat(args));
      return this;
    }

    /**
     * Apply a aggregation of a given type providing all the necessary arguments,
     * passing these arguments directly to the specified aggregation builder.
     * Merges existing aggregation(s) with the new aggregation. You may nest
     * aggregations by passing in a `Function` callback as the last parameter.
     * The callback will receive the newly built aggregation upon which you can
     * keep calling `aggregation(type, ...args)`.
     *
     * @example
     * var body = new Bodybuilder()
     *   .query('match', 'text', 'this is a test')
     *   .aggregation('terms', 'someField', 'bySomeField',
     *     // Nest aggregations on "bySomeField"
     *     agg =>
     *       agg
     *         .agregation('max', 'someOtherField')
     *         .aggregation('missing', 'anotherField')
     *    )
     *   .build()
     *
     *
     * @param  {String}  type Name of the aggregation type.
     * @param  {...args} args Arguments passed to aggregation builder. May include
     *                        am optional nesting function as its last element.
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'aggregation',
    value: function aggregation(type) {
      var _aggBuilder;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      (_aggBuilder = this._aggBuilder).add.apply(_aggBuilder, [type].concat(args));
      return this;
    }

    /**
     * Alias to Bodybuilder#aggregation.
     *
     * @private
     *
     * @returns {Bodybuilder} Builder class.
     */

  }, {
    key: 'agg',
    value: function agg() {
      return this.aggregation.apply(this, arguments);
    }
  }]);

  return Bodybuilder;
}();

module.exports = Bodybuilder;