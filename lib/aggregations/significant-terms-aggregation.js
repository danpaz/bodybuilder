/**
 * Construct a Significant Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_significant_terms_<field>.
 * @return {Object}       Significant Terms aggregation.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = significantTermsAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function significantTermsAggregation(field, name) {
  name = name || "agg_significant_terms_" + field;
  return _defineProperty({}, name, {
    significant_terms: {
      field: field
    }
  });
}

module.exports = exports["default"];