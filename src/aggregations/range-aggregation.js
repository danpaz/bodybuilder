import _ from 'lodash'

/**
 * Construct a Range aggregation.
 *
 * @memberof Aggregations
 *
 * @param  {String} field Field name to aggregate over.
 * @param  {String} name  Aggregation name. Defaults to agg_terms_<field>.
 * @param  {Object} opts  Additional options to include in the aggregation.
 * @return {Object}       Range aggregation.
 */
export default function rangeAggregation(field, name, opts) {
  name = name || `agg_range_${field}`
  return {
    [name]: {
      range: (() => _.assign({field}, opts))()
    }
  }
}
