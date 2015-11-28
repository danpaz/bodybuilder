/**
 * Construct a Avg aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_avg_<field>.
 * @return {Object}       Avg Aggregation.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = avgAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function avgAggregation(field, name) {
  name = name || "agg_avg_" + field;
  return _defineProperty({}, name, {
    avg: {
      field: field
    }
  });
}

module.exports = exports["default"];