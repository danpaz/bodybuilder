import _ from 'lodash'

/**
 * Construct a Cardinality aggregation
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_cardinality_<field>.
 * @return {Object}       Cardinality Aggregation.
 */

export default function cardinalityAggregation(field, opts, name) {
  name = name || `agg_cardinality_${field}`
  return {
    [name]: {
      cardinality: (() => _.merge({field}, opts))()
    }
  }
}
