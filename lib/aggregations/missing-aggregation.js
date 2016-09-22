"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = missingAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Missing aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_missing_<field>.
 * @return {Object}       Missing Aggregation.
 */
function missingAggregation(field, name) {
  name = name || "agg_missing_" + field;
  return _defineProperty({}, name, {
    missing: {
      field: field
    }
  });
}