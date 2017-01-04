'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = filtersAggregation;

var _filtersBuilder = require('../filters/filters-builder');

var _filtersBuilder2 = _interopRequireDefault(_filtersBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Filters aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} filterCb Callback function that will be passed the
 *                           FiltersBuilder
 * @param  {String} name     Aggregation name. Defaults to agg_filter.
 * @param  {Object} opts     Additional options to include in the aggregation.
 * @return {Object}          Filter Aggregation.
 */
function filtersAggregation(filterCb, name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_filters';

  var filtersBuilder = new _filtersBuilder2.default();

  filterCb(filtersBuilder);

  return _defineProperty({}, name, {
    filters: {
      filters: filtersBuilder.filters
    }
  });
}