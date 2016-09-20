import _ from 'lodash'

/**
 * Construct a Stats aggregation.
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_stats_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Stats Aggregation.
 */
export default function statsAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_stats_${field}`

  return {
    [name]: {
      stats: (() => _.merge({field}, opts))()
    }
  }
}
