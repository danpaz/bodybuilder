/**
 * Construct a Stats aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_stats_<field>.
 * @return {Object}       Stats Aggregation.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = statsAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function statsAggregation(field, name) {
  name = name || "agg_stats_" + field;
  return _defineProperty({}, name, {
    stats: {
      field: field
    }
  });
}

module.exports = exports["default"];