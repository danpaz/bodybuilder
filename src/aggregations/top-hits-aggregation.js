import _ from 'lodash'

/**
 * Internal counter for added top hits aggregations.
 *
 * @private
 *
 * @type {Number}
 */
let count = 0

/**
 * Construct a Top hits aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} [name] Aggregation name. Defaults to 'agg_top_hits_{count}'.
 * @param  {Object} opts   Options to include in the aggregation.
 * @return {Object}        Top hits Aggregation.
 */
export default function topHitsAggregation(name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_top_hits_${count++}`

  return {
    [name]: {
      top_hits: (() => _.assign({}, opts))()
    }
  }
}
