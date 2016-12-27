'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = scriptedMetricAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Scripted Metric aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} map_script The script as a string associated to the map_script step.
 * @param  {String} [name] Aggregation name. Defaults to agg_scripted_metric.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Scripted Metric aggregation.
 */
function scriptedMetricAggregation(map_script, name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_scripted_metric';

  return _defineProperty({}, name, {
    scripted_metric: function () {
      return (0, _merge2.default)({ map_script: map_script }, opts);
    }()
  });
}