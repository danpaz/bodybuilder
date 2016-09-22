'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

exports.default = minAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Min aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_min_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Min aggregation.
 */
function minAggregation(field, name, opts) {
  if ((0, _isObject2.default)(name)) {
    var tmp = opts;
    opts = name;
    name = tmp;
  }

  name = name || 'agg_min_' + field;

  return _defineProperty({}, name, {
    min: function () {
      return (0, _merge2.default)({ field: field }, opts);
    }()
  });
}