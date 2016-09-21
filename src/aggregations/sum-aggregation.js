import _ from 'lodash'

/**
 * Construct a Sum aggregation.
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_sum_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Sum Aggregation.
 */
export default function sumAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_sum_${field}`

  return {
    [name]: {
      sum: (() => _.assign({field}, opts))()
    }
  }
}
