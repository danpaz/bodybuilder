"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = childrenAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Children aggregation.
 *
 * @param  {String} type  Document type on which to join.
 * @param  {String} name  Aggregation name. Defaults to agg_histogram_<field>.
 * @return {Object}       Children aggregation.
 */
function childrenAggregation(type, name) {
  name = name || "agg_children_" + type;
  return _defineProperty({}, name, {
    children: { type: type }
  });
}