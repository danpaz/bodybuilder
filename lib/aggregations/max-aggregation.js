/**
 * Construct a Max aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_max_<field>.
 * @return {Object}       Terms filter.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = maxAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maxAggregation(field, name) {
  name = name || "agg_max_" + field;
  return _defineProperty({}, name, {
    max: {
      field: field
    }
  });
}

module.exports = exports["default"];