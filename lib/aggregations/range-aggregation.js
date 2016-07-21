'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = rangeAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Range aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @param  {Object} opts  Additional options to include in the aggregation.
 * @return {Object}       Range aggregation.
 */
function rangeAggregation(field, name, opts) {
  name = name || 'agg_range_' + field;
  return _defineProperty({}, name, {
    range: function () {
      return (0, _assign2.default)({ field: field }, opts);
    }()
  });
}