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
 * @param  {Object} opts  Options to include in the aggregation. Defaults to {}.
 * @param  {String} name  Aggregation name. Defaults to 'agg_top_hits_{count}'.
 * @return {Object}       Top hits Aggregation.
 */
function topHitsAggregation() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var name = arguments[1];

  name = name || "agg_top_hits_" + count++;
  return _defineProperty({}, name, {
    top_hits: opts
  });
}