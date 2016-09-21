import _ from 'lodash'

/**
 * Construct a Avg aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_avg_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Avg Aggregation.
 */
export default function avgAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_avg_${field}`

  return {
    [name]: {
      avg: (() => _.merge({field}, opts))()
    }
  }
}
