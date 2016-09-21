import _ from 'lodash'

/**
 * Construct a Min aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_min_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Min aggregation.
 */
export default function minAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_min_${field}`

  return {
    [name]: {
      min: (() => _.merge({field}, opts))()
    }
  }
}
