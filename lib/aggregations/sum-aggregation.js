"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sumAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Sum aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_sum_<field>.
 * @return {Object}       Sum Aggregation.
 */
function sumAggregation(field, name) {
  name = name || "agg_sum_" + field;
  return _defineProperty({}, name, {
    sum: {
      field: field
    }
  });
}