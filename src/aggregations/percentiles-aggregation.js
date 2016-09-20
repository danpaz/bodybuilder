import _ from 'lodash'

/**
 * Construct a Percentiles aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} opts  Additional options to include in the aggregation.
 * @param  {String} name  Aggregation name. Defaults to agg_percentiles_<field>.
 * @return {Object}       Percentiles Aggregation.
 */
export default function percentilesAggregation(field, opts, name) {
  name = name || `agg_percentiles_${field}`
  return {
    [name]: {
      percentiles: (() => _.merge({field}, opts))()
    }
  }
}
