'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

exports.default = cardinalityAggregation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Cardinality aggregation
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_cardinality_<field>.
 * @return {Object}       Cardinality Aggregation.
 */

function cardinalityAggregation(field, opts, name) {
  name = name || 'agg_cardinality_' + field;
  return _defineProperty({}, name, {
    cardinality: function () {
      return (0, _merge2.default)({ field: field }, opts);
    }()
  });
}