import _ from 'lodash'

/**
 * Construct a Value Count aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_value_count_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Value Count Aggregation.
 */
export default function valueCountAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_value_count_${field}`

  return {
    [name]: {
      value_count: (() => _.assign({field}, opts))()
    }
  }
}
