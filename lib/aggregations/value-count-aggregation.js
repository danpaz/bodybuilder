/**
 * Construct a Value Count aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_value_count_<field>.
 * @return {Object}       Value Count Aggregation.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueCountAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function valueCountAggregation(field, name) {
  name = name || "agg_value_count_" + field;
  return _defineProperty({}, name, {
    value_count: {
      field: field
    }
  });
}

module.exports = exports["default"];