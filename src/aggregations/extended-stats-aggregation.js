import _ from 'lodash'

/**
 * Construct a Extended Stats aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_extended_stats_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Extended Stats Aggregation.
 */
export default function extendedStatsAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_extended_stats_${field}`

  return {
    [name]: {
      extended_stats: (() => _.merge({field}, opts))()
    }
  }
}
