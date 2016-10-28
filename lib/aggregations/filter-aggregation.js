'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = filterAggregation;

var _filterBuilder = require('../filters/filter-builder');

var _filterBuilder2 = _interopRequireDefault(_filterBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Filter aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} filterCb Callback function that will be passed the
 *                           FilterBuilder
 * @param  {String} name     Aggregation name. Defaults to agg_filter.
 * @param  {Object} opts     Additional options to include in the aggregation.
 * @return {Object}          Filter Aggregation.
 */
function filterAggregation(filterCb, name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_filter';

  var filterBuilder = new _filterBuilder2.default();

  filterCb(filterBuilder);

  return _defineProperty({}, name, {
    filter: filterBuilder.filters
  });
}