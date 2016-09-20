import _ from 'lodash'

/**
 * Construct a Cardinality aggregation
 *
 * @param  {String} field  Field name to aggregate over.
 * @param  {String} [name] Aggregation name. Defaults to agg_cardinality_<field>.
 * @param  {Object} opts   Additional options to include in the aggregation.
 * @return {Object}        Cardinality Aggregation.
 */
export default function cardinalityAggregation(field, name, opts) {
  if (_.isObject(name)) {
    let tmp = opts
    opts = name
    name = tmp
  }

  name = name || `agg_cardinality_${field}`

  return {
    [name]: {
      cardinality: (() => _.merge({field}, opts))()
    }
  }
}
