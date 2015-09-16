/**
 * Construct a Terms aggregation.
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @return {Object}       Terms filter.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = termsAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function termsAggregation(field, name) {
  name = name || "agg_terms_" + field;
  return _defineProperty({}, name, {
    terms: {
      field: field
    }
  });
}

module.exports = exports["default"];