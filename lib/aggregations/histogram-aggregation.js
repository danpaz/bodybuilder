'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = histogramAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Histogram aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_histogram_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Histogram Aggregation.
 */
function histogramAggregation(field, name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_histogram_' + field;

  return _defineProperty({}, name, {
    histogram: function () {
      return (0, _merge2.default)({ field: field }, opts);
    }()
  });
}