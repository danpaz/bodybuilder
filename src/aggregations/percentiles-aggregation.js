import _ from 'lodash'

/**
 * Construct a Percentiles aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_percentiles_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Percentiles Aggregation.
 */
export default function percentilesAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_percentiles_${field}`

  return {
    [name]: {
      percentiles: (() => _.merge({field}, opts))()
    }
  }
}
