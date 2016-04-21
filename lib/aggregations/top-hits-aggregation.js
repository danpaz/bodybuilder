"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = topHitsAggregation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Internal counter for added top hits aggregations.
 * @type {Number}
 */
var count = 0;

/**
 * Construct a Top hits aggregation.
 *
 * @param  {Object} opts  Options to include in the aggregation (maybe empty).
 * @param  {String} name  Aggregation name. Defaults to agg_top_hits_{count}.
 * @return {Object}       Top hits Aggregation.
 */
function topHitsAggregation(opts, name) {
  name = name || "agg_top_hits_" + count++;
  return _defineProperty({}, name, {
    top_hits: opts || {}
  });
}