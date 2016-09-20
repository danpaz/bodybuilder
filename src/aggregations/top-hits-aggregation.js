/**
 * Internal counter for added top hits aggregations.
 *
 * @private
 *
 * @type {Number}
 */
let count = 0;

/**
 * Construct a Top hits aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {Object} opts  Options to include in the aggregation. Defaults to {}.
 * @param  {String} name  Aggregation name. Defaults to 'agg_top_hits_{count}'.
 * @return {Object}       Top hits Aggregation.
 */
export default function topHitsAggregation(opts = {}, name) {
  name = name || `agg_top_hits_${count++}`
  return {
    [name]: {
      top_hits: opts
    }
  }
}
