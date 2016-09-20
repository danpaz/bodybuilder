import _ from 'lodash'

/**
 * Construct a Max aggregation.
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_max_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Max aggregation.
 */
export default function maxAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_max_${field}`

  return {
    [name]: {
      max: (() => _.merge({field}, opts))()
    }
  }
}
